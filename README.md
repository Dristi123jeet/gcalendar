



# 🚀 Google Calendar MERN Clone

A high-fidelity, fully interactive clone of Google Calendar built using the MERN stack.  
Includes a modern UI, event creation, editing, deletion, cloud database, and full deployment.

---

## 🌐 Live Demo


🔹 **Frontend (Vercel):** https://gcalendar-ten.vercel.app/
🔹 **Backend (Render):** https://gcal-backend.onrender.com  

---

## 📸 Screenshots

### 🗓️ Month View  
![Month View](https://dummyimage.com/1000x550/000/fff&text=Month+View)

### 📆 Week View  
![Week View](https://dummyimage.com/1000x550/000/fff&text=Week+View)

### 📝 Event Creation  
![Event Creation](https://dummyimage.com/1000x550/000/fff&text=Event+Creation)

---

## ✨ Features

### ✔ High-Fidelity Google Calendar UI
- Month, Week, Day, and List views  
- Sidebar mini calendar  
- Right-side vertical toolbar  
- Google-like top navigation bar  
- Smooth transitions & animations  
- Responsive layout  

### ✔ Event Management
- Create, edit & delete events  
- All-day events  
- Event colors  
- Drag/resize ready  
- Event popover + drawer  
- FullCalendar-based layout  



## 🏗 Tech Stack

### Frontend
- React  
- Vite  
- TailwindCSS  
- FullCalendar  
- Axios  

### Backend
- Node.js  
- Express.js  
- MongoDB Atlas  
- Mongoose  

### Deployment
- Vercel (Frontend)  
- Render (Backend)  
- MongoDB Atlas  

---

## 📦 Project Structure

```
gcalendar-mern/
│
├── backend/
│   ├── server.js
│   ├── .env
│   └── src/
│       ├── models/Event.js
│       └── routes/events.js
│
├── frontend/
│   ├── index.html
│   └── src/
│       ├── api.js
│       ├── App.jsx
│       ├── components/CalendarView.jsx
│       ├── pages/CalendarPage.jsx
│       └── ui/
│           ├── EventPopover.jsx
│           ├── EventDetailsDrawer.jsx
│           ├── MiniCalendar.jsx
│           ├── Sidebar.jsx
│           └── RightVerticalBar.jsx
│
└── README.md
```

---

## 🔧 Setup & Run Instructions

### 1️⃣ Clone the repository  
```
git clone https://github.com/<username>/gcalendar-mern.git
cd gcalendar-mern
```

### 2️⃣ Backend Setup  
```
cd backend
npm install
```

Create `.env` file:
```
PORT=4000
MONGO_URI=your-mongo-atlas-uri
```

Start backend:
```
npm run dev
```

### 3️⃣ Frontend Setup  
```
cd ../frontend
npm install
npm run dev
```

Configure API in `api.js`:
```js
export const api = axios.create({
  baseURL: "https://gcal-backend.onrender.com/api",
});
```

---

## 🧠 Business Logic & Edge Cases

- Smart ISO date conversion  
- Prevents invalid datetime  
- Auto-adjust popover to stay on screen  
- All-day event handling  
- Overlapping events allowed  
- Backend schema validation  

---

## 🎬 Animations & Interactions

- Popover slide + fade (Framer Motion)  
- Drawer slide animation  
- Hover transitions  
- FullCalendar interactions for clicking dates/events  

---

## 🚀 Future Enhancements

 
- Google OAuth login  
- Notifications & reminders  
- Dark mode  

---







