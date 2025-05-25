using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShortUrlService.Core.Models;
using ShortUrlService.DAL.Migrations;
using System.Xml;

namespace ShortUrlService.DAL
{
    public class AppDbContext : IdentityDbContext<AppUser, IdentityRole<Guid>, Guid>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<ShortUrl> ShortUrls => Set<ShortUrl>();
        public DbSet<AboutTextEntity> AboutTexts { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ShortUrl>()
                .HasKey(url => url.Id);

            modelBuilder.Entity<ShortUrl>()
                .HasIndex(url => url.OriginalUrl)
                .IsUnique();

            base.OnModelCreating(modelBuilder); 
        }
    }
}

