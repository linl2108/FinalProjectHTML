// --------------------------- בדיקת מנהל ---------------------------

if (sessionStorage.getItem("isAdmin") !== "true")
{
    window.location.href = "login.html";
}
document.getElementById("username").dispatchEvent(new Event("input"));


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

    sessionStorage.setItem("editingAdminUser", index);

    const user = users[index];

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

    editModal.style.display = "flex";

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


/*// --------------------------- שמירת עריכה ---------------------------

document.getElementById("save-edit").addEventListener("click",function(){

    const user = users[selectedUserIndex];

    user.username = document.getElementById("username").value;

    user.mail = document.getElementById("mail").value;

    user.password = document.getElementById("password").value;

    user.fname = document.getElementById("fname").value;

    user.lname = document.getElementById("lname").value;

    user.bday = document.getElementById("bday").value;

    user.city = document.getElementById("city").value;

    user.street = document.getElementById("street").value;

    user.streetNo = document.getElementById("street-no").value;

    const image = document.getElementById("profile-pic").files[0];

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

});*/


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