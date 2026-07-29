
function setupPasswordToggle(passwordId, eyeOpenId, eyeClosedId) {

    const passwordInput = document.getElementById(passwordId);
    const eyeOpen = document.getElementById(eyeOpenId);
    const eyeClosed = document.getElementById(eyeClosedId);


    // אם אין את האלמנטים בדף - לא עושים כלום
    if (!passwordInput || !eyeOpen || !eyeClosed) {
        return;
    }


    // כשהמשתמש מתחיל להקליד
    passwordInput.addEventListener("input", function () {


        if (passwordInput.value.length > 0) {

            eyeClosed.style.display = "block";

        }

        else {

            eyeClosed.style.display = "none";
            eyeOpen.style.display = "none";

            passwordInput.type = "password";

        }

    });



    // לחיצה על עין חצויה
    eyeClosed.addEventListener("click", function () {


        passwordInput.type = "text";


        eyeClosed.style.display = "none";
        eyeOpen.style.display = "block";


    });



    // לחיצה על עין פתוחה
    eyeOpen.addEventListener("click", function () {


        passwordInput.type = "password";


        eyeOpen.style.display = "none";
        eyeClosed.style.display = "block";


    });

}

/*const passwordInput = document.getElementById("password");

const eyeOpen = document.getElementById("eye-open");
const eyeClosed = document.getElementById("eye-closed");


// כשהמשתמש מקליד - להציג את העין
passwordInput.addEventListener("input", function(){

    if(passwordInput.value.length > 0){

        eyeClosed.style.display = "block";

    }

    else {

        eyeClosed.style.display = "none";
        eyeOpen.style.display = "none";

        passwordInput.type = "password";

    }

});


// לחיצה על העין
eyeClosed.addEventListener("click", function(){

    passwordInput.type = "text";

    eyeClosed.style.display = "none";
    eyeOpen.style.display = "block";

});


// לחיצה על העין הפתוחה
eyeOpen.addEventListener("click", function(){

    passwordInput.type = "password";

    eyeOpen.style.display = "none";
    eyeClosed.style.display = "block";

});*/