
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearBtn");
const micBtn = document.getElementById("micBtn");

/* LOAD CHAT */

window.onload = () => {

    const savedChats = localStorage.getItem("chatData");

    if(savedChats){

        chatBox.innerHTML = savedChats;

    }

};

/* SAVE CHAT */

function saveChat(){

    localStorage.setItem("chatData", chatBox.innerHTML);

}

/* SEND BUTTON */

sendBtn.addEventListener("click", sendMessage);

/* ENTER KEY */

userInput.addEventListener("keydown", function(e){

    if(e.key === "Enter" && !e.shiftKey){

        e.preventDefault();

        sendMessage();

    }

});

/* AUTO HEIGHT */

userInput.addEventListener("input", () => {

    userInput.style.height = "auto";

    userInput.style.height =
    userInput.scrollHeight + "px";

});

/* SEND MESSAGE */

function sendMessage(){

    const text = userInput.value.trim();

    if(text === "") return;

    addUserMessage(text);

    userInput.value = "";

    userInput.style.height = "55px";

    botTyping();

}

/* USER MESSAGE */

function addUserMessage(text){

    const div = document.createElement("div");

    div.classList.add("user-message");

    div.innerHTML = `

        <div class="message">
            ${text}
        </div>

        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png">

    `;

    chatBox.appendChild(div);

    scrollBottom();

    saveChat();

}

/* BOT MESSAGE */

function addBotMessage(text){

    const div = document.createElement("div");

    div.classList.add("bot-message");

    div.innerHTML = `

        <img src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png">

        <div class="message">
            ${text}
        </div>

    `;

    chatBox.appendChild(div);

    scrollBottom();

    saveChat();

}

/* SCROLL */

function scrollBottom(){

    chatBox.scrollTop = chatBox.scrollHeight;

}

/* BOT TYPING */

function botTyping(){

    const typingDiv = document.createElement("div");

    typingDiv.classList.add("bot-message");

    typingDiv.id = "typing";

    typingDiv.innerHTML = `

        <img src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png">

        <div class="message">

            <div class="typing">
                <span></span>
                <span></span>
                <span></span>
            </div>

        </div>

    `;

    chatBox.appendChild(typingDiv);

    scrollBottom();

    setTimeout(() => {

        document.getElementById("typing").remove();

        const reply = generateReply();

        addBotMessage(reply);

    }, 1500);

}

/* BOT REPLY */

function generateReply(){

    const replies = [

        "Hello 👋",
        "How can I help you?",
        "That sounds interesting.",
        "Tell me more about it.",
        "I understand your question.",
        "Nice 😊",
        "Great 🚀",
        "Can you explain more?",
        "I am your AI assistant.",
        "Thanks for your message."

    ];

    return replies[
        Math.floor(Math.random() * replies.length)
    ];

}

/* CLEAR CHAT */

clearBtn.addEventListener("click", () => {

    localStorage.removeItem("chatData");

    chatBox.innerHTML = `

        <div class="bot-message">

            <img src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png">

            <div class="message">

                Hello 👋 <br>
                Chat cleared successfully.

            </div>

        </div>

    `;

});

/* VOICE INPUT */

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if(SpeechRecognition){

    const recognition =
    new SpeechRecognition();

    micBtn.addEventListener("click", () => {

        recognition.start();

    });

    recognition.onresult = (event) => {

        const transcript =
        event.results[0][0].transcript;

        userInput.value = transcript;

    };

}