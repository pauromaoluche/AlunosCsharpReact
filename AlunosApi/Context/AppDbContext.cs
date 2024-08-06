using AlunosApi.Models;
using Microsoft.EntityFrameworkCore;

namespace AlunosApi.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Aluno> Alunos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Aluno>().HasData(
                new Aluno
                {
                    Id = 1,
                    Nome = "User 1",
                    Email = "user1@hotmail.com",
                    Idade = 23
                },
                    new Aluno
                    {
                        Id = 2,
                        Nome = "User 2",
                        Email = "user2@hotmail.com",
                        Idade = 23
                    }
            );
        }
    }
}
