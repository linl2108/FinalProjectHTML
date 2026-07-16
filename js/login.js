
// --------------------------- התחברות ---------------------------

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];


// --------------------------- חיפוש המשתמש ---------------------------

    const user = users.find(function (user) {

        return user.username === username && user.password === password;

    });

    if (!user)
    {
        document.getElementById("login-error").textContent =
        "Username or password are invalid.";
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    window.location.href = "index.html";

});
