namespace ShortUrlService.DAL.Interfaces.Repositories
{
    public interface IAboutRepository
    {
        public Task<string> GetAboutText();
        public Task SetAboutText(string text);
    }
}

