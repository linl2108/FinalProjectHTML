
// --------------------------- כפתור המשך ---------------------------

const continueBtn = document.getElementById("continue-btn");

continueBtn.addEventListener("click", function ()
{
    if (validateStep1())
    {
        const step1 = document.getElementById("step1");
        const step2 = document.getElementById("step2");

        step1.classList.add("fade");

        setTimeout(function ()
        {
            step1.style.display = "none";
            step2.style.display = "block";

            step2.classList.remove("fade");

            document.getElementById("step1-title").classList.remove("active");
            document.getElementById("step2-title").classList.add("active");
        }, 300);
    }
});


// --------------------------- בדיקת שלב 1 ---------------------------
function validateStep1() {

    let valid = true;

    if (!checkRequired("fname", "First name is required")) {
        valid = false;
    }

    if (!checkRequired("lname", "Last name is required")) {
        valid = false;
    }

    if (!checkRequired("bday", "Birth date is required")) {
        valid = false;
    }

    if (!checkRequired("city", "City is required")) {
        valid = false;
    }

    if (!checkRequired("street", "Street is required")) {
        valid = false;
    }

    if (!checkRequired("street-no", "Street number is required")) {
        valid = false;
    }

    // אם אחד השדות לא עבר את בדיקת התקינות
    const fields = [
        fnameInput,
        lnameInput,
        bdayInput,
        cityInput,
        streetInput,
        streetNoInput
    ];

    fields.forEach(field => {
        if (!field.classList.contains("valid")) {
            valid = false;
        }
    });

    return valid;
}

const backBtn = document.getElementById("back-btn");

backBtn.addEventListener("click", function ()
{
    document.getElementById("step2").style.display = "none";
    document.getElementById("step1").style.display = "block";

    document.getElementById("step2-title").classList.remove("active");
    document.getElementById("step1-title").classList.add("active");
});


// --------------------------- בדיקת שליחה של הטופס ---------------------------

form.addEventListener("submit", function (event) {

    event.preventDefault();

    let valid = true;

    if (!checkRequired("username", "Username is required")) valid = false;
    if (!checkRequired("password", "Password is required")) valid = false;
    if (!checkRequired("confirm-password", "Password confirmation is required")) valid = false;
    if (!checkRequired("profile-pic", "Profile picture is required")) valid = false;
    if (!checkRequired("fname", "First name is required")) valid = false;
    if (!checkRequired("lname", "Last name is required")) valid = false;
    if (!checkRequired("mail", "Email is required")) valid = false;
    if (!checkRequired("bday", "Birth date is required")) valid = false;
    if (!checkRequired("city", "City is required")) valid = false;
    if (!checkRequired("street", "Street is required")) valid = false;
    if (!checkRequired("street-no", "Street number is required")) valid = false;

    const fields = [
        usernameInput,
        passwordInput,
        confirmPasswordInput,
        profilePicInput,
        fnameInput,
        lnameInput,
        mailInput,
        bdayInput,
        cityInput,
        streetInput,
        streetNoInput
    ];

    fields.forEach(field => {
        if (!field.classList.contains("valid")) {
            valid = false;
        }
    });

    if (valid) {
        saveUser();
    }

});