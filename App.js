const chatBox = document.getElementById('chat-box');
const inputField = document.getElementById('input-field');
const sendButton = document.getElementById('send-button');

const userMessages = ['hello', 'help', 'goodbye'];
const botResponses = [
    "Hi there! How can I assist you today?",
    "Sure, what do you need help with?",
    "Goodbye! Have a great day!"
];
const defaultResponse = "Sorry, I didn't understand that. Can you please clarify?";

function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('message', 'bot-message', 'typing-indicator');
    typingIndicator.id = "typing-indicator";

    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        typingIndicator.appendChild(dot);
    }

    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function getBotResponse(userMessage) {
    const triggerIndex = userMessages.indexOf(userMessage);
    return triggerIndex !== -1 ? botResponses[triggerIndex] : defaultResponse;
}

function handleUserInput() {
    const userMessage = inputField.value.trim().toLowerCase();

    if (userMessage === "") return;

    addMessage(userMessage, 'user');

    inputField.value = "";

    showTypingIndicator();

    const botMessage = getBotResponse(userMessage);

    setTimeout(() => {
        removeTypingIndicator();
        addMessage(botMessage, 'bot');
    }, 1000);
}

sendButton.addEventListener('click', handleUserInput);

inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleUserInput();
    }
});