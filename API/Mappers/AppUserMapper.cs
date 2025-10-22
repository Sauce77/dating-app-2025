using System;
using API.Entities;
using API.DTOs;
using API.Services;
using API.Interfaces;
using System.Reflection.Metadata;

namespace API.Mappers;

public static class AppUserMapper
{
    public static UserResponse ToDto(this AppUser appUser, ITokenService tokenService)
    {
        return new UserResponse
        {
            Id = appUser.Id,
            DisplayName = appUser.DisplayName,
            Email = appUser.Email,
            ImageUrl = appUser.ImageUrl,
            Token = tokenService.CreateToken(appUser),
        };

    }
}