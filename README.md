# Virtual Assistant

A full-stack AI-powered virtual assistant built with the MERN stack (MongoDB, Express, React, Node.js) and Gemini AI integration. This project features real-time voice recognition, smart AI responses, and a beautiful animated UI. Speak to your assistant, get instant answers, and control web actions—all in your browser!

---

## ✨ Features

- **Voice Recognition:** Talk to your assistant using your microphone (Chrome/Edge supported).
- **Gemini AI Integration:** Get smart, context-aware responses powered by Gemini.
- **Web Actions:** Open Google, YouTube, Instagram, Facebook, weather, and more with voice commands.
- **Customizable Assistant:** Personalize your assistant's name and avatar.
- **Animated UI:** Modern, responsive, and visually engaging interface with animated backgrounds.
- **Authentication:** Secure sign up, sign in, and session management.
- **MongoDB Storage:** User data and assistant settings are stored securely.

---

## 🚀 Demo

> [Click here to view the deployed app](https://virtual-assistant-1-x743.onrender.com)

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **AI:** Gemini API
- **Voice:** Web Speech API (SpeechRecognition, SpeechSynthesis)

---

## 📦 Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/m-njot-singh/Virtual-Assistant.git
   cd Virtual-Assistant
   ```

2. **Install dependencies:**
   - Backend:
     ```sh
     cd Backend
     npm install
     ```
   - Frontend:
     ```sh
     cd ../Frontend
     npm install
     ```

3. **Set up environment variables:**
   - Create a `.env` file in `Backend/` with your MongoDB URI, JWT secret, and Gemini API key.

4. **Run the backend:**
   ```sh
   cd Backend
   npm start
   ```

5. **Run the frontend:**
   ```sh
   cd ../Frontend
   npm run dev
   ```

6. **Open your browser:**
   - Visit [http://localhost:5173](http://localhost:5173)

---

## 🗣️ Voice Commands

- "Hey [AssistantName], search for cats on Google"
- "Hey [AssistantName], play music on YouTube"
- "Hey [AssistantName], open Instagram"
- "Hey [AssistantName], what's the weather?"
- "Hey [AssistantName], what time is it?"

---

## 📁 Project Structure

```
Virtual-Assistant/
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── cofig/
│   ├── public/
│   ├── server.js
│   └── ...
├── Frontend/
│   ├── src/
│   │   ├── Pages/
│   │   ├── Components/
│   │   ├── Context/
│   │   └── ...
│   ├── public/
│   ├── index.html
│   └── ...
└── README.md
```

---

## 🧑‍💻 Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- [Google Gemini API](https://ai.google.dev/gemini-api)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [React](https://react.dev/)

---

> Made with ❤️ by Manjot Singh
# Virtual-Assistant
