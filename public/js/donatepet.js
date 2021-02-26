$(document).ready(() => {
    // Getting references to our form and inputs
    const donateForm = $("form.donat");
    const amountRequestedInput = $("input#amountRequested");
    const amountRaisedInput = $("input#amountRaised");
    const donationInput = $("input#donation");

    // When the form is submitted, we validate there's an email and password entered
    donateForm.on("submit", event => {
        event.preventDefault();
        const donateData = {
            donation: donationInput.val().trim()
        };

        if (!donatData.donation) {
            return;
        }

        // If we have a donation amount we run the userDonation function and clear the form
        userDonation(donateData.donation);
        donationInput.val("");
    })

    // userDonation does a post to our "api/donatePet" route and if successful, redirects us the the members page

    function userDonation(donation) {
        fetch('/api/user_data', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(donation);
                $.post("/api/donatePet", {
                        registrationId: data.id,
                        donationAmount: donation
                    })
                    .then(() => {
                        console.log("did I return successfully from api/registePet");
                        window.location.replace("/members");
                        // If there's an error, handle it by throwing up a bootstrap alert
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
    }

});