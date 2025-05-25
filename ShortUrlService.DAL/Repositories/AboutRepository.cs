using Microsoft.EntityFrameworkCore;
using ShortUrlService.Core.Models;
using ShortUrlService.DAL.Interfaces.Repositories;

namespace ShortUrlService.DAL.Repositories
{
    public class AboutRepository : IAboutRepository
    {
        private readonly AppDbContext _context;
        public AboutRepository(AppDbContext dbContext)
        {
           _context = dbContext; 
        }
        public async Task<string> GetAboutText()
        {
            var entity = await _context.AboutTexts.FirstOrDefaultAsync();
            return entity?.Text ?? string.Empty;
        }

        public async Task SetAboutText(string text)
        {
            var entity = await _context.AboutTexts.FirstOrDefaultAsync();
            if (entity == null)
            {
                entity = new AboutTextEntity { Text = text };
                await _context.AboutTexts.AddAsync(entity);
            }
            else
            {
                entity.Text = text;
            }
            await _context.SaveChangesAsync();
        }
    }
}
