// Wait for the DOM to completely load before we run our JS
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded! 🚀');

    const url = window.location.href;
    console.log( window.location.href);

    var scriptTag = document.getElementById("scriptTag");

    var petId;
    var userData;
    var pets;
    var storedServices;

    // Volunteer buttons
    var volBtns = document.getElementsByClassName('volunteerBtn');
    // console.log(volBtns); // Testing

    var btns = document.querySelectorAll('.volunteerBtn, .donateBtn');

    console.log(btns);

    for (i = 0; i < volBtns.length; i++){
        volBtns[i].addEventListener("click", event =>{
            console.log(event.target.id);

            const btn = event.target;
            const btnId = event.target.id;
            const thanks = document.getElementById("thanks"+ btnId);

            thanks.removeAttribute("class", "hide");
            btn.setAttribute("class", "hide");

        })
    }

    var donateBtns = document.getElementsByClassName('donateBtn');

    for (i = 0; i < donateBtns.length; i++){
        donateBtns[i].addEventListener("click", event => {


            const btn = event.target;

            console.log(btn.id);

            localStorage.setItem("PetID", btn.id);
        })
    }

    const checkLogin = () => {
        fetch('/api/user_data', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {

            console.log(data); // Testing

            userData = JSON.stringify(data);

            localStorage.setItem("UserData", userData);

            if(userData === "{}"){

                console.log("Not logged in"); // User not logged in so we hide buttons
                for( i = 0; i < btns.length; i++){

                    var dataType = btns[i].getAttribute("data-type");
                    console.log(dataType);

                    if (dataType == "handlebarBtn"){
                        btns[i].setAttribute("class", "hide");
                    }
                }

                const moreInfos = document.querySelectorAll(".moreInfo");

                for (i = 0; i < moreInfos.length; i++){
                    moreInfos[i].setAttribute("class", "hide");
                }

                const logoutBtn = document.querySelector("#logoutBtn");


                logoutBtn.setAttribute("class", "hide");
            } else {
                const loginBtns = document.querySelectorAll(".login");

                for(i = 0; i < loginBtns.length; i++){
                    loginBtns[i].setAttribute("class", "hide");
                }

            }

        })
    }

    // Only run script from the all-pets handlebars route
    if (url.includes("all-pets")){

        const getPets = () => {
            console.log('Get pets is getting called');

            fetch('/api/pets', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then ((data) => {
                    pets = data;
                    console.log('Success in getting pets:', pets); // Testing
                    petsHandlebars(); // call in petsHandlebars() to render the page
            })

                .catch((err) => console.error(err));

        };

        const petsHandlebars = () => {
            console.log('Pet Handlebars is getting called');

            console.log(pets);
            fetch(`/all-pets/`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },

            })


            .catch((err) => console.error(err));
        };

        getPets();

        // petsHandlebars();


    } else if (url.includes("pet-info")) {

        const petInfoHandlebars = (petId) => {


            console.log('Pet Info Handlebars is getting called for id: ', petId);

            fetch(`/pet-info/${petId}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
            })
            // .then((response) => response.json())


            .catch((err) => console.error(err));
        };


        const getId = () =>{

            petId = url.split("/").pop();

            console.log(petId);

        }
        getId();
        localStorage.setItem("PetID", petId);
        petInfoHandlebars(petId);
    }

    checkLogin(); // call checkLogin to toggle page buttons
});




