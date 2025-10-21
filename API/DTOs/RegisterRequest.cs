using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterRequest
{

    [Required]
    public required string DisplayName { get; set; } = string.Empty;

    [Required]
    public required string Email { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;

}