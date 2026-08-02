
// --------------------------- פתיחת החלון ---------------------------

const editBtn = document.getElementById("edit-profile-btn");
const modal = document.getElementById("edit-profile-modal");

// --------------------------- מילוי הטופס ------------------------------
function fillForm() {

    const user = JSON.parse(sessionStorage.getItem("currentUser"));

    document.getElementById("username").value = user.username;

    document.getElementById("mail").value = user.mail;

    document.getElementById("password").value = user.password;

    document.getElementById("confirm-password").value = user.password;

    document.getElementById("fname").value = user.fname;

    document.getElementById("lname").value = user.lname;

    document.getElementById("bday").value = user.bday;

    document.getElementById("city").value = user.city;

    document.getElementById("street").value = user.street;

    document.getElementById("street-no").value = user.streetNo;

    document.getElementById("username").dispatchEvent(new Event("input"));
    document.getElementById("mail").dispatchEvent(new Event("input"));
    document.getElementById("password").dispatchEvent(new Event("input"));
    document.getElementById("confirm-password").dispatchEvent(new Event("input"));
    document.getElementById("fname").dispatchEvent(new Event("input"));
    document.getElementById("lname").dispatchEvent(new Event("input"));
    document.getElementById("bday").dispatchEvent(new Event("change"));
    document.getElementById("city").dispatchEvent(new Event("input"));
    document.getElementById("street").dispatchEvent(new Event("input"));
    document.getElementById("street-no").dispatchEvent(new Event("input"));

}

const closeBtn = document.getElementById("close-modal");
const cancelBtn = document.getElementById("cancel-edit");
if (editBtn) {

    editBtn.addEventListener("click", function () {

        fillForm();

        modal.style.display = "flex";
    });
}

// --------------------------- סגירת החלון ---------------------------
if (closeBtn) {

    closeBtn.addEventListener("click", function () {

        modal.style.display = "none";
    });
}

if (cancelBtn) {

    cancelBtn.addEventListener("click", function () {

        modal.style.display = "none";

    });
}

// --------------------------- סגירה בלחיצה על הרקע ---------------------------

window.addEventListener("click", function (event) {

    if (event.target === modal) {
        modal.style.display = "none";
    }
});


// --------------------------- מעבר בין השלבים ---------------------------

const editAccountTab = document.getElementById("account-tab");
const editPersonalTab = document.getElementById("personal-tab");

const editAccountSection = document.getElementById("account-section");
const editPersonalSection = document.getElementById("personal-section");

// אם נלחץ שלב פרטי משתמש
editAccountTab.addEventListener("click", function () {

    editAccountSection.style.display = "block";
    editPersonalSection.style.display = "none";

    editAccountTab.classList.add("active-tab");
    editPersonalTab.classList.remove("active-tab");
});

// אם נלחץ שלב פרטים אישיים
editPersonalTab.addEventListener("click", function () {

    editAccountSection.style.display = "none";
    editPersonalSection.style.display = "block";

    editPersonalTab.classList.add("active-tab");
    editAccountTab.classList.remove("active-tab");
});

// כפתור סייב/שמור
const saveBtn = document.getElementById("save-edit");
// אם נלחץ
saveBtn.addEventListener("click", function () {

    let valid = true;

    if (!checkRequired("username", "Username is required")) valid = false;
    if (!checkRequired("password", "Password is required")) valid = false;
    if (!checkRequired("confirm-password", "Password confirmation is required")) valid = false;
    if (!checkRequired("mail", "Email is required")) valid = false;
    if (!checkRequired("fname", "First name is required")) valid = false;
    if (!checkRequired("lname", "Last name is required")) valid = false;
    if (!checkRequired("bday", "Birth date is required")) valid = false;
    if (!checkRequired("city", "City is required")) valid = false;
    if (!checkRequired("street", "Street is required")) valid = false;
    if (!checkRequired("street-no", "Street number is required")) valid = false;

    const fields = [
        usernameInput,
        passwordInput,
        confirmPasswordInput,
        mailInput,
        fnameInput,
        lnameInput,
        bdayInput,
        cityInput,
        streetInput,
        streetNoInput
    ];

    fields.forEach(function (field) {
        if (!field.classList.contains("valid")) {
            valid = false;
        }
    });

    if (valid) {

        updateUser();
    }
});

// פונקציה שמעדכנת את הפרטים של המשתמש
function updateUser() {

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let currentUser;

    const editingAdminUser = sessionStorage.getItem("editingAdminUser");

    if (editingAdminUser !== null) {

        currentUser = users[editingAdminUser];
    }

    else {
        currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    }

    const updatedUser = {
        ...currentUser,
        username: document.getElementById("username").value.trim().toLowerCase(),
        mail: document.getElementById("mail").value.trim().toLowerCase(),
        password: document.getElementById("password").value,
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        bday: document.getElementById("bday").value,
        city: document.getElementById("city").value,
        street: document.getElementById("street").value,
        streetNo: document.getElementById("street-no").value
    };

    let index;

    if (editingAdminUser !== null) {

        index = Number(editingAdminUser);
    }

    else {

        index = users.findIndex(function (user) {

            return user.username.toLowerCase() === currentUser.username.toLowerCase();

        });
    }

    // תמונת פרופיל - הדפדפן לא ישמור את התמונה שהמשתמש העלה (לכן גם בודליציות לא תהיה שגיאה אם לא ישנה אותה)
    const image = document.getElementById("profile-pic").files[0];

    if (image) {

        const reader = new FileReader();

        reader.onload = function () {

            updatedUser.profilePic = reader.result;
            
            // איך אדמין יודע באיזה משתמש מדובר
            users[index] = updatedUser;

            localStorage.setItem("users", JSON.stringify(users));

            if (editingAdminUser === null) {

                sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));

                if (typeof loadProfile === "function") {
                    loadProfile();
                }
            }

            else {

                if (typeof loadUsers === "function") {
                    loadUsers();
                }
            }
            modal.style.display = "none";
        };
        reader.readAsDataURL(image);
    }

    else {
        users[index] = updatedUser;

        localStorage.setItem("users", JSON.stringify(users));

        if (editingAdminUser === null) {

            sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));

            if (typeof loadProfile === "function") {
                loadProfile();
            }
        }

        else {

            if (typeof loadUsers === "function") {
                loadUsers();
            }
        }
        modal.style.display = "none";
    }
}