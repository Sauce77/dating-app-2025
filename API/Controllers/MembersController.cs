using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Entities;

namespace API.Controllers;

[Route("api/[controller]")] // localhost:5201/api/members
[ApiController]

public class MembersController(AppDbContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<AppUser>>> GetMembers()
    {
        var members = context.Users.ToListAsync();

        return Ok(members);
    }

    [HttpGet("{id}")] // localhost:5201/api/member/bob-id
    public async Task<ActionResult<AppUser>> GetMember(string id)
    {
        var member = await context.Users.FindAsync(id);

        if (member == null) return NotFound();

        return Ok(member);
    }
}