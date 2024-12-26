using ChatApp.Models;
using ChatApp.Models.Requests;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;


namespace ChatApp.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public AuthController(UserManager<User> userManager, SignInManager<User> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;

    }

    [HttpGet("me")]
    public async Task<IActionResult> GuestLogin()
    {

        if (User.Identity.IsAuthenticated)
        {
            return Ok(new {
                id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value,
                username = User.Identity?.Name,
            });
        }

        var guestUsername = "guest_" + Guid.NewGuid().ToString().Substring(0, 8);

        var guestUser = new User
        {
            UserName = guestUsername,
            Email = $"{guestUsername}@guest.local",
            IsGuest = true,
        };

        var result = await _userManager.CreateAsync(guestUser, Guid.NewGuid().ToString());

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        await _signInManager.SignInAsync(guestUser, isPersistent: true);

        return Ok("Guest session created and logged in.");          
        
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
    {
        if (!User.Identity.IsAuthenticated) return BadRequest("No session found");

        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
            return BadRequest(new { Errors = errors });
        }

        var user = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));

        if (user == null)
        {
            return BadRequest("User not found");      
        }

        var changeUsernameResult = await _userManager.SetUserNameAsync(user, registerRequest.UserName);
        if (!changeUsernameResult.Succeeded)
        {
            return BadRequest(new { Errors = changeUsernameResult.Errors });
        }

        var changeEmailResult = await _userManager.ChangeEmailAsync(user, registerRequest.Email, await _userManager.GenerateChangeEmailTokenAsync(user, registerRequest.Email));
        if (!changeEmailResult.Succeeded)
        {
            return BadRequest(new { Errors = changeEmailResult.Errors });

        }

        var resultPassword = await _userManager.RemovePasswordAsync(user);
        if (!resultPassword.Succeeded)
        {
            return BadRequest(new { Errors = resultPassword.Errors });
        }

        var resultSetPassword = await _userManager.AddPasswordAsync(user, registerRequest.Password);
        if (!resultSetPassword.Succeeded)
        {
            return BadRequest(new { Errors = resultSetPassword.Errors });
        }

        return Ok();

    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        var user = await _userManager.FindByEmailAsync(loginRequest.Email);

        if (user == null) return BadRequest("Invalid login attempt.");

        var result = await _signInManager.PasswordSignInAsync(user.UserName, loginRequest.Password, true, false);

        if (result.Succeeded) return Ok();

        if (result.IsLockedOut)
            return BadRequest("Your account is locked due to too many failed login attempts. Please try again later.");

        if (result.IsNotAllowed) return BadRequest("Not allowed");

        if (result.RequiresTwoFactor) return BadRequest("2fa");

        return BadRequest("Invalid login attempt.");

    }

    [HttpDelete("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Ok(new { message = "User logged out successfully" });
    }

}
