namespace Neti.API.Models;

public class SubmissionValue
{
    public int Id { get; set; }
    public int SubmissionId { get; set; }
    public int FormFieldId { get; set; }
    public string Value { get; set; } = string.Empty;

    // Navigation properties
    public FormSubmission Submission { get; set; } = null!;
    public FormField FormField { get; set; } = null!;
}