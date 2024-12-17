using Microsoft.AspNetCore.SignalR;
using ChatApp.Hubs;
using ChatApp.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Identity;
using ChatApp.Models;
using ChatApp.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();





string connectionString = builder.Configuration["ConnectionStrings:DefaultConnection"]!;
builder.Services.AddDbContext<ApplicationContext>(options => options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 33))));


builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;

    options.SignIn.RequireConfirmedEmail = false;

    options.User.RequireUniqueEmail = true;
})
    .AddDefaultTokenProviders()
    .AddEntityFrameworkStores<ApplicationContext>();

builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

builder.Services.AddHostedService<GuestCleanupService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapHub<ChatHub>("/chat");

app.Run();
