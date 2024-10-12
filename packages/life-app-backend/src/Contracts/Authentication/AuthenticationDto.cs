namespace Life.App.Backend.Contracts.Authentication;

public class AuthenticationDto
{
    /// <summary>
    ///     Identity of the user
    /// </summary>
    public required string Username { get; set; }

    /// <summary>
    ///     Access token used to authenticate requests
    /// </summary>
    public required AuthenticationTokenDto AccessToken { get; set; }

    /// <summary>
    ///     Refresh token used to refresh the access token
    /// </summary>
    public required AuthenticationTokenDto RefreshToken { get; set; }
}
