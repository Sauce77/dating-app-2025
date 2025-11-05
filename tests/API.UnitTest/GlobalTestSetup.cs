using System.Threading.Tasks;
using NUnit.Framework;
using Microsoft.EntityFrameworkCore;

using API.Data;

namespace API.UnitTest;

[SetUpFixture]
public class GlobalTestSetup
{

    public static AppDbContext AppDbContext { get; private set; }

    [OneTimeSetUp]
    public async Task Setup()
    {
        DbContextOptions<AppDbContext> options = new DbContextOptionsBuilder<AppDbContext>()
        .UseSqlite("Data source=dating.db")
        .Options;

        AppDbContext = new AppDbContext(options);
        await AppDbContext.Database.MigrateAsync();
    }

    [OneTimeTearDown]
    public async Task TearDown()
    {
        await AppDbContext.DisposeAsync();
    }

}
