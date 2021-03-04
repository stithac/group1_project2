// variables
var saveName;
var saveId;

// initially need to retrieve who is logged in to get the user id
$.get("/api/user_data")
    .then((data) => {
        saveId = data.id;
        // check if user actually exists in registration table
        $.get("/api/userExists")
            .then((result) => {
                // compare the logged in id against each entry returned to find the particular user's info
                for (i = 0; i < result.length; i++) {
                    if (result[i].id === saveId) {
                        // save off the user name
                        saveName = result[i].firstName + " " + result[i].lastName;
                    }
                }
                //display user name on page
                $("#storeName").text(saveName);
                $("#storeName").attr("style", "font-weight: bold");
            });
    })

// Event listener for volunteer button
$("#volunteer").on("click", event => {
    event.preventDefault();
    window.location.replace("/pet");
})

// Event listener for donate button
$("#donate").on("click", event => {
    event.preventDefault();
    window.location.replace("/pet");
})

// Event listener for update registration button
$("#updateUserRegistration").on("click", event => {
    event.preventDefault();
    // upon clicking the update registration button redirect html page to the update user registration page
    window.location.replace("./updateReg");
})

// Event listener for delete credit card button
$("#deleteCreditCard").on("click", event => {
    event.preventDefault();
    // make call to delete the user account based upon saved ID
    $.post("/api/deleteCreditCard", {
            id: saveId,
        })
        .then(() => {
            //display info that credit card was deleted
            $("#creditCardDeleted").text("Thank You - your credit card(s) have been deleted!");
            $("#creditCardDeleted").attr("font-weight: bold");
            $("#creditCardDeleted").removeClass("hide");
            // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch((err) => console.error(err))
})