using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

public class JwtMiddleware
{
    private readonly RequestDelegate _next;
    public JwtMiddleware(RequestDelegate next)
    {
        _next = next;
    }
    public async Task Invoke(HttpContext context)
    {
        var path = context.Request.Path.Value;

        if (context.Request.Query.ContainsKey("token"))
        {
            string token = context.Request.Query["token"];
            List<string> roles = GetUserRoles(token);
            var identity = new ClaimsIdentity(roles.Select(role => new Claim(ClaimTypes.Role, role)), "Bearer");
            context.User = new ClaimsPrincipal(identity);
        }
        await _next(context);
    }
    private List<string> GetUserRoles(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var jwtToken = tokenHandler.ReadJwtToken(token);
        return jwtToken.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
    }
}