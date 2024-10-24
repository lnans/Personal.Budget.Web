namespace Life.App.Backend.Features.Auth;

public class AuthTokenDto
{
    /// <summary>
    ///     Token value
    /// </summary>
    public required string Token { get; set; }

    /// <summary>
    ///     Token expiration in epoch time
    /// </summary>
    public required long ExpiresAt { get; set; }
}
