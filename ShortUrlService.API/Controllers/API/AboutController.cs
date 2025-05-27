using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShortUrlService.Application.Interfaces;

namespace ShortUrlService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AboutController : ControllerBase
    {
        private readonly IAboutService _aboutService;
        public AboutController(IAboutService aboutService)
        {
            _aboutService = aboutService;
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAboutText()
        {
            var text = await _aboutService.GetAboutText();
            return Content(text, "text/plain");
        }
        
        [HttpPost]
        public async Task<IActionResult> UpdateAbout([FromBody] string text)
        {
            if (!User.IsInRole("Admin"))
                return Forbid();

            await _aboutService.SetAboutText(text);
            return Ok("Updated");
        }
    }
}
