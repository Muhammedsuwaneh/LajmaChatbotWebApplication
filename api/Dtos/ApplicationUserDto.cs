using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Lajma.Backend.Dtos
{
    public class ApplicationUserDto
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Avatar { get; set; }

        public string? DateJoined { get; set; }
    }
}
