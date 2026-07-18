
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

        document.getElementById("username").value,
        document.getElementById("password").value,
        "", // התמונה תישמר אחר כך ע"י FileReader
        document.getElementById("fname").value,
        document.getElementById("lname").value,
        document.getElementById("mail").value,
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

    let users = JSON.parse(localStorage.getItem("users")) || [];

    for (let user of users) {

        if (user.username === username) {
            return true;
        }

    }

    return false;
}


// --------------------------- בדיקת אימייל אם קיים/לא קיים במערכת ---------------------------

function emailExists(mail) {

    let users = JSON.parse(localStorage.getItem("users")) || [];

    for (let user of users) {

        if (user.mail === mail) {
            return true;
        }

    }

    return false;

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