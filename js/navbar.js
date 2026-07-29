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

// --------------------------- מנהל ---------------------------

if (sessionStorage.getItem("isAdmin") === "true")
{
    const loginLink = document.getElementById("login-link");
    const signupLink = document.getElementById("signup-link");

    loginLink.textContent = "Manage Users";
    loginLink.href = "admin.html";

    signupLink.textContent = "Log Out";
    signupLink.href = "#";

    signupLink.addEventListener("click", function(event){

        event.preventDefault();

        sessionStorage.removeItem("isAdmin");
        sessionStorage.removeItem("currentUser");

        window.location.href = "index.html";

    });
}

const askLink = document.querySelector('a[href="ask.html"]');

if (askLink)
{
    askLink.addEventListener("click", function (event)
    {
        const currentUser = sessionStorage.getItem("currentUser");
        const isAdmin = sessionStorage.getItem("isAdmin");

        if (!currentUser && isAdmin !== "true")
        {
            event.preventDefault();
            window.location.href = "login.html";
        }
    });
}