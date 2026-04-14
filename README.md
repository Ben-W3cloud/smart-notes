# 🧠 Smart Notes App (AI-Powered)

A full-stack notes application that allows users to create, read, update, and delete notes, with an integrated AI feature that generates clear explanations and summaries of note content.

---

## 🚀 Features

### ✍️ Notes Management (CRUD)

* Create new notes
* View all notes
* Update existing notes
* Delete notes

### 🤖 AI-Powered Explanation

* Generate a simplified explanation of any note
* Summarize long notes into concise insights
* Store generated explanations for reuse

---

## 🏗️ Tech Stack

### Backend

* FastAPI
* SQLAlchemy
* MySQL
* OpenAI API

### Frontend

* React
* Axios

---

## 📁 Project Structure

```
smart-notes-app/
├── backend/
|   |──app/
│       ├── main.py
│       ├── database.py
│       ├── models.py
│       ├── schemas.py
│       │
│       ├── routes/
│       │   └── notes.py
│       │
│       ├── services/
│       │   └── ai.py
│       │
│       ├── config/
│       │   └── settings.py
│       │
│       ├── utils/
│       │   └── helpers.py
│       └──
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NoteCard.jsx
│   │   │   ├── NoteForm.jsx
│   │   │   └── ExplainModal.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   │
│   │   ├── api/
│   │   │   └── notes.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Backend Setup

### 1. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file in `/backend`:

```
OPENAI_API_KEY=your_api_key_here
DATABASE_URL=mysql+mysqlconnector://user:password@localhost/db_name
```

---

### 4. Run Server

```bash
uvicorn main:app --reload
```

---

## 🤖 AI Integration (OpenAI)

### Example Service

```python
from openai import OpenAI

client = OpenAI()

def explain_note(content: str):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Explain this note in simple terms."},
            {"role": "user", "content": content}
        ]
    )
    return response.choices[0].message.content
```

---

## 🌐 Frontend Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

---

## 🔌 API Endpoints

### Notes

* `GET /notes` → Fetch all notes
* `POST /notes` → Create a new note
* `PUT /notes/{id}` → Update note
* `DELETE /notes/{id}` → Delete note

### AI Feature

* `POST /notes/{id}/explain` → Generate explanation

---

## 🎯 Future Improvements

* User authentication (JWT)
* Note tagging and categorization
* Search functionality
* Real-time collaboration
* AI-powered suggestions
* Dark mode UI

---

## 💡 Use Cases

* Study notes with quick explanations
* Developer knowledge base
* Personal idea storage with AI insights

---

## 🧑‍💻 Author

Built as a full-stack + AI integration project to demonstrate:

* Backend API design
* Frontend integration
* AI-powered features

---

## 📌 License

MIT License
