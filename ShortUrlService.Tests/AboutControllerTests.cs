using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using ShortUrlService.API.Controllers;
using ShortUrlService.Application.Interfaces;
using System.Security.Claims;

public class AboutControllerTests
{
    private readonly Mock<IAboutService> _aboutServiceMock;
    private readonly AboutController _controller;

    public AboutControllerTests()
    {
        _aboutServiceMock = new Mock<IAboutService>();
        _controller = new AboutController(_aboutServiceMock.Object);
    }

    private void SetUserRole(string role)
    {
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.Role, role)
        }, "mock"));

        _controller.ControllerContext = new ControllerContext()
        {
            HttpContext = new DefaultHttpContext() { User = user }
        };
    }

    [Fact]
    public async Task GetAboutText_ReturnsPlainTextContent()
    {
        var expectedText = "About text";
        _aboutServiceMock.Setup(s => s.GetAboutText()).ReturnsAsync(expectedText);

        var result = await _controller.GetAboutText();

        var contentResult = Assert.IsType<ContentResult>(result);
        Assert.Equal("text/plain", contentResult.ContentType);
        Assert.Equal(expectedText, contentResult.Content);
    }

    [Fact]
    public async Task UpdateAbout_UserWithoutAdminRole_ReturnsForbid()
    {
        SetUserRole("User");
        var newText = "New about text";

        var result = await _controller.UpdateAbout(newText);

        Assert.IsType<ForbidResult>(result);
        _aboutServiceMock.Verify(s => s.SetAboutText(It.IsAny<string>()), Times.Never);
    }

    [Fact]
    public async Task UpdateAbout_UserWithAdminRole_UpdatesAndReturnsOk()
    {
        SetUserRole("Admin");
        var newText = "New about text";

        _aboutServiceMock.Setup(s => s.SetAboutText(newText)).Returns(Task.CompletedTask);

        var result = await _controller.UpdateAbout(newText);

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal("Updated", okResult.Value);
        _aboutServiceMock.Verify(s => s.SetAboutText(newText), Times.Once);
    }
}
