const chatBox = document.getElementById('chat-box');
const inputField = document.getElementById('input-field');
const sendButton = document.getElementById('send-button');

const botTriggers = ['hello', 'help', 'goodbye'];
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

    setTimeout(() => {
        messageElement.style.transform = 'translateX(0)';
        messageElement.style.opacity = '1';
    }, 100);

    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(userMessage) {
    const triggerIndex = botTriggers.indexOf(userMessage);
    return triggerIndex !== -1 ? botResponses[triggerIndex] : defaultResponse;
}

function handleUserInput() {
    const userMessage = inputField.value.trim().toLowerCase();

    if (userMessage === "") return;

    addMessage(userMessage, 'user');

    const botMessage = getBotResponse(userMessage);

    setTimeout(() => {
        addMessage(botMessage, 'bot');
    }, 500);

    inputField.value = "";
}

sendButton.addEventListener('click', handleUserInput);

inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleUserInput();
    }
});