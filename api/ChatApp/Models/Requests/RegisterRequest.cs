using System.ComponentModel.DataAnnotations;

namespace ChatApp.Models.Requests;

public class RegisterRequest
{
    public string UserName { get; set; }
    public string Password { get; set; }
    [EmailAddress]
    public string Email { get; set; }
}
