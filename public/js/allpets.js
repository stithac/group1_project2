// Wait for the DOM to completely load before we run our JS
document.addEventListener('DOMContentLoaded', () => {
    const url = window.location.href;

    var petId;
    var userData;
    var pets;
    var serviceName;

    // Volunteer buttons
    var volBtns = document.getElementsByClassName('volunteerBtn');

    var btns = document.querySelectorAll('.volunteerBtn, .donateBtn');

    for (i = 0; i < volBtns.length; i++) {
        volBtns[i].addEventListener("click", event => {

            const btn = event.target;
            const btnId = event.target.id;
            const thanks = document.getElementById("thanks" + btnId);

            thanks.removeAttribute("class", "hide");
            btn.setAttribute("class", "hide");

            localStorage.setAttribute("match", btnId);

        })
    }

    var donateBtns = document.getElementsByClassName('donateBtn');

    for (i = 0; i < donateBtns.length; i++) {
        donateBtns[i].addEventListener("click", event => {

            const btn = event.target;
            localStorage.setItem("PetID", btn.id);

        })
    }

    var moreInfoBtns = document.querySelectorAll('.moreInfo');

    for (i = 0; i < moreInfoBtns.length; i++) {
        moreInfoBtns[i].addEventListener("click", event => {

            const btn = event.target;
            localStorage.setItem("serviceName", btn.getAttribute("services_monetary"));
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

    // Only run script from the all-pets handlebars route
    if (url.includes("all-pets")) {

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
                    petsHandlebars(); // call in petsHandlebars() to render the page
                })

                .catch((err) => console.error(err));
        };

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


    } else if (url.includes("pet-info")) {

        const petInfoHandlebars = (serviceName, petId) => {

            fetch(`/pet-info/${serviceName}/${petId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .catch((err) => console.error(err));
        };

        const getId = () => {

            petId = url.split("/").pop();
        }
        getId();
        localStorage.setItem("PetID", petId);

        serviceName = localStorage.getItem("serviceName");
        petInfoHandlebars(serviceName, petId);
    }

    checkLogin(); // call checkLogin to toggle page buttons
});