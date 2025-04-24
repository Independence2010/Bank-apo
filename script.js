// Login function
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Simple demo check
  if (username === "user" && password === "1234") {
    localStorage.setItem("username", username);
    localStorage.setItem("balance", "1000");
    localStorage.setItem("history", JSON.stringify([]));
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials");
  }
}

// Load dashboard
if (window.location.pathname.includes("dashboard.html")) {
  document.getElementById("user-name").innerText = localStorage.getItem("username");
  document.getElementById("balance").innerText = localStorage.getItem("balance");
  renderHistory();
}

// Transfer function
function transfer() {
  const recipient = document.getElementById("recipient").value;
  const amount = parseFloat(document.getElementById("amount").value);
  let balance = parseFloat(localStorage.getItem("balance"));

  if (amount > 0 && amount <= balance) {
    balance -= amount;
    localStorage.setItem("balance", balance);
    document.getElementById("balance").innerText = balance;

    let history = JSON.parse(localStorage.getItem("history"));
    history.push(`Sent $${amount} to ${recipient}`);
    localStorage.setItem("history", JSON.stringify(history));
    renderHistory();
  } else {
    alert("Insufficient balance or invalid amount");
  }
}

function renderHistory() {
  const historyList = document.getElementById("history");
  const history = JSON.parse(localStorage.getItem("history"));
  historyList.innerHTML = "";
  history.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
}