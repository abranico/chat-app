using ChatApp.Models;
using Microsoft.AspNetCore.Identity;

namespace ChatApp.Services;

public class GuestCleanupService(
    ILogger<GuestCleanupService> _logger,
    IServiceScopeFactory _serviceScopeFactory
    ) : BackgroundService
{

    protected override async Task ExecuteAsync(CancellationToken cancellationToken)
    {
        while (!cancellationToken.IsCancellationRequested)
        {
            _logger.LogInformation("Cleaning up guest users.");

            using IServiceScope scope = _serviceScopeFactory.CreateScope();

            var _userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();

            // Lógica de limpieza de cuentas guest

            try
            {
                // Obtén la fecha límite para las cuentas guest (14 días atrás)
                var expirationDate = DateTime.UtcNow.AddDays(-14);

                // Encuentra todas las cuentas guest que no se han registrado y que han sido creadas hace más de 14 días
                var expiredGuests = _userManager.Users
                    .Where(u => u.IsGuest && u.CreatedAt <= expirationDate)
                    .ToList();

                foreach (var guest in expiredGuests)
                {
                    // Elimina la cuenta guest
                    var result = await _userManager.DeleteAsync(guest);
                    if (result.Succeeded)
                    {
                        _logger.LogInformation($"Guest account {guest.UserName} has been deleted due to inactivity.");
                    }
                    else
                    {
                        _logger.LogWarning($"Failed to delete guest account {guest.UserName}: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while cleaning up guest accounts.");
            }

            // Espera 24 horas antes de ejecutar la siguiente limpieza
            await Task.Delay(TimeSpan.FromDays(1), cancellationToken);
        }
    }
}
