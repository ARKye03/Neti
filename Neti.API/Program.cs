using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Neti.API.Data;
using Neti.API.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var serverVersion = new MariaDbServerVersion(new Version(12, 1, 2));

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString, serverVersion));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.MapControllers();

app.MapGet("/db-test", async (ApplicationDbContext db) =>
{
    var forms = await db.Forms
        .Include(f => f.Fields.OrderBy(field => field.Order))
        .ToListAsync();

    return Results.Ok(forms);
});

app.MapPost("/seed-form", async (ApplicationDbContext db) =>
{
    // Optional: avoid duplicating the seed
    if (await db.Forms.AnyAsync())
    {
        return Results.BadRequest(new { Message = "Forms table already has data." });
    }

    var form = new Form
    {
        Title = "Employee Feedback",
        Description = "Basic feedback form seeded from API.",
        IsActive = true,
        Fields =
        [
            new FormField
            {
                Label = "Your Name",
                FieldType = "text",
                IsRequired = true,
                Placeholder = "John Doe",
                Order = 0
            },
            new FormField
            {
                Label = "Overall Satisfaction",
                FieldType = "radio",
                IsRequired = true,
                // store options however you decided (here: JSON string)
                Options = "[\"Very satisfied\",\"Satisfied\",\"Neutral\",\"Dissatisfied\"]",
                Order = 1
            }
        ]
    };

    db.Forms.Add(form);
    await db.SaveChangesAsync();

    return Results.Ok(form);
});

app.Run();