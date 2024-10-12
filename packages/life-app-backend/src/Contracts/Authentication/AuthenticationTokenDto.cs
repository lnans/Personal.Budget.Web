namespace Life.App.Backend.Contracts.Authentication;

public class AuthenticationTokenDto
{
    /// <summary>
    ///     Token value
    /// </summary>
    public required string Token { get; set; }

    /// <summary>
    ///     Token expiration in seconds
    /// </summary>
    public required int ExpiresIn { get; set; }
}
