/*****Login fields ******/

// Getting references to our form and inputs
const loginForm = $("form.signup");
const emailInput = $("input#email-input");
const passwordInput = $("input#password-input");

// When the form is submitted, we validate there's an email and password entered
$("#emailSubmit").click(function(event){
  event.preventDefault();
  const userData = {
    email: emailInput.val().trim(),
    password: passwordInput.val().trim()
  };

  if (!userData.email || !userData.password) {
    return;
  }

  // If we have an email and password we run the loginUser function and clear the form
  loginUser(userData.email, userData.password);
  // emailInput.val("");
  // passwordInput.val("");
  $("#registrationDiv").addClass("show").removeClass("hide");
  $("#emailSubmit").addClass("hide").removeClass("show");
})

// loginUser does a post to our "api/signup" route to create a user and get the RegisterId
function loginUser(email, password) {
  $.post("/api/signup", {
    email: email,
    password: password
  })
    .then((data) => {
      console.log(data.email, data.id);
      // window.location.replace("/members");

      console.log(data.email, data.id);
      // If there's an error, log the error
    })
    .catch(err => {
      console.log(err);
    });
}

/************************* Event Listeners for radio buttons ********************************* */

// Event listener for need type radio button
$("input[name='needType']").click(function(){
  console.log($("input[name='needType']:checked").val());

  const need = $("input[name='needType']:checked").val();

  // if button value === needHelp, show the help fields. helpDiv with additional fields is hidden on default
  if(need === "needHelp"){

    $("#helpDiv").addClass("show").removeClass("hide");

  // if button value === giveHelp, hide the help fields
  } else if (need === "giveHelp"){

    $("#helpDiv").addClass("hide").removeClass("show");

  }
})

// Event listener for help type radio button
$("input[name='helpType']").click(function(){
  console.log($("input[name='helpType']:checked").val());

  const help = $("input[name='helpType']:checked").val();

  // if the value of the button is services, hide the monetary fields and display the services fields
  if (help === "services"){

      $("#servicesDiv").addClass("show").removeClass("hide");
      $("#monetaryDiv").addClass("hide").removeClass("show")

  // if the value of the button is monetary, hide the services fields and display the monetary fields
  } else if (help === "monetary"){

    $("#monetaryDiv").addClass("show").removeClass("hide");
    $("#servicesDiv").addClass("hide").removeClass("show")

  }

})

// Event listener for recurring checkbox
// If the recurring checkbox is checked, show the recurring fields. Otherwise, the fields are hidden
$("#recurringCheck").click(function(){
  if($(this).is(":checked")){
    console.log("recurring");

    $("#frequencyDiv").addClass("show").removeClass("hide");
  } else {
    console.log("not recurring");
    $("#frequencyDiv").addClass("hide").removeClass("show");
  }

})

// Event listener for frequencySelect drop down
$("#frequencySelect").change(function(){
  const frequency = $("#frequencySelect").val();

  console.log(frequency);

  if(frequency === "daily"){

    $("#frequencySpan").text("days on:");
    $("#recurringDiv").addClass("show").removeClass("hide");

  } else if (frequency === "weekly"){

    $("#frequencySpan").text("weeks on:");
    $("#recurringDiv").addClass("show").removeClass("hide");

  } else if (frequency === "monthly"){

    $("#frequencySpan").text("months on:");
    $("#recurringDiv").addClass("show").removeClass("hide");

  } else {
    $("#recurringDiv").addClass("hide").removeClass("show");
  }

})