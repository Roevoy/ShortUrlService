using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using ShortUrlService.API.Controllers;
using ShortUrlService.Application.Interfaces;
using ShortUrlService.Core.Models;
using System.Security.Claims;

public class ShortUrlsControllerTests
{
    private readonly Mock<IShortUrlService> _serviceMock = new();
    private readonly ShortUrlsController _controller;

    public ShortUrlsControllerTests()
    {
        _controller = new ShortUrlsController(_serviceMock.Object);
    }

    private void SetupUser(Guid userId, bool isAdmin = false)
    {
        var claims = new List<Claim> { new Claim(ClaimTypes.NameIdentifier, userId.ToString()) };
        if (isAdmin) claims.Add(new Claim(ClaimTypes.Role, "Admin"));

        var identity = new ClaimsIdentity(claims, "TestAuth");
        var user = new ClaimsPrincipal(identity);
        _controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = user }
        };
    }
    [Fact]
    public async Task GetByCode_ReturnsOkWithUrl()
    {
        var code = "abc123";
        var url = new ShortUrl { ShortCode = code, OriginalUrl = "http://test" };
        _serviceMock.Setup(s => s.GetByCodeAsync(code)).ReturnsAsync(url);

        var result = await _controller.GetByCode(code);

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(url, okResult.Value);
    }

    [Fact]
    public async Task RedirectToOriginal_ReturnsRedirect()
    {
        var code = "abc123";
        var url = new ShortUrl { ShortCode = code, OriginalUrl = "http://test" };
        _serviceMock.Setup(s => s.GetByCodeAsync(code)).ReturnsAsync(url);

        var result = await _controller.RedirectToOriginal(code);

        var redirectResult = Assert.IsType<RedirectResult>(result);
        Assert.Equal(url.OriginalUrl, redirectResult.Url);
    }

    [Fact]
    public async Task Create_ReturnsCreatedAtAction()
    {
        var userId = Guid.NewGuid();
        SetupUser(userId);

        var shortUrl = new ShortUrl { Id = Guid.NewGuid(), ShortCode = "abc123", OriginalUrl = "http://test", CreatedBy = userId };
        _serviceMock.Setup(s => s.CreateShortUrlAsync(It.IsAny<string>(), userId)).ReturnsAsync(shortUrl);

        var result = await _controller.Create("http://test");

        var createdResult = Assert.IsType<CreatedAtActionResult>(result);
        Assert.Equal(nameof(ShortUrlsController.GetByCode), createdResult.ActionName);
        Assert.Equal(shortUrl, createdResult.Value);
    }

    [Fact]
    public async Task Delete_WhenUserIsCreator_DeletesAndReturnsNoContent()
    {
        var userId = Guid.NewGuid();
        SetupUser(userId);

        var urlId = Guid.NewGuid();
        var url = new ShortUrl { Id = urlId, CreatedBy = userId };
        _serviceMock.Setup(s => s.GetByIdAsync(urlId)).ReturnsAsync(url);

        var result = await _controller.Delete(urlId);

        _serviceMock.Verify(s => s.DeleteAsync(urlId), Times.Once);
        Assert.IsType<NoContentResult>(result);
    }

    [Fact]
    public async Task Delete_WhenUserIsNotCreatorOrAdmin_ReturnsForbid()
    {
        var userId = Guid.NewGuid();
        SetupUser(userId);

        var urlId = Guid.NewGuid();
        var url = new ShortUrl { Id = urlId, CreatedBy = Guid.NewGuid() };
        _serviceMock.Setup(s => s.GetByIdAsync(urlId)).ReturnsAsync(url);

        var result = await _controller.Delete(urlId);

        _serviceMock.Verify(s => s.DeleteAsync(It.IsAny<Guid>()), Times.Never);
        Assert.IsType<ForbidResult>(result);
    }

    [Fact]
    public async Task Delete_WhenUserIsAdmin_DeletesAndReturnsNoContent()
    {
        var userId = Guid.NewGuid();
        SetupUser(userId, isAdmin: true);

        var urlId = Guid.NewGuid();
        var url = new ShortUrl { Id = urlId, CreatedBy = Guid.NewGuid() };
        _serviceMock.Setup(s => s.GetByIdAsync(urlId)).ReturnsAsync(url);

        var result = await _controller.Delete(urlId);

        _serviceMock.Verify(s => s.DeleteAsync(urlId), Times.Once);
        Assert.IsType<NoContentResult>(result);
    }
}
