using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.DTOs;

namespace API.Interfaces;

public interface IMessagesRepository
{
    void Add(Message message);
    void Delete(Message message);

    Task<Message?> Get(string messageId);

    Task<PaginationResult<MessageResponse>> GetForMember();

    Task<IReadOnlyList<Member>> GetThread(string currentMemberId, string recipientId);

    Task<bool> SaveAllAsync();
}
