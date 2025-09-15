using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;

[Route("api/[controller]")] // https://localhost:5201/api/members
[ApiController]
[Authorize]
public class MembersController(AppDbContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<AppUser>>> GetMembers()
    {
        var members = await context.Users.ToListAsync();

        return members;
    }

    [AllowAnonymous]
    [HttpGet("{id}")] // https://localhost:5201/api/members/bob-id
    public async Task<ActionResult<AppUser>> GetMember(string id)
    {
        var member = await context.Users.FindAsync(id);

        if (member == null) return NotFound();

        return member;
    }
}