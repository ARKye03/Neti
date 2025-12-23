using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Neti.API.Data;
using Neti.API.Models;

namespace Neti.API.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class SubmissionsController(ApplicationDbContext context) : ControllerBase
{
    private readonly ApplicationDbContext _context = context;

    [HttpGet("form/{formId}")]
    public async Task<ActionResult<IEnumerable<FormSubmission>>> GetSubmissions(int formId)
    {
        var userId = GetCurrentUserId();
        var form = await _context.Forms.FirstOrDefaultAsync(f => f.Id == formId && f.UserId == userId);
        
        if (form == null)
        {
            return Unauthorized("You do not have access to these submissions.");
        }

        return await _context.FormSubmissions
            .Include(s => s.Values)
            .Where(s => s.FormId == formId)
            .OrderByDescending(s => s.SubmittedAt)
            .ToListAsync();
    }

    [HttpPost]
    [AllowAnonymous] // Anyone can submit a form
    public async Task<ActionResult<FormSubmission>> CreateSubmission([FromBody] FormSubmission submission)
    {
        var form = await _context.Forms.FindAsync(submission.FormId);
        if (form == null || !form.IsActive)
        {
            return BadRequest("Form not found or inactive.");
        }

        submission.SubmittedAt = DateTime.UtcNow;
        submission.IpAddress = HttpContext.Connection.RemoteIpAddress?.ToString();

        _context.FormSubmissions.Add(submission);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSubmission), new { id = submission.Id }, submission);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<FormSubmission>> GetSubmission(int id)
    {
        var userId = GetCurrentUserId();
        var submission = await _context.FormSubmissions
            .Include(s => s.Form)
            .Include(s => s.Values)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (submission == null)
        {
            return NotFound();
        }

        if (submission.Form.UserId != userId)
        {
            return Unauthorized();
        }

        return submission;
    }

    private int GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null) return 0;
        return int.Parse(userIdClaim.Value);
    }
}
