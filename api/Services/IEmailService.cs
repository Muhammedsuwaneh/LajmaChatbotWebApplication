namespace Lajma.Backend.Services
{
    public interface IEmailService
    {
         void SendEmail(string toUserEmail, string toUsername);
    }
}
