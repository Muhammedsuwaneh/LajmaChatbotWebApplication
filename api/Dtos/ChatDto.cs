using Lajma.Backend.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lajma.Backend.Dtos
{
    public class ChatDto
    {
        public string Id { get; set; }
        public string Query { get; set; }
        public string Response { get; set; }

        public string? QueryDate { get; set; }
    }
}
