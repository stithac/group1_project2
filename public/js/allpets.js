// Wait for the DOM to completely load before we run our JS
document.addEventListener('DOMContentLoaded', () => {
    const url = window.location.href;

    var petId;
    var userData;
    var pets;
    var serviceName;

    /************ Event Listeners ***************/
    // Get all buttons
    var btns = document.querySelectorAll('.volunteerBtn, .donateBtn');

    // Volunteer buttons
    var volBtns = document.getElementsByClassName('volunteerBtn');

    // Add event listener to all volunteer buttons. When clicked, show the "thank you" message associated with the pet
    for (i = 0; i < volBtns.length; i++){
        volBtns[i].addEventListener("click", event =>{

            const btn = event.target;
            const btnId = event.target.id;
            const thanks = document.getElementById("thanks" + btnId);

            thanks.removeAttribute("class", "hide");
            btn.setAttribute("class", "hide");

            localStorage.setItem("match", btnId);
        })
    }

    // Donate buttons
    var donateBtns = document.getElementsByClassName('donateBtn');

    // Add event listener to all donate buttons to set the petId in local storage to the id of the button
    for (i = 0; i < donateBtns.length; i++){
        
        donateBtns[i].addEventListener("click", event => {

            const btn = event.target;
            localStorage.setItem("PetID", btn.id);

        })
    }

    // More info buttons
    var moreInfoBtns = document.querySelectorAll('.moreInfo');

    // Add event listener to all moreInfo buttons to get the services_monetary attribute and store in local storage. This is used to pull up the correct info in the pet-info page
    for (i = 0; i< moreInfoBtns.length; i++){
        
        moreInfoBtns[i].addEventListener("click", event => {

            const btn = event.target;
            localStorage.setItem("serviceName", btn.getAttribute("services_monetary"));
        })
    }


    /************ Functions ***************/

    // Check to see if the user is logged in by passing the user info to the user_data api route.  Buttons are hidden if the user is not logged in
    const checkLogin = () => {
        fetch('/api/user_data', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {

            // console.log(data); // Testing

            userData = JSON.stringify(data);

            localStorage.setItem("UserData", userData);

                if (userData === "{}") {
                    for (i = 0; i < btns.length; i++) {
                        var dataType = btns[i].getAttribute("data-type");

                        if (dataType == "handlebarBtn") {
                            btns[i].setAttribute("class", "hide");
                        }
                    }
                    const moreInfos = document.querySelectorAll(".moreInfo");

                    for (i = 0; i < moreInfos.length; i++) {
                        moreInfos[i].setAttribute("class", "hide");
                    }
                    const logoutBtn = document.querySelector("#logoutBtn");
                    logoutBtn.setAttribute("class", "hide");
                } else {
                    const loginBtns = document.querySelectorAll(".login");

                    for (i = 0; i < loginBtns.length; i++) {
                        loginBtns[i].setAttribute("class", "hide");
                    }
                }
            })
    }

    /* The following functions make fetch calls to api routes in order to render the information for the pages and then render the pages themselves.  Based on the handlebar page, different functions are run because different information is needed and different routes being called */

    // Only run script from the all-pets handlebars route. Script calls the api/pets route to get all of the pets in the Pets model.
    if (url.includes("all-pets")){

        const getPets = () => {

            fetch('/api/pets', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => response.json())
                .then((data) => {
                    pets = data;
                    // petsHandlebars(); // call in petsHandlebars() to render the page
            })

                .catch((err) => console.error(err));
        };

        // petsHandlebars calls the /all-pets route to pull in all pets from the Pets table and join them with the Services table based on id.  The result is used to render the all-pets handlebars page
        const petsHandlebars = () => {

            fetch(`/all-pets/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .catch((err) => console.error(err));
        };

        getPets();
        petsHandlebars();

    } else if (url.includes("pet-info")) { //If on the pet-info handlebars page

        // Event listener for volunteer button on pet-info page. Show thank you message when clicked
        if (url.indexOf("monetary") == -1){
            const volPetInfoBtn = document.getElementById("volunteerPetInfoBtn");

            volPetInfoBtn.addEventListener("click", event => {
            const thanks = document.getElementById("thanksPetInfoButton")
            thanks.removeAttribute("class", "hide");
            volPetInfoBtn.setAttribute("class", "hide");
            })
        }

        // petInfoHandlebars takes in the serviceName (stored in local storage) and the petId and renders the information for the pet on the pet-info handlebar page
        const petInfoHandlebars = (serviceName, petId) => {

            fetch(`/pet-info/${serviceName}/${petId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .catch((err) => console.error(err));
        };

        // getId gets the id passed in the URL
        const getId = () =>{

            petId = url.split("/").pop();
        }

        getId();
        localStorage.setItem("PetID", petId);

        serviceName = localStorage.getItem("serviceName");
        petInfoHandlebars(serviceName, petId);
    } // end of else if statement

    checkLogin(); // call checkLogin on page load to toggle page buttons
});
