using FastEndpoints;
using Life.App.Backend.Database;
using Microsoft.EntityFrameworkCore;

namespace Life.App.Backend.Features.Auth.SignIn;

public class SignInEndpoint : Endpoint<SignInRequest, AuthDto>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly AuthService _authService;

    public SignInEndpoint(ApplicationDbContext dbContext, AuthService authService)
    {
        _dbContext = dbContext;
        _authService = authService;
    }

    public override void Configure()
    {
        Post("/auth");
        AllowAnonymous();
        Summary(s =>
        {
            s.Summary = "Sign in";
            s.Description = "Sign in using a username and password.";
        });
    }

    public override async Task HandleAsync(SignInRequest req, CancellationToken ct)
    {
        var user = await _dbContext.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Username == req.Username, ct);

        if (user is null || !_authService.VerifyPassword(req.Password, user.PasswordSalt, user.PasswordHash))
        {
            await Task.Delay(2000, ct);
            await SendUnauthorizedAsync(ct);
            return;
        }

        var accessToken = _authService.GenerateAuthToken(user.Id.ToString());
        var refreshToken = _authService.GenerateRefreshToken();

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
