using Microsoft.AspNetCore.Mvc;
using ShortUrlService.API.Models.MVC;
using ShortUrlService.Application.Interfaces;

namespace ShortUrlService.API.Controllers.MVC
{
    public class AboutController : Controller
    {
        private readonly IAboutService _aboutService;
        public AboutController(IAboutService aboutService)
        {
            _aboutService = aboutService;
        }
        [Route("about/{token?}")]
        [HttpGet]
        public async Task<IActionResult> About()
        {
            About model = new About()
            {
                Text = await _aboutService.GetAboutText(),
            };
            return View(model);
        }
        [Route("about/{token?}")]
        [HttpPost]
        public async Task<IActionResult> SetAbout(string text)
        {
            await _aboutService.SetAboutText(text);
            About model = new About()
            {
                Text = await _aboutService.GetAboutText(),
                Message = "About text updated successfully."
            };
            return View("About", model);
        }
    }
}
