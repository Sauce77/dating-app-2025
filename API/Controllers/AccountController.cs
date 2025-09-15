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

    [HttpPost("login")]
    public async Task<ActionResult<AppUser>> Login(LoginRequest request)
    {
        var user = await context.Users.SingleOrDefaultAsync(u => u.Email == request.Email);

        if (user == null) return Unauthorized("Invalid Email or Password");

        using var hmac = new HMACSHA512(user.PasswordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(request.Password));

        for (var i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Email or Password");
        } // validamos byte por byte

        return user;
    }
    private async Task<bool> EmailExists(string email)
    {
        return await context.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower());
    }
}