$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
//  const firstNameInput = $("input#first-name");
//  const lastNameInput = $("input#last-name");
//  const streetInput = $("input#street");
//  const cityInput = $("input#city");
//  const stateInput = $("input#state");
//  const zipInput = $("input#zip");
//  const phoneInput = $("input#phone");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
//      firstName: firstNameInput.val().trim(),
//      lastName: lastNameInput.val().trim(),
//      street: streetInput.val().trim(),
//      city: cityInput.val().trim(),
//      state: stateInput.val().trim(),
//      zip: zipInput.val().trim(),
//      phone: phoneInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
//    firstNameInput.val("");
//    lastNameInput.val("");
//    streetInput.val("");
//    cityInput.val("");
//    stateInput.val("");
//    zipInput.val("");
//    phoneInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    console.log(email, password);
    $.post("/api/signup", {
      email: email,
      password: password,
//      firstName: firstName,
//      lastName: lastName,
//      street: street,
//      city: city,
//      state: state,
//      zip: zip,
//      phone: phone
    })
      .then(() => {
        window.location.replace("/registration");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
