using FastEndpoints;

namespace Life.App.Backend.Features.Auth.SignOut;

public class SignOutEndpoint : Endpoint<SignOutRequest>
{
    private readonly AuthService _authService;

    public SignOutEndpoint(AuthService authService)
    {
        _authService = authService;
    }

    public override void Configure()
    {
        Delete("/auth");
        Summary(s =>
        {
            s.Summary = "Sign out";
            s.Description = "Sign out by revoking a refresh token.";
        });
    }

    public override Task HandleAsync(SignOutRequest req, CancellationToken ct)
    {
        _authService.RevokeTokenFromMemory(req.RefreshToken);
        return SendOkAsync(ct);
    }
}
