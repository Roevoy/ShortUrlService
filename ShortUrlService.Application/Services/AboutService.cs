using ShortUrlService.Application.Interfaces;
using ShortUrlService.DAL.Interfaces.Repositories;
namespace ShortUrlService.Application.Services
{
    public class AboutService : IAboutService
    {
        private readonly IAboutRepository _aboutRepository;

        public AboutService(IAboutRepository repository)
        {
            _aboutRepository = repository;
        }

        public async Task<string> GetAboutText()
        {
            return await _aboutRepository.GetAboutText();
        }

        public async Task SetAboutText(string text)
        {
            await _aboutRepository.SetAboutText(text);
        }
    }
}
