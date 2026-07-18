// --------------------------- בדיקת מנהל ---------------------------

if (sessionStorage.getItem("isAdmin") !== "true")
{
    window.location.href = "login.html";
}


// --------------------------- טעינת משתמשים ---------------------------

loadUsers();

function loadUsers()
{

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const tbody = document.getElementById("users-body");

    tbody.innerHTML = "";

    users.forEach(function(user, index){

        tbody.innerHTML += `

        <tr>

            <td>
                <img src="${user.profilePic}" width="60">
            </td>

            <td>${user.username}</td>

            <td>${user.fname}</td>

            <td>${user.lname}</td>

            <td>${user.mail}</td>

            <td>${user.bday}</td>

            <td>${user.city}</td>

            <td>${user.street}</td>

            <td>${user.streetNo}</td>

            <td>

                <button onclick="deleteUser(${index})">
                    Delete
                </button>

                <button onclick="editUser(${index})">
                    Edit
                </button>

            </td>

        </tr>

        `;

    });

}


// --------------------------- מחיקה ---------------------------

function deleteUser(index)
{

}


// --------------------------- עריכה ---------------------------

function editUser(index)
{

}