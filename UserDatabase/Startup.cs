using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using UserDatabase.Data;
using UserDatabase.Models;

namespace UserDatabase
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("OpenCorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });
            services.AddControllers();

            services.AddDbContext<UserDatabaseContext>(options =>
                    options.UseSqlServer(Configuration.GetConnectionString("UserDatabaseContext")));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors("OpenCorsPolicy");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            AddTestData(app);
        }

        private async void AddTestData(IApplicationBuilder app)
        {


            using (var scope = app.ApplicationServices.CreateScope())
            {
                var context = scope.ServiceProvider.GetService<UserDatabaseContext>();
                if (context.User.Count() > 0)
                {
                    return;
                }

                var user1 = new User
                {
                    FirstName = "Thomas",
                    LastName = "Smith",
                    Address = "123 Main Street",
                    Age = 32,
                    Interests = "All the fun things",
                    Picture = "https://user-images-temp.s3.amazonaws.com/face3.jpg"
                };
                var user2 = new User
                {
                    FirstName = "Thomas",
                    LastName = "Desmond",
                    Address = "458 Arrow",
                    Age = 39,
                    Interests = "Motorcycles, Hiking, Programming, Geocaching",
                    Picture = "https://user-images-temp.s3.amazonaws.com/face2.jpg"
                }; 
                var user3 = new User
                {
                    FirstName = "Annie",
                    LastName = "Elliott",
                    Address = "1212 Jefferson",
                    Age = 25,
                    Interests = "Sewing, Hiking, Television",
                    Picture = "https://user-images-temp.s3.amazonaws.com/face1.jpg"
                };
                context.User.Add(user1);
                context.User.Add(user2);
                context.User.Add(user3);

                await context.SaveChangesAsync();
            }
        }
    }
}
