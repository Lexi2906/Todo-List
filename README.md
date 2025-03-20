# ✅ To-Do List App


The **To-Do List** application is designed as a challenge from **Angular Mentor** to help with daily tasks and responsibilities.

With this app, users can easily **add, organize, and track their tasks** , ensuring nothing gets forgotten.

Tasks can be checked off when completed and rearranged in order of priority using the **drag & drop** feature.

This project was created as part of the **Dare IT mentoring program**, where I had the opportunity to develop my skills under the guidance of a mentor.

The challenge was based on a pixel-perfect design from Figma and implemented using Angular.


🔗 **Figma Design**: [To-Do App Design](https://www.figma.com/design/ncQUbikfwUbF7ImtzEj9vj/todo-app?node-id=0-335)

---

## 🚀 Project Setup

To run the application locally, follow these steps:

### 1️⃣ Install dependencies
Run the following command in the terminal:

```sh
npm install
```

### 2️⃣ Start the application

```
npm start
```
This command will start both the Angular application and the JSON Server on port 3000.

## ⚙️ Technologies Used
The application is built with Angular 19 and includes the following library versions:

- Angular: ^19.0.0
- Angular CLI: ^19.0.2
- Angular Material: ^19.0.5
- RxJS: ~7.8.0

## 🌟 Features
✅ Add new tasks

✅ Mark tasks as completed

✅ Filter tasks 

✅ Delete individual tasks or all completed tasks

✅ Reorder tasks using Drag & Dropnpm install -g angular-cli-ghpages

✅ Toggle between light and dark mode

✅ Responsive design 

## 🎨 Styling
The application uses SCSS and CSS variables to support both Dark Mode and Light Mode.
It implements mixins for different screen resolutions and a custom checkbox.

## 🔗 Backend
The application uses JSON Server as a local database (db.json).

API available at: http://localhost:3000/todos
CRUD operations are handled by TodoApiService
