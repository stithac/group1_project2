// Wait for the DOM to completely load before we run our JS
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded! 🚀');

    const url = window.location.href;
    console.log( window.location.href);

    var scriptTag = document.getElementById("scriptTag");

    var petId;
    var userId;

    // Volunteer buttons
    var volBtns = document.getElementsByClassName('volunteerBtn');
    // console.log(volBtns); // Testing

    var btns = document.getElementsByClassName('btn');

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


    // Only run script from the all-pets handlebars route
    if (url.includes("all-pets")){

        fetch('/api/user_data', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            userId = data.id;
            console.log(userId);

            if(userId === undefined){
                console.log("No id");
                for( i = 0; i < btns.length; i++){
                    btns[i].setAttribute("class", "hide");
                }

            }
        })

        var pets;

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

            })
                .catch((err) => console.error(err));
        };

        const petsHandlebars = () => {
            console.log('Pet Handlebars is getting called');

            fetch('/all-pets', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
            })
            // .then((response) => response.json())

            .catch((err) => console.error(err));
        };


        getPets();

        petsHandlebars();


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

});




