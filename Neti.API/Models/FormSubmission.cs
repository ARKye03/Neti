namespace Neti.API.Models;

public class FormSubmission
{
    public int Id { get; set; }
    public int FormId { get; set; }
    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    public string? IpAddress { get; set; }

    // Navigation property
    public Form Form { get; set; } = null!;
    public ICollection<SubmissionValue> Values { get; set; } = new List<SubmissionValue>();
}