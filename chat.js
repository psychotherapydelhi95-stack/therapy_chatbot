document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatBox = document.getElementById('chat-box');
  
  // Load site content
  let siteContent = "";

  fetch('data/sitecontent.txt')
    .then(response => {
      if (!response.ok) throw new Error("Could not load sitecontent.txt");
      return response.text();
    })
    .then(text => {
      siteContent = text.toLowerCase();
      console.log("✅ sitecontent.txt loaded successfully");
    })
    .catch(error => {
      console.error("⚠️ Error loading sitecontent.txt:", error);
      appendMessage("bot", "Sorry, I couldn’t load the information source. Please try again later.");
    });

  chatForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    appendMessage("user", userMessage);
    chatInput.value = "";

    const reply = generateReply(userMessage.toLowerCase());
    appendMessage("bot", reply);
  });

  function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function generateReply(userMessage) {
    if (!siteContent) {
      return "I’m still loading the information — please try again in a few seconds.";
    }

    const sentences = siteContent.split(/\n|\. /);
    const matches = sentences.filter(line => userMessage.split(" ").some(word => line.includes(word)));

    if (matches.length > 0) {
      return matches.slice(0, 3).join(". ") + ".";
    } else {
      return "I couldn’t find anything on that. You can ask about supervision models, ethics, reflective practice, or research references.";
    }
  }
});
// Simple psychotherapy chatbot powered by your own sitecontent.txt
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatBox = document.getElementById('chat-box');

// Load your text data from /data/sitecontent.txt
let siteContent = "";

fetch('data/sitecontent.txt')
  .then(response => {
    if (!response.ok) throw new Error("Could not load sitecontent.txt");
    return response.text();
  })
  .then(text => {
    siteContent = text.toLowerCase();
    console.log("✅ sitecontent.txt loaded successfully");
  })
  .catch(error => {
    console.error("⚠️ Error loading sitecontent.txt:", error);
    appendMessage("bot", "Sorry, I couldn’t load the information source. Please try again later.");
  });

// Handle chat submission
chatForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  appendMessage("user", userMessage);
  chatInput.value = "";

  // Generate bot reply
  const reply = generateReply(userMessage.toLowerCase());
  appendMessage("bot", reply);
});

// Append messages to chat window
function appendMessage(sender, text) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Simple keyword-based reply system
function generateReply(userMessage) {
  if (!siteContent) {
    return "I’m still loading the information — please try again in a few seconds.";
  }

  const sentences = siteContent.split(/\n|\. /);
  const matches = sentences.filter(line => userMessage.split(" ").some(word => line.includes(word)));

  if (matches.length > 0) {
    return matches.slice(0, 3).join(". ") + ".";
  } else {
    return "I couldn’t find anything on that. You can ask about supervision models, ethics, reflective practice, or research references.";
  }
}
