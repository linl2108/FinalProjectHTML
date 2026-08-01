
// --------------------------- תפריט לפי משתמש מחובר ---------------------------
const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

if (currentUser) {
    const loginLink = document.getElementById("login-link");
    const signupLink = document.getElementById("signup-link");

    loginLink.textContent = "Profile";
    loginLink.href = "profile.html";

    signupLink.textContent = "Log Out";
    signupLink.href = "#";

    signupLink.addEventListener("click", function (event) {

        event.preventDefault();

        sessionStorage.removeItem("currentUser");

        window.location.href = "index.html";
    });
}

// --------------------------- מנהל ---------------------------
if (sessionStorage.getItem("isAdmin") === "true") {
    const loginLink = document.getElementById("login-link");
    const signupLink = document.getElementById("signup-link");

    loginLink.textContent = "Manage Users";
    loginLink.href = "admin.html";

    signupLink.textContent = "Log Out";
    signupLink.href = "#";

    signupLink.addEventListener("click", function (event) {

        event.preventDefault();

        sessionStorage.removeItem("isAdmin");
        sessionStorage.removeItem("currentUser");

        window.location.href = "index.html";
    });
}

// --------------------------- שאילת שאלה ---------------------------
const askLink = document.querySelector('a[href*="ask.html"]');

if (askLink) {

    const isAdmin = sessionStorage.getItem("isAdmin") === "true";
    const currentUser = sessionStorage.getItem("currentUser");

    // אם המשתמש המחובר הוא המנהל אז לא יוצג לו בתפריט כפתור שאילת שאלה
    if (isAdmin) {
        askLink.style.display = "none";
    }

    // משתמש לא מחובר פשוט מועבר להתחברות
    else if (!currentUser) {

        askLink.addEventListener("click", function (event) {

            event.preventDefault();
            window.location.href = "login.html";
        });
    }
}
document.body.classList.add("nav-ready");