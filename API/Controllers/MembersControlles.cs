using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        var members = context.Users.ToList();

        return members;
    }

    [HttpGet("{id}")] // localhost:5201/api/member/bob-id
    public async Task<ActionResult<AppUser>> GetMember(string id)
    {
        var member = await context.Users.Find(id);

        if (member == null) return NotFound();

        return member;
    }
}