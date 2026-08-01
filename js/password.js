// עין לנראות סיסמא
const password = document.getElementById("password");
const eyeIcon = document.getElementById("eye-icon");

if (password && eyeIcon) {
    eyeIcon.onclick = function () {
        if (password.type == "password")
        {
            password.type = "text";
        }
        else
        {
            password.type = "password";
        }
    };
}