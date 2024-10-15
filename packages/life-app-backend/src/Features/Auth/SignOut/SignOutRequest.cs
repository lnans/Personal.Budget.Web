namespace Life.App.Backend.Features.Auth.SignOut;

public class SignOutRequest
{
    public string RefreshToken { get; set; } = null!;
}
