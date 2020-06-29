using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UserDatabase.Models;

namespace UserDatabase.Data
{
    public class UserDatabaseContext : DbContext
    {
        public UserDatabaseContext (DbContextOptions<UserDatabaseContext> options)
            : base(options)
        {
        }

        public DbSet<UserDatabase.Models.User> User { get; set; }
    }
}
