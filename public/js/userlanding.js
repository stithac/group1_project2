var saveName;
var saveId;

$.get("/api/user_data")
    .then((data) => {
        saveId = data.id;
        console.log("data.id = " + data.id);
        $.get("/api/userExists")
            .then((result) => {

                for (i = 0; i < result.length; i++) {
                    console.log("person id = " + result[i].id);
                    if (result[i].id === saveId) {
                        saveName = result[i].firstName + " " + result[i].lastName;
                    }
                }
                console.log("saved Name = " + saveName);
                $("#storeName").text(saveName);
                $("#storeName").attr("style", "font-weight: bold");
            });
    })

// Event listener for volunteer button
$("#volunteer").on("click", event => {
    event.preventDefault();
    console.log('inside click volunteer');
    window.location.replace("/pet");

})

// Event listener for donate button
$("#donate").on("click", event => {
    event.preventDefault();
    console.log('inside click donate');
    window.location.replace("/pet");

})

// Event listener for donate button
$("#updateUserRegistration").on("click", event => {
    event.preventDefault();
    console.log('inside click update');
})

// Event listener for donate button
$("#deleteAccount").on("click", event => {
    event.preventDefault();
    console.log('inside click delete');
    console.log('saved id = ' + saveId);
    $.post("/api/deleteAccount", {
            id: saveId,
        })
        .then(() => {
            console.log("success return from api/deleteAccount");
            //                window.location.replace("/members");
            // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch((err) => console.error(err))
})