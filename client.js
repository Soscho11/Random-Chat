const messagesList = document.getElementById('messages');
const msgInput = document.getElementById('msg');
const sendBtn = document.getElementById('send');
const clearBtn = document.getElementById('clear');

// Load messages from localStorage
let messages = JSON.parse(localStorage.getItem('messages') || '[]');

// Render messages
function renderMessages() {
  messagesList.innerHTML = '';
  messages.forEach(msg => {
    const li = document.createElement('li');
    li.textContent = msg.text;
    li.className = 'msg ' + msg.type;
    messagesList.appendChild(li);
  });
  messagesList.scrollTop = messagesList.scrollHeight;
}

// Send message
function sendMessage() {
  const text = msgInput.value.trim();
  if (!text) return;

  const msg = { text: text, type: 'user' };
  messages.push(msg);

  localStorage.setItem('messages', JSON.stringify(messages));
  msgInput.value = '';
  renderMessages();
}

// Clear chat
function clearChat() {
  if (confirm("Are you sure you want to clear the chat?")) {
    messages = [];
    localStorage.removeItem('messages');
    renderMessages();
  }
}

// Events
sendBtn.addEventListener('click', sendMessage);
msgInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});
clearBtn.addEventListener('click', clearChat);

// Initial render
renderMessages();
// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBVBTVw6cKQXajZniW7cpX68HQL-1nYPbg",
  authDomain: "room-ec3e8.firebaseapp.com",
  projectId: "room-ec3e8",
  storageBucket: "room-ec3e8.firebasestorage.app",
  messagingSenderId: "306404527262",
  appId: "1:306404527262:web:f9c251339050ceab3dbf8f",
  measurementId: "G-TE6G7HTP4Z"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
