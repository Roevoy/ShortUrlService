using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShortUrlService.Core.Models;
using ShortUrlService.DAL.Migrations;

namespace ShortUrlService.DAL
{
    public class AppDbContext : IdentityDbContext<AppUser, IdentityRole<Guid>, Guid>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<ShortUrl> ShortUrls => Set<ShortUrl>();
        public DbSet<AboutTextEntity> AboutTexts { get; set; }
    }
}

