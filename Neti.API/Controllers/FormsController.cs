using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Neti.API.Data;
using Neti.API.Models;

namespace Neti.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FormsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public FormsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/forms
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Form>>> GetForms()
    {
        return await _context.Forms
            .Include(f => f.Fields.OrderBy(field => field.Order))
            .Where(f => f.IsActive)
            .ToListAsync();
    }

    // GET: api/forms/5
    [HttpGet("{id}")]
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

        form.UpdatedAt = DateTime.UtcNow;
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
        var form = await _context.Forms.FindAsync(id);
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
        return _context.Forms.Any(e => e.Id == id);
    }
}