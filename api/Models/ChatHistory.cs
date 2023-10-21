using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Lajma.Backend.Models
{
    public class ChatHistory
    {
        [Key]
        public string Id { get; set; }
        public string Title { get; set; }
        public int UserId { get; set; }
        public string? HistoryDate { get; set; }
        public List<Chat> Chats { get; set; }
    }
}
