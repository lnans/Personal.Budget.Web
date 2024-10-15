using System.Text;
using FastEndpoints;
using FastEndpoints.Swagger;
using Life.App.Backend.Features.Auth;
using Life.App.Backend.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using NSwag;

namespace Life.App.Backend.Configuration;

public static class ApiConfiguration
{
    private const string ApiPrefix = "api";

    private const string DocTitle = "Life API";
    private const string DocVersion = "v1";
    private const string DocEndpoint = "/doc";
    private const string DocSpecEndpoint = "/openapi/life-api.json";

    public static void ConfigureApi(this IServiceCollection services, IConfiguration configuration)
    {
        var authenticationSettings = AuthSettings.Create(configuration);

        services
            .AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(authenticationSettings.JwtSecret)
                    ),
                };
            });

        // Extension from FastEndpoints
        services.SwaggerDocument(options =>
        {
            options.EnableJWTBearerAuth = false;
            options.DocumentSettings = s =>
            {
                s.Title = DocTitle;
                s.DocumentName = DocVersion;
                s.Version = DocVersion;
                s.AddAuth(
                    JwtBearerDefaults.AuthenticationScheme.ToLower(),
                    new()
                    {
                        Type = OpenApiSecuritySchemeType.Http,
                        In = OpenApiSecurityApiKeyLocation.Header,
                        Scheme = JwtBearerDefaults.AuthenticationScheme.ToLower(),
                    }
                );
            };
        });

        services.AddAuthorization();

        services.AddSingleton(authenticationSettings);
        services.AddSingleton<AuthService>();

        services.AddMemoryCache();
        services.AddFastEndpoints();
    }

    public static void InitApi(this WebApplication app)
    {
        app.UseAuthentication();
        app.UseAuthorization();

        // register all endpoints under Features directory
        app.UseFastEndpoints(c =>
        {
            c.Endpoints.RoutePrefix = ApiPrefix;
            c.Errors.UseProblemDetails(); // RFC7807 & RFC9457 Compatible Problem Details
        });

        app.UseOpenApi(c =>
        {
            c.Path = DocSpecEndpoint;
        });
        app.UseOpenApiUi();

        app.MapGet("/", () => Results.Redirect(DocEndpoint)).ExcludeFromDescription();
    }

    private static void UseOpenApiUi(this IEndpointRouteBuilder endpoints)
    {
        endpoints
            .MapGet(
                DocEndpoint,
                () =>
                    Results.Content(
                        $$"""
                        <!doctype html>
                        <html>
                          <head>
                            <title>{{DocTitle}}</title>
                            <meta charset="utf-8" />
                            <meta
                              name="viewport"
                              content="width=device-width, initial-scale=1" />
                          </head>
                          <body>
                            <script id="api-reference"></script>
                            <script>
                                document.addEventListener('DOMContentLoaded', function() {
                                    const ev = new CustomEvent('scalar:update-references-config', {
                                        detail: {
                                            configuration: {
                                                spec: {
                                                  url: '{{DocSpecEndpoint}}',
                                                },
                                                theme: 'default',
                                                layout: 'modern',
                                                operationsSorter: (a, b) => {
                                                    const methodOrder = ['GET', 'POST', 'PUT', 'DELETE'];
                                                    const pathLengthComparison = a.path.length - b.path.length;

                                                    if (pathLengthComparison !== 0) {
                                                        return pathLengthComparison;
                                                    }

                                                    const methodComparison = methodOrder.indexOf(a.httpVerb) - methodOrder.indexOf(b.httpVerb);
                                                    return methodComparison;
                                                },
                                            },
                                        },
                                    })
                                    document.dispatchEvent(ev)
                                    document.dispatchEvent(new Event('scalar:reload-references'))
                                })
                            </script>
                            <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
                          </body>
                        </html>
                        """,
                        "text/html"
                    )
            )
            .ExcludeFromDescription();
    }
}
