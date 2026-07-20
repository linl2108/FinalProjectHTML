
// --------------------------- אובייקט משתמש ---------------------------

class User {

    constructor(username, password, profilePic, fname, lname, mail, bday, city, street, streetNo) {

        this.username = username;
        this.password = password;
        this.profilePic = profilePic;
        this.fname = fname;
        this.lname = lname;
        this.mail = mail;
        this.bday = bday;
        this.city = city;
        this.street = street;
        this.streetNo = streetNo;
    }
}


// --------------------------- יצירת משתמש ---------------------------

function createUser() {

    return new User(

        document.getElementById("username").value.trim().toLowerCase(),
        document.getElementById("password").value,
        "", // התמונה תישמר אחר כך ע"י FileReader
        document.getElementById("fname").value,
        document.getElementById("lname").value,
        document.getElementById("mail").value.trim().toLowerCase(),
        document.getElementById("bday").value,
        document.getElementById("city").value,
        document.getElementById("street").value,
        document.getElementById("street-no").value

    );

}

/*function createUser() {

    const newUser = new User(

        document.getElementById("username").value,
        document.getElementById("password").value,
        document.getElementById("profile-pic").files[0].name,
        document.getElementById("fname").value,
        document.getElementById("lname").value,
        document.getElementById("mail").value,
        document.getElementById("bday").value,
        document.getElementById("city").value,
        document.getElementById("street").value,
        document.getElementById("street-no").value
    );
    return newUser;
}*/


// --------------------------- בדיקת שם משתמש אם קיים/לא קיים במערכת ---------------------------

function usernameExists(username) {

    const users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser;

    const editingAdminUser = sessionStorage.getItem("editingAdminUser");

    if (editingAdminUser !== null)
    {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    currentUser = users[editingAdminUser];
    }
    else
{
    currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
}

    username = username.trim().toLowerCase();

    return users.some(function (user) {

        const sameUsername =
            user.username.trim().toLowerCase() === username;

        // בעריכת פרופיל מתעלמים מהמשתמש שמחובר כרגע
        if (
            currentUser &&
            user.username.trim().toLowerCase() ===
            currentUser.username.trim().toLowerCase()
        ) {
            return false;
        }

        return sameUsername;
    });
}


// --------------------------- בדיקת אימייל אם קיים/לא קיים במערכת ---------------------------

function emailExists(mail) {

    const users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser;

const editingAdminUser = sessionStorage.getItem("editingAdminUser");

if (editingAdminUser !== null)
{
    const users = JSON.parse(localStorage.getItem("users")) || [];
    currentUser = users[editingAdminUser];
}
else
{
    currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
}

    mail = mail.trim().toLowerCase();

    return users.some(function (user) {

        const sameEmail =
            user.mail.trim().toLowerCase() === mail;

        // בעריכת פרופיל מתעלמים מהמשתמש שמחובר כרגע
        if (
            currentUser &&
            user.mail.trim().toLowerCase() ===
            currentUser.mail.trim().toLowerCase()
        ) {
            return false;
        }

        return sameEmail;
    });
}


// --------------------------- שמירת משתמש ---------------------------

function saveUser() {

    const mail = document.getElementById("mail").value;

    if (emailExists(mail)) {

        document.getElementById("mail-error").textContent =
        "Email already exists.";

        document.getElementById("mail").classList.add("invalid");

        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = createUser();

    const image = document.getElementById("profile-pic").files[0];

    const reader = new FileReader();

    reader.onload = function () {

        newUser.profilePic = reader.result;

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        window.location.href = "login.html";

    };

    reader.readAsDataURL(image);

}

/* משהו שהצאט אמר להוסיף
const mailInput = document.getElementById("mail");
const mailError = document.getElementById("mail-error");

if (emailExists(mail)) {

    mailInput.classList.remove("valid");
    mailInput.classList.add("invalid");

    mailError.textContent = "Email already exists.";

    return;
}*/