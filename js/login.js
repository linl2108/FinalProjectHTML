
// --------------------------- התחברות ---------------------------
const loginForm = document.getElementById("login-form");

// אם נלחץ הגש טופס/שלח טופס - במקרה זה זה לוגין
loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const username = document.getElementById("login-username").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    // --------------------------- התחברות מנהל ---------------------------
    if (username === "admin" && password === "admin1234admin")
    {
        sessionStorage.setItem("isAdmin", "true");

        window.location.href = "admin.html";

        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

// --------------------------- חיפוש המשתמש ---------------------------
    const user = users.find(function (user) {

        return user.username.toLowerCase() === username && user.password === password;
    });

    if (!user)
    {
        document.getElementById("login-error").textContent =
        "Username or password are invalid.";
        return;
    }

    sessionStorage.setItem("currentUser", JSON.stringify(user));

    window.location.href = "index.html";
});
