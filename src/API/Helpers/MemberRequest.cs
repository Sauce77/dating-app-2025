using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers;

public class MemberRequest : PaginationRequest
{
    public string? Gender { get; set; }

    public string? CurrentMemberId { get; set; }
}
