using FastEndpoints;
using FluentValidation;

namespace Life.App.Backend.Features.Authentication.SignIn;

public class SignInValidator : Validator<SignInRequest>
{
    public SignInValidator()
    {
        RuleFor(x => x.Username).NotEmpty().WithMessage(Errors.FieldIsRequired);
        RuleFor(x => x.Password).NotEmpty().WithMessage(Errors.FieldIsRequired);
    }
}
