
// --------------------------- משתנים ---------------------------

const questionForm = document.getElementById("ask-question-form");

const titleInput = document.getElementById("question-title");
const titleError = document.getElementById("question-title-error");

const successModal = document.getElementById("success-modal");
const closeSuccess = document.getElementById("close-success");


// --------------------------- שליחת שאלה ---------------------------

questionForm.addEventListener("submit", function(event){

    event.preventDefault();

    const title = titleInput.value.trim();

    titleError.textContent = "";
    titleInput.classList.remove("invalid", "valid");


    // בדיקת חובה ואורך
    if (title === "" || title.length < 10)
    {
        titleError.textContent = "Title is required and must be between 10 to 80 characters.";
        titleInput.classList.add("invalid");
        return;
    }

    if (title.length > 80)
    {
        titleError.textContent = "Title is too long. It must be between 10 to 80 characters.";
        titleInput.classList.add("invalid");
        return;
    }


    // אם תקין
    titleInput.classList.add("valid");

    successModal.style.display = "flex";

});


// --------------------------- ניקוי שגיאה בזמן הקלדה ---------------------------

titleInput.addEventListener("input", function(){

    const title = titleInput.value.trim();


    // אם הייתה שגיאה והמשתמש התחיל לתקן
    if(title.length >= 10 && title.length <= 80)
    {
        titleError.textContent = "";
        titleInput.classList.remove("invalid");
        titleInput.classList.add("valid");
    }

    else if (title.length < 10)
    {
        titleInput.classList.remove("valid");
        titleError.textContent = "Title is required and must be between 10 to 80 characters.";
        titleInput.classList.add("invalid");
        return;
    }

    else if (title.length > 80)
    {
        titleInput.classList.remove("valid");
        titleError.textContent = "Title is too long. It must be between 10 to 80 characters.";
        titleInput.classList.add("invalid");
        return;
    }
});


// --------------------------- סגירת הודעת הצלחה ---------------------------

closeSuccess.addEventListener("click", function(){

    successModal.style.display = "none";

    questionForm.reset();

    titleInput.classList.remove("valid");
});