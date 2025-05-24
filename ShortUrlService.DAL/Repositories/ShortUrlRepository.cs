using Microsoft.EntityFrameworkCore;
using ShortUrlService.Core.Models;
using ShortUrlService.DAL.Interfaces.Repositories;
using ShortUrlService.DTOs;

namespace ShortUrlService.DAL.Repositories
{
    public class ShortUrlRepository : IShortUrlRepository
    {
        private readonly AppDbContext _context;
        public ShortUrlRepository(AppDbContext dbContext)
        {
            _context = dbContext;
        }
        public async Task AddAsync(ShortUrl shortUrl)
        {
            await _context.ShortUrls.AddAsync(shortUrl);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            _context.ShortUrls.Remove(await GetByIdAsync(id));
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ShortUrl>> GetAllAsync()
        {
            return await _context.ShortUrls.ToListAsync();
        }

        public async Task<IEnumerable<ShortUrlListDto>> GetAllDtosAsync()
        {
            return await _context.ShortUrls
                .Select(url => new ShortUrlListDto 
                { 
                    OriginalUrl = url.OriginalUrl,
                    ShortCode = url.ShortCode 
                })
                .ToListAsync();
        }

        public async Task<ShortUrl> GetByCodeAsync(string code)
        {
            return await _context.ShortUrls.FirstOrDefaultAsync(url => url.ShortCode == code) 
                ?? throw new KeyNotFoundException($"Url with code {code} is not found.");
        }

        public async Task<ShortUrl> GetByIdAsync(Guid id)
        {
            return await _context.ShortUrls.FindAsync(id) 
                ?? throw new KeyNotFoundException($"Url with ID {id} is not found.");
        }
    }
}
