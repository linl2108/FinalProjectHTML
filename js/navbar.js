// --------------------------- תפריט לפי משתמש מחובר ---------------------------

const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

if (currentUser)
{
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