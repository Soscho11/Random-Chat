// Firebase config
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

const messagesList = document.getElementById('messages');
const msgInput = document.getElementById('msg');
const sendBtn = document.getElementById('send');
const clearBtn = document.getElementById('clear');

// Ask user for a name
let username = prompt("Enter your name:", "Anonymous") || "Anonymous";

// Send message
function sendMessage() {
  const text = msgInput.value.trim();
  if (!text) return;

  db.collection('messages').add({
    text: text,
    ts: Date.now(),
    user: username
  }).catch(err => console.error(err));

  msgInput.value = '';
}

// Clear all messages
function clearChat() {
  if (confirm("Are you sure you want to clear the chat?")) {
    db.collection('messages').get().then(snapshot => {
      snapshot.forEach(doc => doc.ref.delete());
    });
  }
}

// Real-time listener
db.collection('messages').orderBy('ts').onSnapshot(snapshot => {
  messagesList.innerHTML = '';
  snapshot.forEach(doc => {
    const data = doc.data();
    const li = document.createElement('li');
    li.textContent = `${data.user}: ${data.text}`;
    li.className = 'msg ' + (data.user === username ? 'user' : 'friend');
    messagesList.appendChild(li);
  });
  messagesList.scrollTop = messagesList.scrollHeight;
});

// Event listeners
sendBtn.addEventListener('click', sendMessage);
msgInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });
clearBtn.addEventListener('click', clearChat);
