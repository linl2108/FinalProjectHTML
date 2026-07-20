
// --------------------------- בדיקה לשם משתמש ---------------------------

const usernameInput = document.getElementById("username");
const usernameError = document.getElementById("username-error");
const usernameRegex = /^[A-Za-z0-9!@#$%^&*()_+\-]+$/;

usernameInput.addEventListener("input", function () {

    const username = usernameInput.value;

    usernameError.textContent = "";
    usernameInput.classList.remove("invalid", "valid");

    if (username === "") { return; }

    if (!usernameRegex.test(username))
    {
        usernameError.textContent = "Username can contain only English letters, numbers and special characters";
        usernameInput.classList.add("invalid");
    }

    else if (usernameExists(username))
    {
        usernameError.textContent = "This username already exists in the system.";
        usernameInput.classList.add("invalid");
    }

    else
    {
        usernameInput.classList.add("valid");
    }
});



// ---------------------------  בדיקה לסיסמא --------------------------- 

const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("password-error");

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-])[^\s]{7,12}$/;

passwordInput.addEventListener("input", function () {

    const password = passwordInput.value;

    passwordError.textContent = "";
    passwordInput.classList.remove("invalid", "valid");

    if (password === "")
    {
        checkConfirmPassword(); // מנקה גם את האימות
        return;
    }

    if (!passwordRegex.test(password))
    {
        passwordError.textContent =
        "Password must contain a capital letter, a number, a special character and be between 7-12 characters.";
        passwordInput.classList.add("invalid");
    }

    else
    {
        passwordInput.classList.add("valid");
    }

    // בודק מחדש התאמה אחרי שינוי הסיסמה
    checkConfirmPassword();
});



// --------------------------- אימות סיסמא --------------------------- 

const confirmPasswordInput = document.getElementById("confirm-password");
const confirmPasswordError = document.getElementById("confirm-password-error");

function checkConfirmPassword()
{
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    confirmPasswordError.textContent = "";
    confirmPasswordInput.classList.remove("invalid", "valid");

    if (confirmPassword === "") { return; }

    if (password !== confirmPassword)
    {
        confirmPasswordError.textContent = "Password not matching.";
        confirmPasswordInput.classList.add("invalid");
    }

    else
    {
        confirmPasswordInput.classList.add("valid");
    }
}


// --------------------------- בדיקה כשמשנים את אימות הסיסמה ---------------------------
confirmPasswordInput.addEventListener("input", checkConfirmPassword);

const profilePicInput = document.getElementById("profile-pic");
const profilePicError = document.getElementById("profile-pic-error");
const form = document.getElementById("register-form");



// --------------------------- בדיקה כאשר בוחרים קובץ --------------------------- 

profilePicInput.addEventListener("change", function () {

    profilePicError.textContent = "";
    profilePicInput.classList.remove("invalid", "valid");

    const file = profilePicInput.files[0];

    // אם לא נבחר קובץ - לא מציגים שגיאה כאן
    if (!file)
    {
        return;
    }

    // בדיקת סוג הקובץ
    if (file.type !== "image/jpeg")
    {
        profilePicError.textContent = "Profile picture must be a JPG or JPEG file.";
        profilePicInput.classList.add("invalid");
    }

    else
    {
        profilePicInput.classList.add("valid");
    }
});


// --------------------------- בדיקת שם פרטי --------------------------- 

const fnameInput = document.getElementById("fname");
const fnameError = document.getElementById("fname-error");

const nameRegex = /^[A-Za-z\s]+$/;

fnameInput.addEventListener("input", function ()
{
    const fname = fnameInput.value;

    fnameError.textContent = "";
    fnameInput.classList.remove("invalid", "valid");

    if (fname === "")
    {
        return;
    }

    if (!nameRegex.test(fname))
    {
        fnameError.textContent = "First name can contain letters and spaces only.";
        fnameInput.classList.add("invalid");
    }

    else
    {
        fnameInput.classList.add("valid");
    }
});


// --------------------------- בדיקת שם משפחה --------------------------- 

const lnameInput = document.getElementById("lname");
const lnameError = document.getElementById("lname-error");

lnameInput.addEventListener("input", function ()
{
    const lname = lnameInput.value;

    lnameError.textContent = "";
    lnameInput.classList.remove("invalid", "valid");

    if (lname === "")
    {
        return;
    }

    if (!nameRegex.test(lname))
    {
        lnameError.textContent = "Last name can contain letters and spaces only.";
        lnameInput.classList.add("invalid");
    }

    else
    {
        lnameInput.classList.add("valid");
    }
});


// --------------------------- בדיקת אימייל --------------------------- 

const mailInput = document.getElementById("mail");
const mailError = document.getElementById("mail-error");

const mailRegex = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.com$/;

mailInput.addEventListener("input", function ()
{
    const mail = mailInput.value;

    mailError.textContent = "";
    mailInput.classList.remove("invalid", "valid");

    if (mail === "")
    {
        return;
    }

    if (!mailRegex.test(mail))
    {
        mailError.textContent = "Email must contain English letters, special characters, one @ and end with .com only.";
        mailInput.classList.add("invalid");
    }

    else if (emailExists(mail))
    {
        mailError.textContent = "This email already exists in the system.";
        mailInput.classList.add("invalid");
    }

    else
    {
        mailInput.classList.add("valid");
    }
});


// --------------------------- בדיקת תאריך לידה ---------------------------

const bdayInput = document.getElementById("bday");
const bdayError = document.getElementById("bday-error");

bdayInput.addEventListener("change", function ()
{
    const birthDate = new Date(bdayInput.value);
    const today = new Date();

    bdayError.textContent = "";
    bdayInput.classList.remove("invalid", "valid");

    if (!bdayInput.value)
    {
        return;
    }

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();

    // אם יום ההולדת עוד לא הגיע השנה מורידים שנה
    if ( monthDifference < 0 ||(monthDifference === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }

    if (age < 16 || age > 120)
    {
        bdayError.textContent = "You must be at least 16 years old to sign up.";
        bdayInput.classList.add("invalid");
    }

    else
    {
        bdayInput.classList.add("valid");
    }
});


// --------------------------- בדיקת רחוב --------------------------- 

const streetInput = document.getElementById("street");
const streetError = document.getElementById("street-error");

const streetRegex = /^[א-ת\s]+$/;

streetInput.addEventListener("input", function () {

    const street = streetInput.value;
    streetError.textContent = "";
    streetInput.classList.remove("invalid", "valid");

    if (street === "")
    {
        return;
    }

    if (!streetRegex.test(street))
    {
        streetError.textContent = "Street can contain Hebrew letters only.";
        streetInput.classList.add("invalid");
    } 

    else
    {
        streetInput.classList.add("valid");
    }
});


// --------------------------- בדיקת מספר רחוב --------------------------- 

const streetNoInput = document.getElementById("street-no");
const streetNoError = document.getElementById("street-no-error");

streetNoInput.addEventListener("input", function () {

    const streetNo = streetNoInput.value;

    streetNoError.textContent = "";
    streetNoInput.classList.remove("invalid", "valid");

    if (streetNo === "")
    {
        return;
    }

    if (Number(streetNo) < 0)
    {
        streetNoError.textContent = "Street number cannot be negative.";
        streetNoInput.classList.add("invalid");
    }
    else
    {
        streetNoInput.classList.add("valid");
    }
});


// --------------------------- בדיקת עיר ---------------------------

const cityInput = document.getElementById("city");
const cityError = document.getElementById("city-error");
const citiesList = document.getElementById("cities-list");

let cities = [];

// טעינת קובץ הערים
fetch("data/cities.json")
.then(response => response.json())
.then(data => {

    cities = data.result.records.map(city =>
        city["שם_ישוב"].trim()
    );
});

// עדכון הרשימה ובדיקת תקינות בזמן הקלדה
cityInput.addEventListener("input", function () {

    const value = cityInput.value.trim();

    citiesList.innerHTML = "";
    cityError.textContent = "";
    cityInput.classList.remove("invalid", "valid");

    if (value === "")
    {
        return;
    }

    const matches = cities.filter(city =>
        city.includes(value)
    );

    matches.forEach(city => {

        const option = document.createElement("option");
        option.value = city;
        citiesList.appendChild(option);
    });

    // אם העיר קיימת ברשימה
    if (cities.includes(value))
    {
        cityInput.classList.add("valid");
    }
    else
    {
        cityInput.classList.add("invalid");
        cityError.textContent =
        "Please select a city from the list.";
    }
});

// --------------------------- בדיקה אם שדה חובה ריק --------------------------- 

function checkRequired(id, message)
{
    const input = document.getElementById(id);
    const error = document.getElementById(id + "-error");

    if (id === "profile-pic")
    {
        if (input.files.length === 0)
        {
            input.classList.add("invalid");
            error.textContent = message;
            return false;
        }
        else
        {
            return true;
        }
    }

    if (input.value.trim() === "")
    {
        input.classList.add("invalid");
        error.textContent = message;
        return false;
    }
    return true;
}