using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterRequest
{

    [Required]
    public required string DisplayName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public required string Email { get; set; } = string.Empty;

    [Required]
    [MinLength(8)]
    public string Password { get; set; } = string.Empty;

    [Required]
    public string Gender { get; set; } = string.Empty;

    [Required]
    public string City { get; set; } = string.Empty;

    [Required]
    public string Country { get; set; } = string.Empty;

    [Required]
    public DateOnly BirthDay { get; set; }

}