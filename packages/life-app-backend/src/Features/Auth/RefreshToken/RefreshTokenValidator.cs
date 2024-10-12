using FastEndpoints;
using FluentValidation;

namespace Life.App.Backend.Features.Auth.RefreshToken;

public class RefreshTokenValidator : Validator<RefreshTokenRequest>
{
    public RefreshTokenValidator()
    {
        RuleFor(x => x.RefreshToken).NotEmpty().WithMessage(Errors.FieldIsRequired);
    }
}
