using Life.App.Backend.Database.Entities;
using Life.App.Backend.Features.Authentication;
using Microsoft.EntityFrameworkCore;

namespace Life.App.Backend.Database;

public class ApplicationDbContextInitializer
{
    private readonly ILogger<ApplicationDbContextInitializer> _logger;
    private readonly IConfiguration _configuration;
    private readonly ApplicationDbContext _dbContext;
    private readonly AuthenticationService _authenticationService;

    public ApplicationDbContextInitializer(
        ILogger<ApplicationDbContextInitializer> logger,
        IConfiguration configuration,
        ApplicationDbContext dbContext,
        AuthenticationService authenticationService
    )
    {
        _logger = logger;
        _dbContext = dbContext;
        _configuration = configuration;
        _authenticationService = authenticationService;
    }

    public async Task InitialiseAsync()
    {
        try
        {
            if (_dbContext.Database.IsRelational())
            {
                await _dbContext.Database.MigrateAsync();
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while initialising the database");
            throw;
        }
    }

    public async Task SeedAsync()
    {
        try
        {
            await TrySeedAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while seeding the database");
            throw;
        }
    }

    private async Task TrySeedAsync()
    {
        var username = _configuration.GetValue<string?>("DEFAULT_USER") ?? "admin";
        var password = _configuration.GetValue<string?>("DEFAULT_PASSWORD") ?? "admin";
        var userCount = await _dbContext.Users.CountAsync();
        if (userCount == 0)
        {
            var salt = _authenticationService.GenerateRandomSalt();
            var passwordHash = _authenticationService.HashPassword(password, salt);
            var user = new User
            {
                Username = username,
                PasswordHash = passwordHash,
                PasswordSalt = salt,
            };

            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
        }
    }
}
