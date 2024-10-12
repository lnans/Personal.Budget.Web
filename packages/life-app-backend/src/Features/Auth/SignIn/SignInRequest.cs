namespace Life.App.Backend.Features.Auth.SignIn;

public class SignInRequest
{
    public string Username { get; set; } = null!;
    public string Password { get; set; } = null!;
}
