const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-btn");

sendButton.addEventListener("click", async () => {
    const userMessage = userInput.value;
    chatLog.innerHTML += `<div class="user-message">${userMessage}</div>`;
    userInput.value = "";

    const csrfToken = getCookie('csrftoken'); // Obtener el token CSRF de las cookies

    const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-CSRFToken": csrfToken
        },
        body: `message=${userMessage}`
    });

    const responseData = await response.json();
    const botMessage = responseData.message;

    chatLog.innerHTML += `<div class="bot-message">${botMessage}</div>`;

    // Scroll automático hacia el final del chat
    chatLog.scrollTop = chatLog.scrollHeight;
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

