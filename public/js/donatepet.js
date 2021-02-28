$(document).ready(() => {
    // Getting references to our form and inputs
    const donateForm = $("form.donate");
    const amountRequestedInput = $("input#amountRequested");
    const amountRaisedInput = $("input#amountRaised");
    const donationInput = $("input#donation");
    const cardNumberInput = $("input#cardNumber");
    const securityCodeInput = $("input#securityCode");
    const nameOnCardInput = $("input#nameOnCard");
    const expirationDateInput = $("input#expirationDate");
    const cardTypeInput = $("input#cardType");

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
            donation: donationInput.val().trim(),
            cardNumber: cardNumberInput.val().trim(),
            securityCode: securityCodeInput.val().trim(),
            nameOnCard: nameOnCardInput.val().trim(),
            expirationDate: expirationDateInput.val(),
            cardType: cardTypeInput.val().trim()            
        };

        if (!donateData.donation) {
            return;
        }
        console.log('donation = ' + donateData.donation);
        updatingRaised = updatingRaised + parseInt(donateData.donation);
        console.log("updatingraised = " + updatingRaised);
        console.log(donateData.expirationDate);
        donateData.expirationDate = calcDay(donateData.expirationDate);
        console.log("transformed date = " + donateData.expirationDate);
        // If we have a donation amount we run the userDonation function and clear the form
        donationInput.val("");
        cardNumberInput.val("");
        securityCodeInput.val("");
        nameOnCardInput.val("");
        expirationDateInput.val("");
        cardTypeInput.val("");
        userDonation(donateData.donation, updatingRaised, donateData.cardNumber, donateData.securityCode, donateData.nameOnCard, donateData.expirationDate, donateData.cardType);

    })

    function calcDay(expirationDate) {
        var date = expirationDate;
        var tempArray = date.split("-");
        var day = parseInt(tempArray[1]);
        var numToAdd;
        
        switch(day)
        {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12: 
                numToAdd = 31;
                break;
            case 2:
                numToAdd = 28;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                numToAdd = 30;
                break;
        }

        date = tempArray[1] + "/" + numToAdd + "/" + tempArray[0];
        return date;
    }

    // userDonation does a post to our "api/donatePet" route and if successful, redirects us the the user landing page

    function userDonation(donation, updatingRaised, cardNumber, securityCode, nameOnCard, expirationDate, cardType) {
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
                localStorage.setItem("RegistrationId", data.id);
                $.post("/api/donatePet", {
                        registrationId: data.id,
                        donationAmount: donation,
                        petId: 2
                    })
                    .then((data) => {
                        console.log("success from donate pet");
                        $.post("/api/updateRaisedAmount", {
                                registrationId: localStorage.getItem("RegistrationId"),
//                                registrationId: data.id,
                                raisedAmount: updatingRaised,
                                petId: 2
                            })
                            .then(() => {
                                console.log("success from updating raised amount");
                                window.location.replace('/donatepet');
                            })
                            .catch(err => {
                                console.log(err);
                            })
                        $.post("/api/saveCreditCard", {
                            cardNumber: cardNumber,
                            securityCode: securityCode,
                            nameOnCard: nameOnCard,
                            expirationDate: expirationDate,
                            cardType: cardType,
                            RegistrationId: localStorage.getItem("RegistrationId"),
                        })
                        .then(() => {
                            console.log("success from update credit card");

                        })
                        .catch(err => {
                            console.log("in error from update credit card");
                            console.log(err);
                        })
                        console.log("success return from api/donatePet");
                        window.location.replace("/userLanding");
                        // If there's an error, handle it by throwing up a bootstrap alert
                    })
                    .catch(err => {
                        console.log("in error from donate pet")
                        console.log(err);
                    });
            })
    }
});