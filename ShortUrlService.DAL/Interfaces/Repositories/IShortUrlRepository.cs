using ShortUrlService.Core.Models;
using ShortUrlService.DTOs;

namespace ShortUrlService.DAL.Interfaces.Repositories
{
    public interface IShortUrlRepository
    {
        Task<ShortUrl> GetByIdAsync(Guid id);
        Task<ShortUrl> GetByCodeAsync(string code);
        Task<IEnumerable<ShortUrl>> GetAllAsync();
        Task<IEnumerable<ShortUrlListDto>> GetAllDtosAsync();
        Task AddAsync(ShortUrl shortUrl);
        Task DeleteAsync(Guid id);
    }
}
