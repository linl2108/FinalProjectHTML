
// --------------------------- פתיחת החלון ---------------------------

const editBtn = document.getElementById("edit-profile-btn");
const modal = document.getElementById("edit-profile-modal");

function fillForm(){

    const user = JSON.parse(localStorage.getItem("currentUser"));

    document.getElementById("edit-username").value = user.username;

    document.getElementById("edit-mail").value = user.mail;

    document.getElementById("edit-password").value = user.password;

    document.getElementById("edit-confirm-password").value = user.password;

    document.getElementById("edit-fname").value = user.fname;

    document.getElementById("edit-lname").value = user.lname;

    document.getElementById("edit-bday").value = user.bday;

    document.getElementById("edit-city").value = user.city;

    document.getElementById("edit-street").value = user.street;

    document.getElementById("edit-street-no").value = user.streetNo;

}


const closeBtn = document.getElementById("close-modal");
const cancelBtn = document.getElementById("cancel-edit");

editBtn.addEventListener("click", function () {

    fillForm();

    modal.style.display = "flex";

});


// --------------------------- סגירת החלון ---------------------------

closeBtn.addEventListener("click", function () {

    modal.style.display = "none";

});

cancelBtn.addEventListener("click", function () {

    modal.style.display = "none";

});


// --------------------------- סגירה בלחיצה על הרקע ---------------------------

window.addEventListener("click", function (event) {

    if (event.target === modal)
    {
        modal.style.display = "none";
    }

});


// --------------------------- מעבר בין השלבים ---------------------------

const accountTab = document.getElementById("account-tab");
const personalTab = document.getElementById("personal-tab");

const accountSection = document.getElementById("account-section");
const personalSection = document.getElementById("personal-section");


accountTab.addEventListener("click", function () {

    accountSection.style.display = "block";
    personalSection.style.display = "none";

    accountTab.classList.add("active-tab");
    personalTab.classList.remove("active-tab");

});


personalTab.addEventListener("click", function () {

    accountSection.style.display = "none";
    personalSection.style.display = "block";

    personalTab.classList.add("active-tab");
    accountTab.classList.remove("active-tab");

});

const saveBtn = document.getElementById("save-edit");

saveBtn.addEventListener("click", function(){

    const user = JSON.parse(localStorage.getItem("currentUser"));

    user.username = document.getElementById("edit-username").value;

    user.mail = document.getElementById("edit-mail").value;

    user.password = document.getElementById("edit-password").value;

    user.fname = document.getElementById("edit-fname").value;

    user.lname = document.getElementById("edit-lname").value;

    user.bday = document.getElementById("edit-bday").value;

    user.city = document.getElementById("edit-city").value;

    user.street = document.getElementById("edit-street").value;

    user.streetNo = document.getElementById("edit-street-no").value;

    localStorage.setItem("currentUser", JSON.stringify(user));

});


saveBtn.addEventListener("click", function () {

    updateUser();

});


function updateUser() {

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const updatedUser = {

        ...currentUser,

        username: document.getElementById("edit-username").value,
        mail: document.getElementById("edit-mail").value,
        password: document.getElementById("edit-password").value,
        fname: document.getElementById("edit-fname").value,
        lname: document.getElementById("edit-lname").value,
        bday: document.getElementById("edit-bday").value,
        city: document.getElementById("edit-city").value,
        street: document.getElementById("edit-street").value,
        streetNo: document.getElementById("edit-street-no").value

    };

    // אם המשתמש בחר תמונה חדשה
    const image = document.getElementById("edit-profile-pic").files[0];

    if (image)
    {
        updatedUser.profilePic = image.name;
    }

    const index = users.findIndex(function(user){

        return user.username === currentUser.username;

    });

    users[index] = updatedUser;

    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    loadProfile();

    modal.style.display = "none";

}