namespace Neti.API.Models;

public record UserRegistrationDto(string Username, string Email, string Password);
public record UserLoginDto(string Email, string Password);
public record AuthResponseDto(string Token, string Username, string Email);
