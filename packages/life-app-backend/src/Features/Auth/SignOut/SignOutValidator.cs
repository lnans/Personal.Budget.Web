using FastEndpoints;
using FluentValidation;

namespace Life.App.Backend.Features.Auth.SignOut;

public class SignOutValidator : Validator<SignOutRequest>
{
    public SignOutValidator()
    {
        RuleFor(x => x.RefreshToken).NotEmpty().WithMessage(Errors.FieldIsRequired);
    }
}
