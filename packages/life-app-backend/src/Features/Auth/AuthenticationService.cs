using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Life.App.Backend.Contracts.Authentication;
using Life.App.Backend.Settings;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.IdentityModel.Tokens;

namespace Life.App.Backend.Features.Auth;

public class AuthenticationService
{
    private const int HashIterations = 100_000;
    private const int RandomSaltSize = 32;
    private readonly AuthenticationSettings _authSettings;
    private readonly IMemoryCache _cache;

    public readonly int RefreshTokenExpirationInDays;

    public AuthenticationService(AuthenticationSettings authSettings, IMemoryCache cache)
    {
        _authSettings = authSettings;
        _cache = cache;

        RefreshTokenExpirationInDays = authSettings.RefreshTokenExpirationInDays;
    }

    /// <summary>
    ///     Hashes a password using PBKDF2 with a salt and pepper.
    /// </summary>
    /// <param name="password">Password to hash</param>
    /// <param name="salt">Salt (must be store in database)</param>
    /// <returns>Hashed password</returns>
    public string HashPassword(string password, string salt)
    {
        // Combine the password, salt, and pepper
        var passwordSaltPepper = $"{password}{_authSettings.Pepper}";
        var saltBytes = Encoding.UTF8.GetBytes(salt);
        var passwordBytes = Encoding.UTF8.GetBytes(passwordSaltPepper);

        // Hash the password using PBKDF2
        using var pbkdf2 = new Rfc2898DeriveBytes(passwordBytes, saltBytes, HashIterations, HashAlgorithmName.SHA256);
        var hashBytes = pbkdf2.GetBytes(32); // Generate a 256-bit key (32 bytes)
        return Convert.ToBase64String(hashBytes);
    }

    /// <summary>
    ///     Generate a cryptographically secure salt
    /// </summary>
    /// <returns>Base64 encoded salt</returns>
    public string GenerateRandomSalt()
    {
        using var rng = RandomNumberGenerator.Create();
        var byteSalt = new byte[RandomSaltSize];
        rng.GetBytes(byteSalt);
        return Convert.ToBase64String(byteSalt);
    }

    /// <summary>
    ///     Verify a password using PBKDF2 with a salt.
    /// </summary>
    /// <param name="password">Password to check</param>
    /// <param name="salt">Salt (must be store in database)</param>
    /// <param name="storedHash">PasswordHash to check</param>
    /// <returns>True if the password is correct, false otherwise</returns>
    public bool VerifyPassword(string password, string salt, string storedHash)
    {
        var computedHash = HashPassword(password, salt);
        return computedHash == storedHash;
    }

    /// <summary>
    ///     Generates an access token for a user.
    /// </summary>
    /// <param name="userId">User ID</param>
    /// <returns>Access token</returns>
    public AuthenticationTokenDto GenerateAuthenticationToken(string userId)
    {
        var claims = new[] { new Claim(ClaimTypes.NameIdentifier, userId) };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authSettings.JwtSecret));
        var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddMinutes(_authSettings.TokenExpirationInMinutes), // Use configured expiry time
            signingCredentials: signingCredentials
        );

        return new AuthenticationTokenDto
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            ExpiresIn = _authSettings.TokenExpirationInMinutes * 60,
        };
    }

    /// <summary>
    ///     Generates a refresh token.
    /// </summary>
    /// <returns>Refresh token</returns>
    public AuthenticationTokenDto GenerateRefreshToken()
    {
        var refreshToken = GenerateRandomSalt();
        return new AuthenticationTokenDto
        {
            Token = refreshToken,
            ExpiresIn = _authSettings.RefreshTokenExpirationInDays * 24 * 60 * 60,
        };
    }

    /// <summary>
    ///     Stores a refresh token.
    /// </summary>
    /// <param name="authToken">Token to store</param>
    /// <param name="userId">User ID</param>
    public void StoreTokenInMemory(AuthenticationTokenDto authToken, string userId)
    {
        var cacheEntryOptions = new MemoryCacheEntryOptions
        {
            AbsoluteExpiration = DateTime.UtcNow.AddSeconds(authToken.ExpiresIn),
        };

        _cache.Set(authToken.Token, userId, cacheEntryOptions);
    }

    /// <summary>
    ///     Validates a refresh token.
    /// </summary>
    /// <param name="token">Token to validate</param>
    /// <returns>User ID and whether the token is valid</returns>
    public (string UserId, bool IsValid) IsTokenInMemory(string token)
    {
        return _cache.TryGetValue<string>(token, out var userId) ? (userId!, true) : (string.Empty, false);
    }

    /// <summary>
    ///     Removes a refresh token.
    /// </summary>
    /// <param name="token">Token to remove</param>
    public void RevokeTokenFromMemory(string token)
    {
        _cache.Remove(token);
    }
}
