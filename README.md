## [Lajma]("https://lajma.vercel.app/") OpenAI Chatbot Web Application

## About Project

ChatGPT inspired user chatbot web application. Users can send queries or prompts and get a response(s) from the chatbot. The chatbot utilizes OpenAI's API and GPT-3.5 Turbo Model.
[explore application]("https://lajma.vercel.app/")

## Prerequisites

The client runs using npm and the API uses Nuget packages. Api packages are already present in the
repository therefore no installation is required. However, some packages might be out-of-date and will need some update

To run the project follow the instructions below

## Install Node packages

You need NodeJS to run the command below. [Download NodeJS](https://nodejs.org/en/)

```bash
npm install 
```

## Run Client project

```bash
npm run dev
```

## Run Server [API]

1. Open Visual Studio
2. Open The Package Manager console
3. Change the connection string to your localhost server
4. Apply migrations to your database using the command below.

```bash
update-database 
```

This will create all necessary database tables using the initial migrations in the project.

5. Now build and run the solution. Your server should be up and running
            
## Technologies utilized

<div id="badges">
  <img src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" width="50px" height="50px"/>
  <img src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" width="50px" height="50px"/>
  <img src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" width="50px" height="50px"/>
  <img src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" width="50px" height="50px"/>
  <img src="https://user-images.githubusercontent.com/25181517/189716855-2c69ca7a-5149-4647-936d-780610911353.png" width="50px" height="50px"/>
  <img src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" width="50px" height="50px"/>
  <img src="https://www.dropbox.com/s/i83q23mj6li239j/download%20%281%29.png?raw=1" width="50px" height="50px"/>
  <img src="https://www.dropbox.com/s/wo7otvjrdobsqp6/download.png?raw=1" width="50px" height="50px"/>
  <img src="https://www.dropbox.com/s/zghpe3q6cvdswy7/microsoft-sql-server-logo-svgrepo-com.png?raw=1" width="50px" height="50px"/>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7gmv65nxUV9rPmaJRuu4GL77Czoqvh9Qv0g&usqp=CAU" width="50px" height="50px"/>
  <img src="https://user-images.githubusercontent.com/25181517/192107858-fe19f043-c502-4009-8c47-476fc89718ad.png" width="50px" height="50px"/>
  <img src="https://user-images.githubusercontent.com/25181517/192108372-f71d70ac-7ae6-4c0d-8395-51d8870c2ef0.png" width="50px" height="50px"/>
  <img src="https://user-images.githubusercontent.com/25181517/192108374-8da61ba1-99ec-41d7-80b8-fb2f7c0a4948.png" width="50px" height="50px"/>
  <img src="https://user-images.githubusercontent.com/25181517/186711335-a3729606-5a78-4496-9a36-06efcc74f800.png" width="50px" height="50px"/>
  <img src="https://user-images.githubusercontent.com/25181517/121405384-444d7300-c95d-11eb-959f-913020d3bf90.png" width="50px" height="50px"/>
  <img src="https://user-images.githubusercontent.com/25181517/121405754-b4f48f80-c95d-11eb-8893-fc325bde617f.png" width="50px" height="50px"/>
  <img src="https://skillicons.dev/icons?i=vercel" />
</div>

## User Interface

### UI

![Screenshot](screenshots/auth.png)

![Screenshot](screenshots/register.png)

![Screenshot](screenshots/main.png)

![Screenshot](screenshots/chat.png)

![Screenshot](screenshots/window.png)

![Screenshot](screenshots/voice.png)

![Screenshot](screenshots/account.png)

## License 

This project is licensed under [`MIT`](LICENSE)

## Version 
1.0.0
