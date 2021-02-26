$(document).ready(() => {
    // Getting references to our form and inputs
    const donateForm = $("form.donate");
    const amountRequestedInput = $("input#amountRequested");
    const amountRaisedInput = $("input#amountRaised");
    const donationInput = $("input#donation");

    var updatingRaised = 0;

    $.get("/api/user_data", (data) => {
            console.log("trying this");
            console.log(data);
        })
        .then((data) => {
            console.log(data);
            console.log(data.id);
            $.get("api/getPetInfo", (req, res) => {
                    //             RegistrationId: data.id
                })
                .then((data) => {
                    console.log(data);
                    console.log("did I return successfully from api/getPetInfo");
                    updatingRaised = updatingRaised + parseInt(data.raisedAmount);
                    console.log("first updating raised = " + updatingRaised);
                    $(amountRequestedInput).val(data.requestAmount);
                    $(amountRaisedInput).val(data.raisedAmount);
                    //                window.location.replace("/members");
                    // If there's an error, handle it by throwing up a bootstrap alert
                })
                .catch(err => {
                    console.log(err);
                });
        })

    // When the form is submitted, 
    donateForm.on("submit", event => {
        event.preventDefault();
        console.log("in donatePet button listener")
        const donateData = {
            donation: donationInput.val().trim()
        };

        if (!donateData.donation) {
            return;
        }
        console.log('donation = ' + donateData.donation);
        updatingRaised = updatingRaised + parseInt(donateData.donation);
        console.log("updatingraised = " + updatingRaised);
        // If we have a donation amount we run the userDonation function and clear the form
        userDonation(donateData.donation, updatingRaised);
        donationInput.val("");
    })

    // userDonation does a post to our "api/donatePet" route and if successful, redirects us the the members page

    function userDonation(donation, updatingRaised) {
        console.log("getting user data");
        fetch('/api/user_data', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(donation);
                console.log(data);
                console.log(data.id);
                console.log('updating raised amount 2 = ' + updatingRaised);
                $.post("/api/donatePet", {
                        registrationId: data.id,
                        donationAmount: donation
                    })
                    .then((data) => {

                        console.log("succes return from api/registerPet");
                        //                        window.location.replace("/members");
                        // If there's an error, handle it by throwing up a bootstrap alert
                    })
                    .catch(err => {
                        console.log("in error from donate pet")
                        console.log(err);
                    });
                console.log("success from donate pet");
                $.post("/api/updateRaisedAmount", {
                        registrationId: data.id,
                        raisedAmount: updatingRaised,
                    })
                    .then(() => {
                        console.log("success from updating raised amount");
                        window.location.replace('/donatepet');
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })

    }

});