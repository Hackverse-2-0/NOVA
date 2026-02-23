// ======================================
// CHAT TOGGLE (OPEN / CLOSE)
// ======================================

function toggleChat(){
    const box = document.getElementById("chatBox");

    if(box.style.display === "flex"){
        box.style.display = "none";
    } else {
        box.style.display = "flex";
    }
}

// ======================================
// SEND CHAT MESSAGE
// ======================================

function send(){
    const input = document.getElementById("chatInput");
    const chatBody = document.getElementById("chatBody");
    const text = input.value.trim();

    if(text === "") return;

    // Add user message
    const userMsg = document.createElement("div");
    userMsg.className = "user-msg";
    userMsg.innerText = text;
    chatBody.appendChild(userMsg);

    // Get bot reply
    const reply = getBotReply(text.toLowerCase());

    setTimeout(() => {
        const botMsg = document.createElement("div");
        botMsg.className = "bot-msg";
        botMsg.innerText = reply;
        chatBody.appendChild(botMsg);

        chatBody.scrollTop = chatBody.scrollHeight;
    }, 500);

    input.value = "";
}

// ======================================
// BOT REPLY LOGIC
// ======================================

function getBotReply(text){

    if(text.includes("visa")){
        return "You can apply for Indian tourist visa online through the official government portal.";
    }
    else if(text.includes("hotel")){
        return "You can book hotels using MakeMyTrip or Booking.com.";
    }
    else if(text.includes("train")){
        return "Train tickets can be booked from IRCTC official website.";
    }
    else if(text.includes("best time")){
        return "Best time to visit India is October to March.";
    }
    else if(text.includes("festival")){
        return "Major festivals include Diwali, Holi, Navratri and Eid.";
    }
    else if(text.includes("food")){
        return "Popular Indian foods are Biryani, Dosa, Butter Chicken and Samosa.";
    }
    else if(text.includes("emergency")){
        return "Dial 112 for national emergency services in India.";
    }
    else{
        return "I can help with visa, hotels, trains, festivals, food and travel tips.";
    }
}

// ======================================
// ENTER KEY SUPPORT FOR CHAT
// ======================================

document.addEventListener("DOMContentLoaded", function(){
    const input = document.getElementById("chatInput");

    if(input){
        input.addEventListener("keypress", function(e){
            if(e.key === "Enter"){
                send();
            }
        });
    }
});

// ======================================
// CURRENCY CONVERTER (USD → INR)
// ======================================

function convert(){
    const usdInput = document.getElementById("usd");
    const result = document.getElementById("currencyResult");

    const usd = parseFloat(usdInput.value);

    if(isNaN(usd)){
        result.innerText = "Please enter valid USD amount.";
        return;
    }

    const exchangeRate = 83;  // Static demo rate
    const inr = usd * exchangeRate;

    result.innerText = "INR: ₹" + inr.toFixed(2);
}

// ======================================
// WEATHER API (OPENWEATHER)
// ======================================

function weather(){

    const cityInput = document.getElementById("city");
    const result = document.getElementById("weatherResult");
    const city = cityInput.value.trim();

    if(city === ""){
        result.innerText = "Please enter a city name.";
        return;
    }

    // IMPORTANT:
    // Replace YOUR_API_KEY with real OpenWeather API key
    const apiKey = "YOUR_API_KEY";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => {
        if(!response.ok){
            throw new Error("City not found");
        }
        return response.json();
    })
    .then(data => {
        const temp = data.main.temp;
        const condition = data.weather[0].description;

        result.innerText = 
            `Weather in ${city}: ${temp}°C, ${condition}`;
    })
    .catch(error => {
        result.innerText = "Weather data unavailable. Check city name or API key.";
    });
}
// ======================
// AUTH SYSTEM (SINGLE PAGE)
// ======================

let isRegisterMode = false;

function openAuth(){
  document.getElementById("authModal").style.display = "flex";
  document.getElementById("authName").style.display = "none";
}

function closeAuth(){
  document.getElementById("authModal").style.display = "none";
}

function toggleAuthMode(){
  isRegisterMode = !isRegisterMode;

  const title = document.getElementById("authTitle");
  const btn = document.getElementById("authBtn");
  const nameField = document.getElementById("authName");
  const toggleText = document.getElementById("toggleText");

  if(isRegisterMode){
    title.innerText = "Register";
    btn.innerText = "Register";
    nameField.style.display = "block";
    toggleText.innerHTML =
      `Already have account? <a href="#" onclick="toggleAuthMode()">Login</a>`;
  } else {
    title.innerText = "Login";
    btn.innerText = "Login";
    nameField.style.display = "none";
    toggleText.innerHTML =
      `Don't have account? <a href="#" onclick="toggleAuthMode()">Register</a>`;
  }
}

function handleAuth(){
  const name = document.getElementById("authName").value;
  const email = document.getElementById("authEmail").value;
  const password = document.getElementById("authPassword").value;

  if(email === "" || password === ""){
    alert("Please fill required fields");
    return;
  }

  if(isRegisterMode){
    if(name === ""){
      alert("Enter your name");
      return;
    }

    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Registration successful! Please login.");
    toggleAuthMode();
  } else {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if(!storedUser){
      alert("No registered user found.");
      return;
    }

    if(email === storedUser.email && password === storedUser.password){
      localStorage.setItem("loggedInUser", storedUser.name);
      alert("Login successful!");
      closeAuth();
      updateUI();
    } else {
      alert("Invalid email or password");
    }
  }
}

function updateUI(){
  const user = localStorage.getItem("loggedInUser");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const display = document.getElementById("userDisplay");

  if(user){
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    display.innerText = "Welcome, " + user;
  } else {
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    display.innerText = "";
  }
}

function logout(){
  localStorage.removeItem("loggedInUser");
  updateUI();
}

document.addEventListener("DOMContentLoaded", updateUI);
// =====================================
// AUTH SYSTEM (ADD THIS AT END ONLY)
// =====================================

// REGISTER FUNCTION
function register(){
    const name = document.getElementById("regName")?.value;
    const email = document.getElementById("regEmail")?.value;
    const password = document.getElementById("regPassword")?.value;

    if(!name || !email || !password){
        alert("Please fill all fields");
        return;
    }

    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration successful!");
    window.location.href = "login.html";
}

// LOGIN FUNCTION
function login(){
    const email = document.getElementById("loginEmail")?.value;
    const password = document.getElementById("loginPassword")?.value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if(!storedUser){
        alert("No registered user found.");
        return;
    }

    if(email === storedUser.email && password === storedUser.password){
        localStorage.setItem("loggedInUser", storedUser.name);
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password");
    }
}

// SHOW LOGGED USER IN NAVBAR
document.addEventListener("DOMContentLoaded", function(){

    const user = localStorage.getItem("loggedInUser");
    const display = document.getElementById("userDisplay");
    const loginLink = document.getElementById("loginLink");
    const logoutBtn = document.getElementById("logoutBtn");

    if(user && display){
        display.innerText = "Welcome, " + user;
        if(loginLink) loginLink.style.display = "none";
        if(logoutBtn) logoutBtn.style.display = "inline-block";
    }
});

// LOGOUT FUNCTION
function logout(){
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully");
    window.location.reload();
}
// OPEN LOGIN MODAL
function openLogin(){
    document.getElementById("loginModal").style.display = "flex";
}

// CLOSE LOGIN MODAL
function closeLogin(){
    document.getElementById("loginModal").style.display = "none";
}

// LOGIN FUNCTION
function login(){
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if(email === "" || password === ""){
        alert("Please fill all fields");
        return;
    }

    alert("Login Successful (Demo Mode)");
    closeLogin();
}
function handleContactSubmit(event) {
    event.preventDefault();
    const toast = document.getElementById('toast');
    
    // Simple UI Feedback
    toast.innerText = "Connecting to Help Desk... Please wait.";
    toast.className = "toast show warning";
    
    setTimeout(() => {
        toast.innerText = "Message Sent! Reference ID: " + Math.floor(Math.random() * 900000);
        toast.className = "toast show success";
        event.target.reset();
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }, 1500);
}