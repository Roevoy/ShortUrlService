using ShortUrlService.Application.Interfaces;
using ShortUrlService.Core.Models;
using ShortUrlService.DAL.Interfaces.Repositories;
using ShortUrlService.DTOs;

namespace ShortUrlService.Application.Services
{
    public class ShortUrlService : IShortUrlService
    {
        private readonly IShortUrlRepository _shortUrlRepository;
        public ShortUrlService(IShortUrlRepository shortUrlRepository)
        {
            _shortUrlRepository = shortUrlRepository;
        }
        public async Task<ShortUrl> CreateShortUrlAsync(string originalUrl, Guid UserId)
        {
            ShortUrl url = new ShortUrl
            {
                Id = Guid.NewGuid(),
                OriginalUrl = originalUrl,
                ShortCode = GenerateShortCode(),
                CreatedDate = DateTime.Now,
                CreatedBy = UserId
            };
            await _shortUrlRepository.AddAsync(url);
            return url;
        }

        public async Task DeleteAsync(Guid id)
        {
            await _shortUrlRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<ShortUrl>> GetAllAsync()
        {
            return await _shortUrlRepository.GetAllAsync();
        }

        public async Task<IEnumerable<ShortUrlListDto>> GetAllDtosAsync()
        {
            return await _shortUrlRepository.GetAllDtosAsync();
        }

        public async Task<ShortUrl> GetByCodeAsync(string code)
        {
            return await _shortUrlRepository.GetByCodeAsync(code);
        }
        public async Task<ShortUrl> GetByIdAsync(Guid id)
        {
            return await _shortUrlRepository.GetByIdAsync(id);
        }

        public async Task<bool> IsUniqueAsync(string url)
        {
            try
            {
                await _shortUrlRepository.GetByOriginalUrlAsync(url);
                return false;
            }
            catch (KeyNotFoundException) { return true; }
        }

        private string GenerateShortCode()
        {
            return Guid.NewGuid().ToString("N")[..6];
        }
    }
}
