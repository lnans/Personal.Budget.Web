using Ardalis.GuardClauses;
using Life.App.Backend.Api.Database;
using Life.App.Backend.Api.Database.Interceptors;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Life.App.Backend.Api.Configuration;

public static class DatabaseConfiguration
{
    public static void ConfigureDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("Database");
        Guard.Against.NullOrWhiteSpace(connectionString, message: "ConnectionString: 'Database' not found.");

        services
            .AddSingleton(TimeProvider.System)
            .AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>()
            .AddScoped<ApplicationDbContextInitializer>()
            .AddDbContext<ApplicationDbContext>(
                (sp, options) =>
                {
                    options.AddInterceptors(sp.GetServices<ISaveChangesInterceptor>());
                    options.UseNpgsql(connectionString);
                }
            );
    }

    public static async Task InitDatabase(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        var initializer = scope.ServiceProvider.GetRequiredService<ApplicationDbContextInitializer>();

        await initializer.InitialiseAsync();
        await initializer.SeedAsync();
    }
}
