using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;

[Route("api/[controller]")] // https://localhost:5201/api/members
[ApiController]
[Authorize]
public class MembersController(IMembersRepository membersRepository) : BaseApiController
{
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Member>>> GetMembers()
    {
        return Ok(await membersRepository.GetMembersAsync());
    }

    [AllowAnonymous]
    [HttpGet("{id}")] // https://localhost:5201/api/members/bob-id
    public async Task<ActionResult<Member>> GetMember(string id)
    {
        return await membersRepository.GetMemberAsync(id) ?? throw new ArgumentNullException();
    }

    [HttpGet("id/photos")]
    public async Task<ActionResult<IReadOnlyList<PathTooLongException>>> GetPhotos(string id)
    {
        return Ok(await membersRepository.GetPhotosAsync(id));
    }
}