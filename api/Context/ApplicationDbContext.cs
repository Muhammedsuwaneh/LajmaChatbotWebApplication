using Lajma.Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Lajma.Backend.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() {}
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Chat>()
               .HasOne(c => c.ChatHistory)
               .WithMany(c => c.Chats)
               .HasForeignKey(c => c.CHatHistoryId)
               .OnDelete(DeleteBehavior.Cascade);
        }

        public virtual DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public virtual DbSet<Chat> Chats { get; set; }
        public virtual DbSet<ChatHistory> ChatHistories { get; set; }
    }
}
