namespace ShortUrlService.Application.Interfaces;
public interface IAboutService
{
    Task<string> GetAboutText();
    Task SetAboutText(string text);
}