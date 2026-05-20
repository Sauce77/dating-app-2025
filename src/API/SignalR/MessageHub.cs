using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

[Authorize]
public class MessageHub(IMessagesRepository messageRepository) : Hub
{
    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();
        var otherUser = httpContext?.Request.Query["userId"] ?? throw new HubException("Other user not found");
        var groupName = GetGroupName(GetUserId(), otherUser);
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

        var messages = await messageRepository.GetThread(GetUserId(), otherUser);
        await Clients.Group(groupName).SendAsync("ReceiveMessageThread", messages);
    }

    private static string GetGroupName(string? caller, string? other)
    {
        var stringCompare = string.CompareOrdinal(caller, other) < 0;
        return stringCompare ? $"{caller}-{other}" : $"{other}-{caller}";
    }

    private string GetUserId()
    {
        return Context.User?.FindFirstValue(ClaimTypes.Email) ?? throw new HubException("Cannot get memberId");
    }
}
