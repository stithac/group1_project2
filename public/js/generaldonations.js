$(document).ready(() => {
    // Getting references to our form and input
    const genDonationForm = $("form.genDonation");
    const firstNameInput = $("input#first-name");
    const lastNameInput = $("input#last-name");
    const streetInput = $("input#street");
    const cityInput = $("input#city");
    const stateInput = $("select#state");
    const zipInput = $("input#zip");
    const phoneInput = $("input#phone");
    const genDonationInput = $("input#genDonation");
    const emailInput = $("input#email");
    const cardNumberInput = $("input#cardNumber");
    const securityCodeInput = $("input#securityCode");
    const nameOnCardInput = $("input#nameOnCard");
    const expirationDateInput = $("input#expirationDate");
    const cardTypeInput = $("input#cardType");

    genDonationForm.on("submit", event => {
        event.preventDefault();

        const donationData = {
            firstName: firstNameInput.val().trim(),
            lastName: lastNameInput.val().trim(),
            street: streetInput.val().trim(),
            city: cityInput.val().trim(),
            state: $("select#state :selected").text(),
            zip: zipInput.val().trim(),
            phone: phoneInput.val().trim(),
            genDonation: genDonationInput.val().trim(),
            email: emailInput.val().trim(),
            cardNumber: cardNumberInput.val().trim(),
            securityCode: securityCodeInput.val().trim(),
            nameOnCard: nameOnCardInput.val().trim(),
            expirationDate: expirationDateInput.val(),
            cardType: cardTypeInput.val().trim()
        };
        console.log(donationData.expirationDate);
        donationData.expirationDate = calcDay(donationData.expirationDate);
        console.log("transformed date = " + donationData.expirationDate);
        genDonate(donationData.firstName, donationData.lastName, donationData.street, donationData.city, donationData.state,
            donationData.zip, donationData.phone, donationData.genDonation, donationData.email, donationData.cardNumber, donationData.securityCode, donationData.nameOnCard, donationData.expirationDate, donationData.cardType);
        firstNameInput.val("");
        lastNameInput.val("");
        streetInput.val("");
        cityInput.val("");
        stateInput.val("");
        zipInput.val("");
        phoneInput.val("");
        genDonationInput.val("");
        emailInput.val("");
        cardNumberInput.val("");
        securityCodeInput.val("");
        nameOnCardInput.val("");
        expirationDateInput.val("");
        cardTypeInput.val("");
    });

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

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function genDonate(firstName, lastName, street, city, state, zip, phone, genDonation, email, cardNumber, securityCode, nameOnCard, expirationDate, cardType) {
        //        savedEmail = data.email;
        //        savedID = data.id;
        console.log(firstName, lastName, email, street, city, state, zip, phone, genDonation, cardNumber, securityCode, nameOnCard, expirationDate, cardType);
        $.post("/api/generalDonation", {
                email: email,
                firstName: firstName,
                lastName: lastName,
                street: street,
                city: city,
                state: state,
                zip: zip,
                phone: phone,
                cardNumber: cardNumber,
                securityCode: securityCode,
                nameOnCard: nameOnCard,
                expirationDate: expirationDate,
                cardType: cardType,
                donationAmount: genDonation,
            })
            .then((data) => {
                console.log("did I return successfully from api/generalDonation");
                //                window.location.replace("/members");
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(err => {
                console.log("in error from generalDonation");
                console.log(err);
            })
    }
});