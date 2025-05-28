using Microsoft.AspNetCore.Mvc;
using ShortUrlService.API.Models.MVC;
using ShortUrlService.Application.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace ShortUrlService.API.Controllers.MVC
{
    public class AboutController : Controller
    {
        private readonly IAboutService _aboutService;
        private List<string> _userRoles;
        public AboutController(IAboutService aboutService)
        {
            _aboutService = aboutService;
        }
        [Route("about")]
        [HttpGet]
        public async Task<IActionResult> About(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(token);
            _userRoles = jwtToken.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            About model = new About()
            {
                Text = await _aboutService.GetAboutText(),
                UserRoles = _userRoles
            };
            return View(model);
        }
        [Route("setAbout")]
        [HttpPost]
        public async Task<IActionResult> SetAbout(string text)
        {
            if (_userRoles.Contains("Admin"))
            {
                await _aboutService.SetAboutText(text);
                ViewData["Message"] = "New text saved!";
                return View("About");
            }
            return Forbid("You do not have permission to perform this action.");
        }
    }
}
