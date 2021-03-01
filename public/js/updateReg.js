$(document).ready(() => {
    // Getting references to our form and input
    // user fields
/*     const origfirstNameInput = $("input#origfirst-name");
    const origlastNameInput = $("input#origlast-name");
    const origstreetInput = $("input#origstreet");
    const origcityInput = $("input#origcity");
    const origzipInput = $("input#origzip");
    const origphoneInput = $("input#origphone");
    const origsecurityQuestionInput = $("input#origsecurityQuestion");
    const origsecurityAnswerInput = $("input#origsecurityAnswer"); */
    const updateForm = $("form.update");
    const emailInput = $("input#email");
    const firstNameInput = $("input#first-name");
    const lastNameInput = $("input#last-name");
    const streetInput = $("input#street");
    const cityInput = $("input#city");
    const stateInput = $("select#state");
    const zipInput = $("input#zip");
    const phoneInput = $("input#phone");
    const securityQuestionInput = $("input#securityQuestion");
    const securityAnswerInput = $("input#securityAnswer");
    var savedID;

    /******************************************************************/
    // first, retrieve the id of who is logged in
    $.get("/api/user_data", (data) => {
            console.log("trying this");
            console.log(data);
        })
        .then((data) => {
            console.log(data);
            console.log(data.id);
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
                    console.log("data");
                    console.log(results);
                    console.log("did I return successfully from api/getUserInfo");
                    // set all the original info fields from registration table data returned
                    $(firstNameInput).val(results.firstName);
                    $(lastNameInput).val(results.lastName);
                    $(emailInput).val(results.email);
                    $(streetInput).val(results.street);
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

//                    window.location.replace("/userLanding");
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
            email: emailInput.val().trim(),
            city: cityInput.val().trim(),
            state: $("select#state :selected").text(),
            zip: zipInput.val().trim(),
            phone: phoneInput.val().trim(),
            securityQuestion: securityQuestionInput.val().trim(),
            securityAnswer: securityAnswerInput.val().trim(),
        };

        // if user did not update all fields, take the original data retrieved from table and use it in 
        // variable to write back out to Registration table.   This prevents blank fields in the database
        // and keeps user from having to enter every field on form 
/*         if (regData.firstName === "") {
            regData.firstName = origfirstNameInput.val();
        }
        if (regData.lastName === "") {
            regData.lastName = origlastNameInput.val();
        }
        if (regData.street === "") {
            regData.street = origstreetInput.val();
        }
        if (regData.city === "") {
            regData.city = origcityInput.val();
        } */
        // deteremine which option value to use
/*         if ($("select#state :selected").val() === "") {
            var options = document.getElementById('origstate').options;
            var newoptions = document.getElementById('state').options;
            for (var i = 0; i < options.length; i++) {
                if (options[i].selected === true) {
                    newoptions[i].selected = true;
                    break;
                }
            }
            regData.state = $("select#origstate :selected").text();
        }
        if (regData.zip === "") {
            regData.zip = origzipInput.val();
        }
        if (regData.phone === "") {
            regData.phone = origphoneInput.val();
        }
        if (regData.securityQuestion === "") {
            regData.securityQuestion = origsecurityQuestionInput.val();
        }
        if (regData.securityAnswer === "") {
            regData.securityAnswer = origsecurityAnswerInput.val();
        }
 */
        // Lastly make call to updateUser function to actually write out the data
        updateUser(regData.firstName, regData.lastName, regData.email, regData.street, regData.city, regData.state,
            regData.zip, regData.phone, regData.securityQuestion, regData.securityAnswer);
        firstNameInput.val("");
        lastNameInput.val("");
        emailInput.val("");
        streetInput.val("");
        cityInput.val("");
        stateInput.val("");
        zipInput.val("");
        phoneInput.val("");
        securityQuestionInput.val("");
        securityAnswerInput.val("");
    });

    // Does a post to the updateUserReg route. If successful, we are redirected to the userLanding page
    // Otherwise we log any errors
    function updateUser(firstName, lastName, email, street, city, state, zip, phone, question, answer) {
        fetch('/api/user_data', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                savedEmail = data.email;
                savedID = data.id;
                console.log(firstName, lastName, email, street, city, state, zip, phone, question, answer);
                $.post("/api/updateUserReg", {
                        id: data.id,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        street: street,
                        city: city,
                        state: state,
                        zip: zip,
                        phone: phone,
                        question: question,
                        answer: answer,
                    })
                    .then(() => {
                        console.log("did I return successfully from api/updateUserReg");
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