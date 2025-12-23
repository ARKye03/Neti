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
public class FormsController(ApplicationDbContext context) : ControllerBase
{
    private readonly ApplicationDbContext _context = context;

    // GET: api/forms
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Form>>> GetForms()
    {
        var userId = GetCurrentUserId();
        return await _context.Forms
            .Include(f => f.Fields.OrderBy(field => field.Order))
            .Where(f => f.IsActive && f.UserId == userId)
            .ToListAsync();
    }

    // GET: api/forms/5
    [HttpGet("{id}")]
    [AllowAnonymous] // Allow public access for filling the form
    public async Task<ActionResult<Form>> GetForm(int id)
    {
        var form = await _context.Forms
            .Include(f => f.Fields.OrderBy(field => field.Order))
            .FirstOrDefaultAsync(f => f.Id == id);

        if (form == null)
        {
            return NotFound();
        }

        return form;
    }

    // POST: api/forms
    [HttpPost]
    public async Task<ActionResult<Form>> CreateForm([FromBody] Form form)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        form.UserId = GetCurrentUserId();
        _context.Forms.Add(form);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetForm), new { id = form.Id }, form);
    }

    // PUT: api/forms/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateForm(int id, Form form)
    {
        if (id != form.Id)
        {
            return BadRequest();
        }

        var userId = GetCurrentUserId();
        var existingForm = await _context.Forms.AnyAsync(f => f.Id == id && f.UserId == userId);
        if (!existingForm)
        {
            return Unauthorized("You do not own this form.");
        }

        form.UpdatedAt = DateTime.UtcNow;
        form.UserId = userId;
        _context.Entry(form).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!FormExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    // DELETE: api/forms/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteForm(int id)
    {
        var userId = GetCurrentUserId();
        var form = await _context.Forms.FirstOrDefaultAsync(f => f.Id == id && f.UserId == userId);
        
        if (form == null)
        {
            return NotFound();
        }

        _context.Forms.Remove(form);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool FormExists(int id)
    {
        var userId = GetCurrentUserId();
        return _context.Forms.Any(e => e.Id == id && e.UserId == userId);
    }

    private int GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null) return 0;
        return int.Parse(userIdClaim.Value);
    }
}