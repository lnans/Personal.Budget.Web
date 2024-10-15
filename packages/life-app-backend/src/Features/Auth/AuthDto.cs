namespace Life.App.Backend.Features.Auth;

public class AuthDto
{
    /// <summary>
    ///     Identity of the user
    /// </summary>
    public required string Username { get; set; }

    /// <summary>
    ///     Access token used to authenticate requests
    /// </summary>
    public required AuthTokenDto AccessToken { get; set; }

    /// <summary>
    ///     Refresh token used to refresh the access token
    /// </summary>
    public required AuthTokenDto RefreshToken { get; set; }
}
