using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using UserDatabase.Data;
using UserDatabase.Models;

namespace UserDatabase.Tests
{
    public static class TestHelpers
    {
        public static UserDatabaseContext GetContextWithData()
        {
            var options = new DbContextOptionsBuilder<UserDatabaseContext>()
                              .UseInMemoryDatabase(Guid.NewGuid().ToString())
                              .Options;
            var context = new UserDatabaseContext(options);

            var user1 = new User
            {
                Id = 1,
                FirstName = "Thomas",
                LastName = "Desmond",
                Address = "123 Main Street",
                Age = 0,
                Interests = "Biking, Hiking, Camping, Motorcycles",
                Picture = "fakePath/image1.png"
            };

            var user2 = new User
            {
                Id = 2,
                FirstName = "Thomas",
                LastName = "Smith",
                Address = "851 Jefferson",
                Age = 70,
                Interests = "All the fun things",
                Picture = "fakePath/image2.png"
            };

            var user3 = new User
            {
                Id = 3,
                FirstName = "Dustin",
                LastName = "Franks",
                Address = "770 Arrow Street",
                Age = 30,
                Interests = "Video Games",
                Picture = "fakePath/image3.png"
            };

            context.User.Add(user1);
            context.User.Add(user2);
            context.User.Add(user3);

            context.SaveChanges();

            return context;
        }
    }
}
