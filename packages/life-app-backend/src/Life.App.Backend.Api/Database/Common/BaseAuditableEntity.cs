namespace Life.App.Backend.Api.Database.Common;

public abstract class BaseAuditableEntity
{
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
}
