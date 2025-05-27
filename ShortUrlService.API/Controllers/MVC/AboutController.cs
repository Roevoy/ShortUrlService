using Microsoft.AspNetCore.Mvc;

namespace ShortUrlService.API.Controllers.MVC
{
    public class AboutController : Controller
    {
        public IActionResult About()
        {
            return View();
        }
    }
}
