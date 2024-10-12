using FastEndpoints;
using Life.App.Backend.Contracts.Authentication;
using Life.App.Backend.Database;
using Microsoft.EntityFrameworkCore;

namespace Life.App.Backend.Features.Auth.SignIn;

public class SignInEndpoint : Endpoint<SignInRequest, AuthenticationDto>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly AuthenticationService _authenticationService;

    public SignInEndpoint(ApplicationDbContext dbContext, AuthenticationService authenticationService)
    {
        _dbContext = dbContext;
        _authenticationService = authenticationService;
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
        if (string.IsNullOrWhiteSpace(req.Username) || string.IsNullOrWhiteSpace(req.Password))
        {
            await SendUnauthorizedAsync(ct);
            return;
        }

        var user = await _dbContext.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Username == req.Username, ct);

        if (user is null || !_authenticationService.VerifyPassword(req.Password, user.PasswordSalt, user.PasswordHash))
        {
            await SendUnauthorizedAsync(ct);
            return;
        }

        var accessToken = _authenticationService.GenerateAuthenticationToken(user.Id.ToString());
        var refreshToken = _authenticationService.GenerateRefreshToken();

        _authenticationService.StoreTokenInMemory(refreshToken, user.Id.ToString());

        await SendAsync(
            new AuthenticationDto
            {
                Username = user.Username,
                AccessToken = accessToken,
                RefreshToken = refreshToken,
            },
            cancellation: ct
        );
    }
}
