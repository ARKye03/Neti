using Microsoft.EntityFrameworkCore;
using Neti.API.Models;

namespace Neti.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Form> Forms { get; set; }
    public DbSet<FormField> FormFields { get; set; }
    public DbSet<FormSubmission> FormSubmissions { get; set; }
    public DbSet<SubmissionValue> SubmissionValues { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Form configuration
        modelBuilder.Entity<Form>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Description).HasMaxLength(1000);

            entity.HasMany(e => e.Fields)
                .WithOne(e => e.Form)
                .HasForeignKey(e => e.FormId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasMany(e => e.Submissions)
                .WithOne(e => e.Form)
                .HasForeignKey(e => e.FormId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // FormField configuration
        modelBuilder.Entity<FormField>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Label).IsRequired().HasMaxLength(200);
            entity.Property(e => e.FieldType).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Placeholder).HasMaxLength(200);
            entity.Property(e => e.Options).HasColumnType("text");
        });

        // FormSubmission configuration
        modelBuilder.Entity<FormSubmission>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.IpAddress).HasMaxLength(45);

            entity.HasMany(e => e.Values)
                .WithOne(e => e.Submission)
                .HasForeignKey(e => e.SubmissionId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // SubmissionValue configuration
        modelBuilder.Entity<SubmissionValue>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Value).HasColumnType("text");
        });
    }
}