namespace ShortUrlService.Core.Models
{
    public class AboutTextEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Text { get; set; } = string.Empty;
    }
}
