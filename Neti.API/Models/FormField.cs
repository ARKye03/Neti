namespace Neti.API.Models;

public class FormField
{
    public int Id { get; set; }
    public int FormId { get; set; }
    public string Label { get; set; } = string.Empty;
    public string FieldType { get; set; } = "text"; // text, email, textarea, select, radio, checkbox, date
    public bool IsRequired { get; set; } = false;
    public string? Placeholder { get; set; }
    public string? Options { get; set; } // JSON string for select/radio/checkbox options
    public int Order { get; set; } = 0;

    // Navigation property
    public Form Form { get; set; } = null!;
    public ICollection<SubmissionValue> SubmissionValues { get; set; } = new List<SubmissionValue>();
}