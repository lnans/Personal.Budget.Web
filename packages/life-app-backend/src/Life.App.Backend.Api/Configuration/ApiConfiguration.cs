namespace Life.App.Backend.Api.Configuration;

public static class ApiConfiguration
{
    public static void ConfigureApi(this IServiceCollection services)
    {
        services.AddOpenApi();
        services.AddAuthentication();
        services.AddAuthorization();
    }

    public static void InitApi(this WebApplication app)
    {
        app.MapOpenApi();
        app.MapOpenApiUi();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapGet("/", () => "service available");
    }

    private static void MapOpenApiUi(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/doc", () => Results.Content(
            """
            <!doctype html>
            <html>
              <head>
                <title>Scalar API Reference</title>
                <meta charset="utf-8" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1" />
              </head>
              <body>
                <!-- Add your own OpenAPI/Swagger specification URL here: -->
                <!-- Note: The example is our public proxy (to avoid CORS issues). You can remove the `data-proxy-url` attribute if you don’t need it. -->
                <script
                  id="api-reference"
                  data-url="/openapi/v1.json"></script>

                <!-- Optional: You can set a full configuration object like this: -->
                <!-- theme?: 'alternate' | 'default' | 'moon' | 'purple' | 'solarized' | 'bluePlanet' | 'saturn' | 'kepler' | 'mars' | 'deepSpace' | 'none' -->
                <script>
                  var configuration = {
                    theme: 'purple',
                    layout: 'modern',
                  }

                  document.getElementById('api-reference').dataset.configuration =
                    JSON.stringify(configuration)
                </script>
                <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
              </body>
            </html>
            """, "text/html")).ExcludeFromDescription();
    }
}
