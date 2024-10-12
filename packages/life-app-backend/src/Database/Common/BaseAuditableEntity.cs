namespace Life.App.Backend.Database.Common;

public abstract class BaseAuditableEntity
{
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
}
