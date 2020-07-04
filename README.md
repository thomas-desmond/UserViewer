# User Viewer

 - The .NET project is built on top of **.NET Core 3.1** using a WebAPI project, **Entity Framework ORM** is utilized for managing the local database context. All .NET code built using Visual Studio 2019
 - Web Frontend is built using the **Angular Framework** & Typescript. Angular is updated to the latest version (Angular 10). All front-end work was completed using Visual Studio Code. 




## Steps To Build Projects (after cloning project)
**.NET Backend** (do this one first)

 1. Open UserDatabase.sln file inside of UserDatabase folder with Visual Studio 2019. (Set the default startup project to UserDatabase project if it is not already set)
 2. Build the project with Ctrl+Shift+B or going to the Build menu bar item and selecting Build
 3. Once the build completes successfully, open up the 'Package Manager Console'. Use the Search bar in Visual Studio 2019 to easily find the Package Manager Console
 4. Within Package Manager Console run the 'Update-Database' command. This will create a blank in-memory database for you. (Don't worry a few seed data items will be added in automatically in the next steps)
 5. Press F5 or Run project, if all goes well a chrome browser should open up at (https://localhost:44308/api/users) with some JSON data. (Note: Closing the browser window will end the WebApi running instance, so please leave this running)
 6. The .NET backend is now running!

**Angular Frontend**

1. Open up an instance of Powershell and navigate to the UserFrontend cloned directory.
2. Run an "npm i" command to bring in all the packages/dependencies required. (This can take a little bit of time)
3. Once the previous command completes, run "ng s -o" to serve up the application. The -o option will cause your browser window to open up at the correct http://localhost:4200/ url for the frontend.
4. Your frontend is now ready to play around in!

**Features**

 - Search through all users and return a subset where either the first name or last name contains the search terms (Case insensitive)
 - The 'Clear' button removes the current search criteria and brings back the entire user list
 - The 'Add New User' button will take you to a new page where you can insert new users into the database
 - The 'Remove' button will remove a specific user from the database

## How to Run Unit Tests

**.NET**

 1. Ensure the project has been built or ran at least once so Visual Studio can find the associated tests
 2. All tests should now be visible from the "Test Explorer" window
 3. Right-click and run all the test

**Angular**
1. Navigate to the UserFrontend folder within a Powershell instance. 
2. From the UserFrontend folder ensure a "npm i" command has already been completed to install all dependencies.
3. Run the "npm t" command to run all Jasmine tests using the Karma test runner, a new browser will pop up showing the results of the latest test run. (Results may also be viewed in the console)
