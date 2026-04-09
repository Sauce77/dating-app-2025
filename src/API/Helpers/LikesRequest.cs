using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers;

public class LikesRequest : PaginationRequest
{
    public string MemberId { get; set; } = "";
    [Required]
    public required string Predicate { get; set; } = "liked";   
}
