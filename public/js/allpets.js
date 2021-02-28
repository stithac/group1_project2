// Wait for the DOM to completely load before we run our JS
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded! 🚀');

    const url = window.location.href;
    console.log( window.location.href);

    var scriptTag = document.getElementById("scriptTag");

    var petId;
    var btn;
    var clickedBtn;

    // Only run script from the all-pets handlebars route
    if (url.includes("all-pets")){

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





    } else {



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
        petInfoHandlebars(petId);
    }

});




