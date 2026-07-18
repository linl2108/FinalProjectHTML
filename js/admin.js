// --------------------------- בדיקת מנהל ---------------------------

if (sessionStorage.getItem("isAdmin") !== "true")
{
    window.location.href = "login.html";
}


// --------------------------- משתנים ---------------------------

let users = JSON.parse(localStorage.getItem("users")) || [];

let selectedUserIndex = -1;

let deleteUserIndex = -1;

const editModal = document.getElementById("edit-profile-modal");

const deleteModal = document.getElementById("delete-modal");


// --------------------------- טעינת משתמשים ---------------------------

loadUsers();

function loadUsers()
{

    users = JSON.parse(localStorage.getItem("users")) || [];

    const tbody = document.getElementById("users-body");

    tbody.innerHTML = "";

    users.forEach(function(user,index){

        tbody.innerHTML += `

        <tr>

            <td>
                <img class="admin-profile-pic" src="${user.profilePic}">
            </td>

            <td>${user.username}</td>

            <td>${user.fname} ${user.lname}</td>

            <td>${user.mail}</td>

            <td>${user.bday}</td>

            <td>${user.street} ${user.streetNo}, ${user.city}</td>

            <td class="actions">

                <button
                    class="action-btn edit-btn"
                    onclick="editUser(${index})">
                    ✏️
                </button>

                <button
                    class="action-btn delete-btn"
                    onclick="deleteUser(${index})">
                    🗑️
                </button>

            </td>

        </tr>

        `;

    });

}


// --------------------------- פתיחת עריכת משתמש ---------------------------

function editUser(index)
{

    selectedUserIndex = index;

    const user = users[index];

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

    editModal.style.display = "flex";

}


// --------------------------- שמירת עריכה ---------------------------

document.getElementById("save-edit").addEventListener("click",function(){

    const user = users[selectedUserIndex];

    user.username = document.getElementById("edit-username").value;

    user.mail = document.getElementById("edit-mail").value;

    user.password = document.getElementById("edit-password").value;

    user.fname = document.getElementById("edit-fname").value;

    user.lname = document.getElementById("edit-lname").value;

    user.bday = document.getElementById("edit-bday").value;

    user.city = document.getElementById("edit-city").value;

    user.street = document.getElementById("edit-street").value;

    user.streetNo = document.getElementById("edit-street-no").value;

    const image = document.getElementById("edit-profile-pic").files[0];

    if(image)
    {

        const reader = new FileReader();

        reader.onload = function(){

            user.profilePic = reader.result;

            localStorage.setItem("users",JSON.stringify(users));

            editModal.style.display = "none";

            loadUsers();

        };

        reader.readAsDataURL(image);

    }
    else
    {

        localStorage.setItem("users",JSON.stringify(users));

        editModal.style.display = "none";

        loadUsers();

    }

});


// --------------------------- פתיחת חלון מחיקה ---------------------------

function deleteUser(index)
{

    deleteUserIndex = index;

    deleteModal.style.display = "flex";

}


// --------------------------- אישור מחיקה ---------------------------

document.getElementById("confirm-delete").addEventListener("click",function(){

    users.splice(deleteUserIndex,1);

    localStorage.setItem("users",JSON.stringify(users));

    deleteModal.style.display = "none";

    loadUsers();

});


// --------------------------- ביטול מחיקה ---------------------------

document.getElementById("cancel-delete").addEventListener("click",function(){

    deleteModal.style.display = "none";

});


// --------------------------- סגירת חלון עריכה ---------------------------

document.getElementById("close-modal").addEventListener("click",function(){

    editModal.style.display = "none";

});

document.getElementById("cancel-edit").addEventListener("click",function(){

    editModal.style.display = "none";

});


// --------------------------- מעבר בין השלבים ---------------------------

const accountTab = document.getElementById("account-tab");

const personalTab = document.getElementById("personal-tab");

const accountSection = document.getElementById("account-section");

const personalSection = document.getElementById("personal-section");

accountTab.addEventListener("click",function(){

    accountSection.style.display = "block";

    personalSection.style.display = "none";

    accountTab.classList.add("active-tab");

    personalTab.classList.remove("active-tab");

});

personalTab.addEventListener("click",function(){

    accountSection.style.display = "none";

    personalSection.style.display = "block";

    personalTab.classList.add("active-tab");

    accountTab.classList.remove("active-tab");

});