using Life.App.Backend.Api.Configuration;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;

services.ConfigureApi();
services.ConfigureDatabase(configuration);

var app = builder.Build();

app.InitApi();
await app.InitDatabase();

app.Run();
