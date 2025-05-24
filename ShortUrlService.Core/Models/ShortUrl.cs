namespace ShortUrlService.Core.Models
{
    public class ShortUrl
    {
        public Guid Id { get; set; }
        public string OriginalUrl { get; set; }
        public string ShortCode { get; set; } 
        public Guid CreatedBy { get; set; } 
        public DateTime CreatedDate { get; set; }
    }
}
