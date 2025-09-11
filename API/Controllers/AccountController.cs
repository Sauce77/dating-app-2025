using System;
using System.Text;
using System.Security.Cryptography;
using API.Data;
using API.Entities;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers;

public class AccountController(AppDbContext context) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<AppUser>> Register(RegisterRequest request)
    {

        if (await EmailExists(request.Email)) return BadRequest("Email already in use, dork >:(");
        using var hmacStream = new HMACSHA512();

        var user = new AppUser
        {
            DisplayName = request.DisplayName,
            Email = request.Email,
            PasswordHash = hmacStream.ComputeHash(Encoding.UTF8.GetBytes(request.Password)),
            PasswordSalt = hmacStream.Key
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return user;
    }

    private async Task<bool> EmailExists(string email)
    {
        return await context.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower());
    }
}