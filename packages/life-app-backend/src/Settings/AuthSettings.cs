using Ardalis.GuardClauses;

namespace Life.App.Backend.Settings;

public class AuthSettings
{
    /// <summary>
    ///     Configuration section name.
    /// </summary>
    public const string Auth = "Auth";

    /// <summary>
    ///     Pepper used for hashing passwords.
    /// </summary>
    public string Pepper { get; set; } = null!;

    /// <summary>
    ///     Secret used for JWT.
    /// </summary>
    public string JwtSecret { get; set; } = null!;

    /// <summary>
    ///     Token expiration in minutes.
    /// </summary>
    public int TokenExpirationInMinutes { get; set; }

    /// <summary>
    ///     Refresh token expiration in days.
    /// </summary>
    public int RefreshTokenExpirationInDays { get; set; }

    /// <summary>
    ///     Creates an instance of <see cref="AuthSettings" /> from the provided configuration.
    ///     Throws an exception if the configuration is invalid.
    /// </summary>
    /// <param name="configuration">Configuration</param>
    /// <returns>Instance of <see cref="AuthSettings" /></returns>
    public static AuthSettings Create(IConfiguration configuration)
    {
        var authenticationOptions = configuration.GetSection(Auth).Get<AuthSettings>();

        Guard.Against.Null(authenticationOptions, nameof(authenticationOptions));
        Guard.Against.NullOrWhiteSpace(authenticationOptions.JwtSecret, nameof(authenticationOptions.JwtSecret));
        Guard.Against.StringTooShort(authenticationOptions.JwtSecret, 32, nameof(authenticationOptions.JwtSecret));
        Guard.Against.NegativeOrZero(
            authenticationOptions.TokenExpirationInMinutes,
            nameof(authenticationOptions.TokenExpirationInMinutes)
        );
        Guard.Against.NegativeOrZero(
            authenticationOptions.RefreshTokenExpirationInDays,
            nameof(authenticationOptions.RefreshTokenExpirationInDays)
        );

        return authenticationOptions;
    }
}
