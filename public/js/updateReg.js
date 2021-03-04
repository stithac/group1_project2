$(document).ready(() => {
    // Getting references to our form and input
    // user fields
    const updateForm = $("form.update");
    const emailInput = $("input#email");
    const firstNameInput = $("input#first-name");
    const lastNameInput = $("input#last-name");
    const streetInput = $("input#street");
    const street2Input = $("input#aptSuite");
    const cityInput = $("input#city");
    const stateInput = $("select#state");
    const zipInput = $("input#zip");
    const phoneInput = $("input#phone");
    const securityQuestionInput = $("input#securityQuestion");
    const securityAnswerInput = $("input#securityAnswer");
    var savedID;

    /******************************************************************/
    // first, retrieve the id of who is logged in
    $.get("/api/user_data", (data) => {})
        .then((data) => {
            savedID = data.id;
            // next, retrieve the user info based upon who is logged in
            fetch(`/getUserInfo/${savedID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => response.json())
                .then((results) => {
                    // set all the original info fields from registration table data returned
                    $(firstNameInput).val(results.firstName);
                    $(lastNameInput).val(results.lastName);
                    $(emailInput).val(results.email);
                    $(streetInput).val(results.street);
                    $(street2Input).val(results.street2);
                    $(cityInput).val(results.city);
                    // to populate the correct state in option list need to first find correct option
                    var options = document.getElementById('state').options;
                    for (var i = 0; i < options.length; i++) {
                        if (options[i].value === results.state) {
                            options[i].selected = true;
                            break;
                        }
                    };
                    $(zipInput).val(results.zip);
                    $(phoneInput).val(results.phone);
                    $(securityQuestionInput).val(results.securityQuestion);
                    $(securityAnswerInput).val(results.securityAnswer);
                    // If there's an error, handle it by throwing up a bootstrap alert
                })
                .catch(err => {
                    console.log(err);
                });
        })

    // upon form submit, write updated data to Registration table
    updateForm.on("submit", event => {
        event.preventDefault();

        // save all data in updated fields to object
        const regData = {
            firstName: firstNameInput.val().trim(),
            lastName: lastNameInput.val().trim(),
            street: streetInput.val().trim(),
            street2: street2Input.val().trim(),
            email: emailInput.val().trim(),
            city: cityInput.val().trim(),
            state: $("select#state :selected").text(),
            zip: zipInput.val().trim(),
            phone: phoneInput.val().trim(),
            securityQuestion: securityQuestionInput.val().trim(),
            securityAnswer: securityAnswerInput.val().trim(),
        };

        // Lastly make call to updateUser function to actually write out the data
        updateUser(regData.firstName, regData.lastName, regData.email, regData.street, regData.street2, regData.city, regData.state,
            regData.zip, regData.phone, regData.securityQuestion, regData.securityAnswer);
        firstNameInput.val("");
        lastNameInput.val("");
        emailInput.val("");
        streetInput.val("");
        street2Input.val("");
        cityInput.val("");
        stateInput.val("");
        zipInput.val("");
        phoneInput.val("");
        securityQuestionInput.val("");
        securityAnswerInput.val("");
    });

    // Does a post to the updateUserReg route. If successful, we are redirected to the userLanding page
    // Otherwise we log any errors
    function updateUser(firstName, lastName, email, street, street2, city, state, zip, phone, question, answer) {
        fetch('/api/user_data', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((data) => {
                savedEmail = data.email;
                savedID = data.id;
                $.post("/api/updateUserReg", {
                        id: data.id,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        street: street,
                        street2: street2,
                        city: city,
                        state: state,
                        zip: zip,
                        phone: phone,
                        question: question,
                        answer: answer,
                    })
                    .then(() => {
                        window.location.replace("/userLanding");
                        // If there's an error, handle it by throwing up a bootstrap alert
                    })
                    .catch(handleLoginErr);
            })
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
})