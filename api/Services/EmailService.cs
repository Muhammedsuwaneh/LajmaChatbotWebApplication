using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;

namespace Lajma.Backend.Services
{
    public class EmailService : IEmailService
    {
       public void SendEmail(string toUserEmail, string toUsername, string body, string subject)
       {

            try
            {

                DotNetEnv.Env.Load();
                var sender = Environment.GetEnvironmentVariable("SENDER");
                var senderAuth = Environment.GetEnvironmentVariable("AUTH");

                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse(sender));
                email.To.Add(MailboxAddress.Parse(toUserEmail));
                email.Subject = subject;
                email.Body = new TextPart(TextFormat.Html) { Text = body };

                using var smtp = new SmtpClient();
                smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                smtp.Authenticate(sender, senderAuth);
                smtp.Send(email);
                smtp.Disconnect(true);
            }
            catch (Exception ex)
            {
               // log error
            }
       }   
    }
}
