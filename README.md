
# ![Logo](https://github.com/kovacs7/Hackathon-project-manager/assets/129580965/1a39d5f9-318a-4a95-8abc-179da586882a) Hackathon Project Manager

Welcome to the Hackathon Project Manager! Organize tasks, assign responsibilities, and track progress efficiently. Collaborate in real-time with group chat and a shared canvas. Visualize project milestones and deadlines with a clear timeline format.




## App Screenshots

| <img width="1439" alt="Screenshot 2024-07-02 at 1 47 52 PM-min" src="https://github.com/kovacs7/Hackathon-project-manager/assets/129580965/91901c12-1b2b-4211-8cd5-ffbdba07ed38">| <img width="1440" alt="Screenshot 2024-07-02 at 4 29 48 PM-min" src="https://github.com/kovacs7/Hackathon-project-manager/assets/129580965/0e369dba-de40-4cd2-9770-edf84098ba96">|
| ------ | ------ |
|<img width="1440" alt="Screenshot 2024-07-02 at 4 29 57 PM-min" src="https://github.com/kovacs7/Hackathon-project-manager/assets/129580965/95fa5e86-43ca-4db9-b2ea-a8f2fcdd2e1d">|<img width="1440" alt="Screenshot 2024-07-02 at 4 30 20 PM-min" src="https://github.com/kovacs7/Hackathon-project-manager/assets/129580965/0b8f35b2-891b-4837-99fa-bade66e24759">|

| <img width="1440" alt="Screenshot 2024-07-02 at 4 30 35 PM-min" src="https://github.com/kovacs7/Hackathon-project-manager/assets/129580965/4baf9159-52db-46bb-8d42-9b6b03b85d80">|
|------|
|  <img width="1440" alt="Screenshot 2024-07-02 at 4 31 15 PM-min" src="https://github.com/kovacs7/Hackathon-project-manager/assets/129580965/2154ece9-0f9c-4672-9657-2059a2ff1bf3">|
|  <img width="1440" alt="Screenshot 2024-07-02 at 4 32 03 PM-min" src="https://github.com/kovacs7/Hackathon-project-manager/assets/129580965/be7a092d-fe19-4817-9601-c522301c1cc6">|
|  <img width="1440" alt="Screenshot 2024-07-02 at 4 32 29 PM-min" src="https://github.com/kovacs7/Hackathon-project-manager/assets/129580965/fb175816-4ad8-45e2-b664-6cc271d1af85">|



## Technologies Used In This Project

| ![MongoDB](	https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)  | ![NODE.JS](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)  |
| ----- | --- |
| ![Socket.io](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white) | ![Tailwind_CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)   |
| ![REACT](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)   |
| ![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white) | ![axios](https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white)  |
| ![React](https://img.shields.io/badge/react%20zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) | <img height="40" width="40" src="https://user-images.githubusercontent.com/2182637/53611918-54c1ff80-3c24-11e9-9917-66ac3cef513d.png" /> |

## Link To The URL

Please use the URL provided below to preview the site. If the page does not load properly, please wait 30 seconds since the server instance may have spun down due to inactivity, causing queries to be delayed by 30 seconds or more. 

Link: https://hackathon-project-manager.onrender.com/

If the link still does not work, please follow the instructions for local setup below. 
## What issues does the Hackathon Project Manager address?


The Hackathon Project Manager is designed to address the challenges of virtual hackathons by providing a centralized platform for communication and collaboration. With real-time group chat and task management, teams can stay organized and on the same page despite being remote. The collaborative canvas allows for seamless brainstorming and design work, making it easy to share and develop ideas together. The timeline feature ensures that all team members are aware of key milestones and deadlines, promoting timely project completion. Overall, this app bridges the gap between remote team members, enhancing productivity and teamwork in virtual hackathons.
## Features

- Task Management : ➡️ Efficiently organize tasks, assign responsibilities, and track progress to ensure clarity and accountability throughout your project lifecycle.

- Group Chat: ➡️ Engage in real-time discussions with group chat for team collaboration, enhancing project communication and coordination.

- Real-Time Collaborative Canvas: ➡️ Collaborate seamlessly on a shared canvas in real-time, fostering creativity and enabling simultaneous brainstorming and design iterations.

- Timeline: ➡️ Visualize project milestones and deadlines in a clear timeline format, helping teams stay on track and meet objectives with structured project planning.

## Upcoming Features
- Personal DMs : ➡️  Directly message team members for private communications, enhancing one-on-one interactions and discussions.

- Call Room : ➡️  Set up voice calls with team members to facilitate more dynamic and immediate communication.

- Video Calling Room : ➡️ Host video calls with your team for face-to-face meetings, improving collaboration and connection.
## Local Setup

Clone the github repository on your machine.

```bash
  git clone https://github.com/kovacs7/Hackathon-project-manager.git
```
Now, use your code editor to open the above destination folder. Let us begin by launching our frontend.
```bash
  cd Frontend
```
Install all the dependencies.
```bash
  npm i axios immer js-cookie lucide-react react react-beautiful-dnd react-dom react-hot-toast react-router-dom socket.io-client zustand
```
Now lets start our server for Frontend.
```bash
  npm run dev
```
Let's launch our backend now.
```bash
  cd ../
  cd backend
  npm i bcrypt cookie-parser cors dotenv express jsonwebtoken mongoose socket.io nodemon
```

To run this project, you will need to add the following environment variables to your ```.env``` file in Backend.

`PORT`
`MONGO_URL`
`JWT_SECRET`

Once you are done with the above task, run the following command in your CLI.
```bash
  npm run dev
```
Now open the Frontend in your browser. BOOM! its runnung...

## Folder Structure.

```
.
├── Backend
│   ├── controllers
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   ├── taskController.js
│   │   └── timelineController.js
│   ├── handlers
│   │   └── taskHandler.js
│   ├── helper
│   │   └── auth.js
│   ├── index.js
│   ├── models
│   │   ├── canvas.js
│   │   ├── chat.js
│   │   ├── models.js
│   │   ├── project.js
│   │   ├── task.js
│   │   ├── timeline.js
│   │   └── user.js
│   ├── package-lock.json
│   ├── package.json
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── taskRoutes.js
│   │   └── timelineRoutes.js
│   └── socket.js
└── Frontend
    ├── README.md
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── public
    ├── src
    │   ├── App.jsx
    │   ├── assets
    │   │   ├── HOME.webp
    │   │   ├── LOGIN.webp
    │   │   ├── Logo.svg
    │   │   ├── Logo2.svg
    │   │   └── SIGNUP.webp
    │   ├── components
    │   │   ├── App
    │   │   │   ├── AppMenu.jsx
    │   │   │   ├── Tasks
    │   │   │   │   ├── KanbanBoard.jsx
    │   │   │   │   ├── Task.jsx
    │   │   │   │   └── TaskBadge.jsx
    │   │   │   ├── canvas
    │   │   │   │   └── Canvas.jsx
    │   │   │   ├── chat
    │   │   │   │   ├── Chat.jsx
    │   │   │   │   └── ChatRoom.jsx
    │   │   │   └── timeline
    │   │   │       ├── EditOnly.jsx
    │   │   │       ├── ReadOnly.jsx
    │   │   │       └── Timeline.jsx
    │   │   ├── Dashboard
    │   │   │   ├── Article.jsx
    │   │   │   ├── Badges.jsx
    │   │   │   ├── FormModal.jsx
    │   │   │   ├── Menu.jsx
    │   │   │   ├── Project.jsx
    │   │   │   └── Tags.jsx
    │   │   ├── Home
    │   │   │   ├── Faqs.jsx
    │   │   │   ├── Features.jsx
    │   │   │   ├── Footer.jsx
    │   │   │   └── Hero.jsx
    │   │   ├── Layouts
    │   │   │   ├── AppDashboard.jsx
    │   │   │   └── AuthLayout.jsx
    │   │   ├── NavBar
    │   │   │   ├── HamburgerModal.jsx
    │   │   │   └── NavBar.jsx
    │   │   └── index.js
    │   ├── index.css
    │   ├── main.jsx
    │   ├── pages
    │   │   ├── Auth
    │   │   │   ├── Login.jsx
    │   │   │   └── SignUp.jsx
    │   │   ├── Home.jsx
    │   │   └── index.js
    │   └── store
    │       └── authStore.js
    ├── tailwind.config.js
    └── vite.config.js

24 directories, 66 files


```


## Contact Me

Contact me on kovacs.undercover@gmail.com
