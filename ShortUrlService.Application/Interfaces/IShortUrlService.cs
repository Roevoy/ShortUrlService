using ShortUrlService.Core.Models;
using ShortUrlService.DTOs;

namespace ShortUrlService.Application.Interfaces
{
    public interface IShortUrlService
    {
        Task<ShortUrl> CreateShortUrlAsync(string originalUrl, Guid userId);
        Task<ShortUrl> GetByCodeAsync(string code);
        Task<ShortUrl> GetByIdAsync(Guid id);
        Task<IEnumerable<ShortUrl>> GetAllAsync();
        Task<IEnumerable<ShortUrlListDto>> GetAllDtosAsync();
        Task DeleteAsync(Guid id);
    }
}
