using Lajma.Backend.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Lajma.Backend.Dtos
{
    public class ChatHistoryDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public int UserId { get; set; }
        public string? HistoryDate { get; set; }
        public List<ChatDto> Chats { get; set; }
    }
}
