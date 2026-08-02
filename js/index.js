
// --------------------------- בדיקת התחברות לפני צפייה בשאלה ---------------------------
const readMoreButtons = document.querySelectorAll(".btn");

// מעבר על כל הכפתורים
readMoreButtons.forEach(function(button) {

    button.addEventListener("click", function(event) {

        event.preventDefault(); // מונע מעבר לברירת המחדל של #

        // בדיקה האם קיים משתמש מחובר
        const currentUser = sessionStorage.getItem("currentUser");
        const isAdmin = sessionStorage.getItem("isAdmin");

        // אם אין משתמש מחובר כלל וגם לא מנהל
        if (!currentUser && isAdmin !== "true") {

            window.location.href = "login.html"; // בעצם מפנה משתמש לא מחובר לדף לוגין
        }

        else {
            // פה בעתיד אמור להיות מעבר לדף השאלה המלאה - עוד לא עשיתי כי זה מערכת שלמה
            // כרגע זה רק להמחשה של איך משתמש לא מחובר יועבר ללוגין אם ירצה לצפות בתוכן האתר
            console.log("User can view question");
        }
    });
});