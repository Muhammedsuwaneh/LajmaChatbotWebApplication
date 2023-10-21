using Lajma.Backend.Dtos;
using Lajma.Backend.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
namespace Lajma.Backend.Encryption
{
    public static class Encrypt
    {
        private static string hash { get; set; }

        private static void LoadEnvironmentVariables()
        {
            DotNetEnv.Env.Load();
            hash = Environment.GetEnvironmentVariable("ENCRYPTION_KEY");
        }
        public static string GenerateMD5HashedPassword(string password)
        {
            byte[] data = UTF8Encoding.UTF8.GetBytes(password);
            string encryptedPassword = "";
            LoadEnvironmentVariables();

            using (var md5 = new MD5CryptoServiceProvider())
            {
                byte[] keys = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(hash));
                using (var tripDes = new TripleDESCryptoServiceProvider() { Key = keys, Mode = CipherMode.ECB, Padding = PaddingMode.PKCS7 })
                {
                    ICryptoTransform transform = tripDes.CreateEncryptor();
                    byte[] results = transform.TransformFinalBlock(data, 0, data.Length);
                    encryptedPassword = Convert.ToBase64String(results, 0, results.Length);
                }
            }

            return encryptedPassword;
        }

        public static string DecryptPassword(string EncryptedPassword)
        {
            byte[] data = Convert.FromBase64String(EncryptedPassword); // decrypt the incrypted text
            string decryptedPassword = "";
            LoadEnvironmentVariables();

            using (var md5 = new MD5CryptoServiceProvider())
            {
                byte[] keys = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(hash));
                using (var tripDes = new TripleDESCryptoServiceProvider() { Key = keys, Mode = CipherMode.ECB, Padding = PaddingMode.PKCS7 })
                {
                    System.Security.Cryptography.ICryptoTransform transform = tripDes.CreateDecryptor();
                    byte[] results = transform.TransformFinalBlock(data, 0, data.Length);
                    decryptedPassword = UTF8Encoding.UTF8.GetString(results);
                }

                return decryptedPassword;
            }
        }

        public static string GenerateSessionToken(ApplicationUser user, IConfiguration _config)
        {
            // get security key from config
            var securityKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"]));

            // generate a credential based on security key using the HmacSha256 algorithm
            var credentials = new SigningCredentials
                (securityKey, SecurityAlgorithms.HmacSha256);

            // define claims
            var claims = new[]
            {
                new Claim(ClaimTypes.PrimarySid, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
            };

            // generate token
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"], claims, expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
