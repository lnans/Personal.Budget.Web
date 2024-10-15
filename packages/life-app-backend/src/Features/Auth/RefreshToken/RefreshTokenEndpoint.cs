using FastEndpoints;
using Life.App.Backend.Database;
using Microsoft.EntityFrameworkCore;

namespace Life.App.Backend.Features.Auth.RefreshToken;

public class RefreshTokenEndpoint : Endpoint<RefreshTokenRequest, AuthDto>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly AuthService _authService;

    public RefreshTokenEndpoint(ApplicationDbContext dbContext, AuthService authService)
    {
        _dbContext = dbContext;
        _authService = authService;
    }

    public override void Configure()
    {
        Post("/auth/refresh");
        AllowAnonymous();
        Summary(s =>
        {
            s.Summary = "Refresh access token";
            s.Description = "Returns a new access token and refresh token using a valid refresh token.";
        });
    }

    public override async Task HandleAsync(RefreshTokenRequest req, CancellationToken ct)
    {
        var (userId, isValid) = _authService.IsTokenInMemory(req.RefreshToken);
        if (!isValid)
        {
            await SendUnauthorizedAsync(ct);
            return;
        }

        var user = await _dbContext.Users.AsNoTracking().FirstOrDefaultAsync(x => x.Id == new Guid(userId), ct);

        if (user is null)
        {
            await SendUnauthorizedAsync(ct);
            return;
        }

        var accessToken = _authService.GenerateAuthToken(user.Id.ToString());
        var refreshToken = _authService.GenerateRefreshToken();

        _authService.RevokeTokenFromMemory(req.RefreshToken);
        _authService.StoreTokenInMemory(refreshToken, user.Id.ToString());

        await SendAsync(
            new AuthDto
            {
                Username = user.Username,
                AccessToken = accessToken,
                RefreshToken = refreshToken,
            },
            cancellation: ct
        );
    }
}
