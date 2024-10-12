using FastEndpoints;

namespace Life.App.Backend.Features.Authentication.SignOut;

public class SignOutEndpoint : Endpoint<SignOutRequest>
{
    private readonly AuthenticationService _authService;

    public SignOutEndpoint(AuthenticationService authService)
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
        if (string.IsNullOrWhiteSpace(req.RefreshToken))
        {
            return SendOkAsync(ct);
        }

        _authService.RevokeTokenFromMemory(req.RefreshToken);
        return SendOkAsync(ct);
    }
}
