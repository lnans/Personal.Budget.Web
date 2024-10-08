using System.ComponentModel.DataAnnotations;
using Life.App.Backend.Api.Database.Common;

namespace Life.App.Backend.Api.Database.Entities;

public class User : BaseAuditableEntity
{
    [Key]
    public Guid Id { get; set; }

    [MaxLength(256)]
    public required string Username { get; set; }

    [MaxLength(256)]
    public required string PasswordHash { get; set; }
}
