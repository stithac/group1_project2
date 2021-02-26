$(document).ready(() => {
    // Getting references to our form and input
    const genDonationForm = $("form.genDonation");
    const firstNameInput = $("input#first-name");
    const lastNameInput = $("input#last-name");
    const streetInput = $("input#street");
    const cityInput = $("input#city");
    const stateInput = $("input#state");
    const zipInput = $("input#zip");
    const phoneInput = $("input#phone");
    const genDonationInput = $("input#genDonation");
    const emailInput = $("input#email");
    var savedEmail;
    var savedID;

    genDonationForm.on("submit", event => {
        event.preventDefault();
        const donationData = {
            firstName: firstNameInput.val().trim(),
            lastName: lastNameInput.val().trim(),
            street: streetInput.val().trim(),
            city: cityInput.val().trim(),
            state: stateInput.val().trim(),
            zip: zipInput.val().trim(),
            phone: phoneInput.val().trim(),
            genDonation: genDonationInput.val().trim(),
            email: emailInput.val().trim(),
        };

        genDonate(donationData.firstName, donationData.lastName, donationData.street, donationData.city, donationData.state,
            donationData.zip, donationData.phone, donationData.genDonation, donationData.email);
        firstNameInput.val("");
        lastNameInput.val("");
        streetInput.val("");
        cityInput.val("");
        stateInput.val("");
        zipInput.val("");
        phoneInput.val("");
        genDonationInput.val("");
        emailInput.val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function genDonate(firstName, lastName, street, city, state, zip, phone, genDonation, email) {
        //        savedEmail = data.email;
        //        savedID = data.id;
        console.log(firstName, lastName, email, street, city, state, zip, phone, genDonation);
        $.post("/api/generalDonation", {
                email: email,
                firstName: firstName,
                lastName: lastName,
                street: street,
                city: city,
                state: state,
                zip: zip,
                phone: phone,
            })
            .then((data) => {
                console.log("did I return successfully from api/generalDonation");
                //                window.location.replace("/members");
                // If there's an error, handle it by throwing up a bootstrap alert


                console.log("genDonation =" + parseInt(genDonation));
                $.post("/api/saveDonation", {
                        donationAmount: genDonation,
                    })
                    .then(() => {
                        //              console.log(data);
                        console.log("successful return api/saveDonation");
                    })
                    .catch(err => {
                        console.log(err);
                    })

            })
            .catch(err => {
                console.log("in error from generalDonation");
                console.log(err);
            })

    }


});