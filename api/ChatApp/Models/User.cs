using Microsoft.AspNetCore.Identity;

namespace ChatApp.Models;

public class User : IdentityUser
{

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool IsGuest { get; set; }
}
