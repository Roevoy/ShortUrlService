using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Moq;
using ShortUrlService.API.Controllers;
using ShortUrlService.DAL;

public class AuthControllerTests
{
    private readonly Mock<UserManager<AppUser>> _userManagerMock;
    private readonly Mock<IConfiguration> _configMock;
    private readonly AuthController _controller;

    public AuthControllerTests()
    {
        var store = new Mock<IUserStore<AppUser>>();
        _userManagerMock = new Mock<UserManager<AppUser>>(store.Object, null, null, null, null, null, null, null, null);
        _configMock = new Mock<IConfiguration>();
        _configMock.Setup(c => c["Jwt:Key"]).Returns("VerySecretKey1234567890");
        _configMock.Setup(c => c["Jwt:Issuer"]).Returns("TestIssuer");

        _controller = new AuthController(_userManagerMock.Object, _configMock.Object);
    }

    [Fact]
    public async Task Register_ReturnsOk_WhenUserCreated()
    {
        var model = new AuthController.RegisterModel { Email = "test@test.com", Password = "Password123!" };
        _userManagerMock.Setup(u => u.CreateAsync(It.IsAny<AppUser>(), model.Password))
            .ReturnsAsync(IdentityResult.Success);

        var result = await _controller.Register(model);

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal("User registered", okResult.Value);
    }

    [Fact]
    public async Task Register_ReturnsBadRequest_WhenCreationFails()
    {
        var model = new AuthController.RegisterModel { Email = "test@test.com", Password = "Password123!" };
        var errors = new List<IdentityError> { new IdentityError { Description = "Error" } };
        _userManagerMock.Setup(u => u.CreateAsync(It.IsAny<AppUser>(), model.Password))
            .ReturnsAsync(IdentityResult.Failed(errors.ToArray()));

        var result = await _controller.Register(model);

        var badRequest = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal(errors, badRequest.Value);
    }

    [Fact]
    public async Task Login_ReturnsUnauthorized_WhenUserNotFound()
    {
        var model = new AuthController.LoginModel { Email = "no@user.com", Password = "pass" };
        _userManagerMock.Setup(u => u.FindByEmailAsync(model.Email)).ReturnsAsync((AppUser)null);

        var result = await _controller.Login(model);

        var unauthorized = Assert.IsType<UnauthorizedObjectResult>(result);
        Assert.Equal("Invalid credentials", unauthorized.Value);
    }

    [Fact]
    public async Task Login_ReturnsUnauthorized_WhenPasswordIncorrect()
    {
        var user = new AppUser { UserName = "test" };
        var model = new AuthController.LoginModel { Email = "test@test.com", Password = "wrongpass" };

        _userManagerMock.Setup(u => u.FindByEmailAsync(model.Email)).ReturnsAsync(user);
        _userManagerMock.Setup(u => u.CheckPasswordAsync(user, model.Password)).ReturnsAsync(false);

        var result = await _controller.Login(model);

        var unauthorized = Assert.IsType<UnauthorizedObjectResult>(result);
        Assert.Equal("Invalid credentials", unauthorized.Value);
    }
}
