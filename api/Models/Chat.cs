using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Lajma.Backend.Models
{
    public class Chat
    {
        [Key]
        public string Id { get; set; }
        public string Query { get; set; }
        public string Response { get; set; }
        public string CHatHistoryId { get; set; }
        public string? QueryDate { get; set; }

        [ForeignKey("CHatHistoryId")]
        public ChatHistory ChatHistory { get; set; }
    }
}
