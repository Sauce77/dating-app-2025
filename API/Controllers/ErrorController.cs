using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;

public class ErrorController : BaseApiController
{

    [HttpGet("bad-request")]
    public IActionResult GetBadRequest(){
        return BadRequest("bad-request");
    }

    [HttpGet("not-found")]
    public IActionResult GetNotFound(){
        return NotFound();
    }
    
    [HttpGet("auth")]
    public IActionResult GetAuth(){
        throw new Exception("server-error");
    }
}