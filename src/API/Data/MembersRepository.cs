using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Entities;
using Microsoft.EntityFrameworkCore;


namespace API.Data;

public class MembersRepository(AppDbContext context) : IMembersRepository
{
    public async Task<Member?> GetMemberAsync(string id)
    {
        return await context.Members.AsQueryable().Include(x => x.User).Where(u => u.Id == id).FirstOrDefaultAsync();
    }

    public async Task<Member?> GetMemberForUpdate(string id)
    {
        return await context.Members.Include(m => m.User).SingleOrDefaultAsync(m => m.Id == id);
    }

    public async Task<IReadOnlyList<Member>> GetMembersAsync()
    {
        return await context.Members
        // .include(m => m.Photos)
        .ToListAsync();
    }

    public async Task<IReadOnlyList<Photo>> GetPhotosAsync(string memberId)
    {
        return await context.Members
        .Where(m => m.Id == memberId)
        .SelectMany(m => m.Photos)
        .ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void Update(Member member)
    {
        context.Entry(member).State = EntityState.Modified;
    }
}
