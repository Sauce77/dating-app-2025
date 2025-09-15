using System;
using API.interfaces;


namespace API.Services;
public class TokenService(IConfiguration configuration) : ITokenService
{
    public string CreateToken(AppUser user)
    {
        var tokenKey = configuration["TokenKey"] ?? throw new ArgumentNullException("Stupid, I can't get token key.");

        if (tokenKey != null && tokenKey.Length < 64) throw new ArgumentExcpetion("Token must be >= 64 chars, you dumb >:(");

        var key = new SymmetricSecurityKey
    }
}