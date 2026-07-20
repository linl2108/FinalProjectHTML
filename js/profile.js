// --------------------------- הצגת פרטי המשתמש ---------------------------

function loadProfile() {

    const loggedUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!loggedUser)
    {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("profile-name").textContent =
    loggedUser.fname + " " + loggedUser.lname;

    document.getElementById("profile-username").textContent =
    "@" + loggedUser.username;

    document.getElementById("profile-email").textContent =
    loggedUser.mail;

    document.getElementById("profile-bday").textContent =
    loggedUser.bday;

    document.getElementById("profile-address").textContent =
    loggedUser.city + ", " +
    loggedUser.street + " " +
    loggedUser.streetNo;

    document.getElementById("profile-image").src = loggedUser.profilePic;
    
}

loadProfile();

const gameBtn = document.getElementById("game-btn");

gameBtn.addEventListener("click", function () {
    window.open("game.html", "_blank");
});