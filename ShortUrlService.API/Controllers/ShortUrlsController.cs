using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShortUrlService.Application.Interfaces;
using System.Security.Claims;

namespace ShortUrlService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ShortUrlsController : ControllerBase
    {
        private readonly IShortUrlService _shortUrlService;
        public ShortUrlsController(IShortUrlService shortUrlService)
        {
            _shortUrlService = shortUrlService;
        }

        [HttpGet("full")]
        public async Task<IActionResult> GetAll()
        {
            var urls = await _shortUrlService.GetAllAsync();
            return Ok(urls);
        }

        [HttpGet("light")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllDtos()
        {
            var urls = await _shortUrlService.GetAllDtosAsync();
            return Ok(urls);
        }

        [HttpGet("details/{code}")]
        public async Task<IActionResult> GetByCode(string code)
        {
            var url = await _shortUrlService.GetByCodeAsync(code);
            return Ok(url);
        }

        [HttpGet("{code}")]
        [AllowAnonymous]
        public async Task<IActionResult> RedirectToOriginal(string code)
        {
            var url = await _shortUrlService.GetByCodeAsync(code);
            return Redirect(url.OriginalUrl);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] string originalUrl)
        {
            var shortUrl = await _shortUrlService.CreateShortUrlAsync(originalUrl, GetCurrentUserId());
            return CreatedAtAction(nameof(GetByCode), new { code = shortUrl.ShortCode }, shortUrl);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var url = await _shortUrlService.GetByIdAsync(id);
            if (url.CreatedBy != GetCurrentUserId() && !User.IsInRole("Admin"))
                return Forbid();

            await _shortUrlService.DeleteAsync(id);
            return NoContent();
        }
        private Guid GetCurrentUserId()
        {
            var userIdAsStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdAsStr, out Guid userId)) return Guid.Empty;
            return userId;
        }
    }
}
