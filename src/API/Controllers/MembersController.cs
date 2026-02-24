using System.Security.Claims;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using API.Mappers;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class MembersController(IMembersRepository membersRepository, IPhotoService photoService) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Member>>> GetMembers()
    {
        return Ok(await membersRepository.GetMembersAsync());
    }

    [HttpGet("{id}")] // https://localhost:5001/api/members/bob-id
    public async Task<ActionResult<Member>> GetMember(string id)
    {
        var member = await membersRepository.GetMemberAsync(id);

        if (member == null) return NotFound();

        return member.ToResponse();
    }

    [HttpGet("{id}/photos")]
    public async Task<ActionResult<IReadOnlyList<Photo>>> GetPhotos(string id)
    {
        return Ok(await membersRepository.GetPhotosAsync(id));
    }

    [HttpPut]
    public async Task<ActionResult> UpdateMember(MemberUpdateRequest request)
    {
        var memberId = User.GetMemberId();
        var member = await membersRepository.GetMemberForUpdateAsync(memberId);

        if (member == null)
        {
            return BadRequest("Failed to get member");
        }

        member.DisplayName = request.DisplayName ?? member.DisplayName;
        member.Description = request.Description ?? member.Description;
        member.City = request.City ?? member.City;
        member.Country = request.Country ?? member.Country;

        member.User.DisplayName = request.DisplayName ?? member.User.DisplayName;

        membersRepository.Update(member);

        if (await membersRepository.SaveAllAsync())
        {
            return NoContent();
        }

        return BadRequest("Failed to update profile");
    } 

    [HttpPost("photo")]
    public async Task<ActionResult<Photo>> AddPhoto([FromForm]IFormFile file)
    {
        var member = await membersRepository.GetMemberForUpdateAsync(User.GetMemberId());

        if (member == null)
        {
            return NotFound("Member not found");
        }

        var result = await photoService.UploadPhotoAsync(file);

        if (result.Error != null)
        {
            return BadRequest(result.Error.Message);
        }

        var photo = new Photo
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId,
            MemberId = User.GetMemberId()

        };

        if (member.ImageUrl == null)
        {
            member.ImageUrl = photo.Url;
            member.User.ImageUrl = photo.Url;
        }

        member.Photos.Add(photo);

        if (await membersRepository.SaveAllAsync())
        {
            return photo;
        }

        return BadRequest("Une chose a ete mauvaise");
    }

    [HttpPut("photo/{photoId}")]
    public async Task<ActionResult> SetMainPhoto(int photoId)
    {
        var member = await membersRepository.GetMemberForUpdateAsync(User.GetMemberId());

        if (member == null) return BadRequest("Token ne pas trouve sur member");

        var photo = member.Photos.SingleOrDefault(p => p.Id == photoId);

        if (member.ImageUrl == photo?.Url || photo == null) return BadRequest("Ce n'a pas pu mettre la photo comme profile.");

        member.ImageUrl = photo?.Url;
        member.User.ImageUrl = photo?.Url;

        if(await membersRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Quelque merde a passe en mettant de la photo du profile");
    }

    [HttpDelete("photo/{photoId}")]
    public async Task<ActionResult> DeletePhoto(int photoId)
    {
        var member = await membersRepository.GetMemberForUpdateAsync(User.GetMemberId());

        if (member == null) return BadRequest("Token ne pas trouve sur member");

        var photo = member.Photos.SingleOrDefault(p => p.Id == photoId);

        if (photo == null || photo.Url == member.ImageUrl)
        {
            return BadRequest("On ne peux pas effacer ce photo ou c'est votre photu du profile.");
        }

        if (photo.PublicId != null)
        {
            var result = await photoService.DeletePhotoAsync(photo.PublicId);
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }
        }

        member.Photos.Remove(photo);

        if (await membersRepository.SaveAllAsync())
        {
            return Ok();
        }

        return BadRequest("Il y a eu qq probleme pendant l'effacement du photo");
    }
}