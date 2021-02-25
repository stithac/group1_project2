$(document).ready(() => {

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
    console.log(data.email, data.id);

  });


  const registrationForm = $("form.registration");

  registrationForm.on("submit", event => {
    event.preventDefault();
    console.log("registration button");
    window.location.replace("/registration");

    });
});
