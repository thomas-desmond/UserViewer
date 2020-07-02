using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Linq;
using System.Threading.Tasks;
using UserDatabase.Controllers;
using UserDatabase.Data;
using UserDatabase.Models;

namespace UserDatabase.Tests
{
    [TestClass]
    public class UsersControllerTests
    {
        [TestMethod]
        public async Task GetUsersReturnsAllUsersInDatabase()
        {
            using (var context = TestHelpers.GetContextWithData())
            using (var controller = new UsersController(context))
            {
                var result = await controller.GetUsers();
                Assert.AreEqual(result.Value.Count(), 3);
            }
        }

        [TestMethod]
        public async Task GetUserReturnsSingleUserWithMatchingId()
        {
            using (var context = TestHelpers.GetContextWithData())
            using (var controller = new UsersController(context))
            {
                var result = await controller.GetUser(2);
                Assert.AreEqual(result.Value.Id, 2);
            }
        }

        [DataTestMethod]
        [DataRow("Des", 1)]
        [DataRow("THoMaS", 2)]
        [DataRow("NoMatching", 0)]
        public async Task GetUserBySearchTermReturnsUsersWhereFirstOrLastNameContainSearchTerm(string searchTerm, int expectedNumberOfResults)
        {
            using (var context = TestHelpers.GetContextWithData())
            using (var controller = new UsersController(context))
            {
                var result = await controller.GetUserBySearchTerm(searchTerm);
                Assert.AreEqual(result.Value.Count(), expectedNumberOfResults);
            }
        }

        [TestMethod]
        public async Task DeleteUserRemovesUserwithGivenIdFromDatabase()
        {
            using (var context = TestHelpers.GetContextWithData())
            using (var controller = new UsersController(context))
            {
                var idOfEntryToDelete = 2;
                Assert.AreEqual(context.User.Count(), 3);
                var result = await controller.DeleteUser(idOfEntryToDelete);
                Assert.AreEqual(context.User.Count(), 2);
                Assert.IsFalse(context.User.Any(u => u.Id == idOfEntryToDelete), $"User with ID ${idOfEntryToDelete} should have been deleted");
            }
        }

        [TestMethod]
        public async Task PostUserAddsNewUserToTheDatabase()
        {
            using (var context = TestHelpers.GetContextWithData())
            using (var controller = new UsersController(context))
            {
                var userToAdd = new User { FirstName = "Chad", LastName = "Chaderson", Age = 55, Address = "5 5th Street", Interests = "Most things", Picture = "fake.jpg" };
                Assert.AreEqual(context.User.Count(), 3);
                var result = await controller.PostUser(userToAdd);
                Assert.AreEqual(context.User.Count(), 4);
                Assert.IsTrue(context.User.Any(u => u.LastName == userToAdd.LastName), $"User with last name ${userToAdd.LastName} should have been added");
            }
        }
    }
}
