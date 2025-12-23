using System.Text.Json.Serialization;

namespace Neti.API.Models;

public class Form
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }

    public int UserId { get; set; }
    [JsonIgnore]
    public User User { get; set; } = null!;

    // Navigation property
    public ICollection<FormField> Fields { get; set; } = [];
    [JsonIgnore]
    public ICollection<FormSubmission> Submissions { get; set; } = [];
}