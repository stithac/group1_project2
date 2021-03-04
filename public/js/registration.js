/************************* Event Listeners for radio buttons ********************************* */

// Event listener for need type radio button
$("input[name='needType']").click(function () {

  const need = $("input[name='needType']:checked").val();

  // if button value === needHelp, show the help fields. helpDiv with additional fields is hidden on default
  if (need === "needHelp") {
    // also need to toggle required on/off for fields displayed/not displayed in order to submit form appropriately
    $('#petName').attr('required', '');
    $('#breed-type').attr('required', '');
    $('#petAge').attr('required', '');
    $('#petBio').attr('required', '');
    $('#petWeight').attr('required', '');
    $('#helpReason').attr('required', '');
    $('#amountRequested').removeAttr('required');
    $('#serviceName').removeAttr('required');
    $('#startDate').removeAttr('required');
    $('#endDate').removeAttr('required');
    $("#helpDiv").addClass("show").removeClass("hide");

    // if button value === giveHelp, hide the help fields
  } else if (need === "giveHelp") {
    // also need to toggle required on/off for fields displayed/not displayed in order to submit form appropriately
    $('#petName').removeAttr('required');
    $('#breed-type').removeAttr('required');
    $('#petAge').removeAttr('required');
    $('#petBio').removeAttr('required');
    $('#petWeight').removeAttr('required');
    $('#helpReason').removeAttr('required');
    $('#amountRequested').removeAttr('required');
    $('#serviceName').removeAttr('required');
    $('#startDate').removeAttr('required');
    $('#endDate').removeAttr('required');
    $('#frequencyNumber').removeAttr('required');
    $('#recurringCheck').removeAttr('required');

    $("#helpDiv").addClass("hide").removeClass("show");

  }
})

// Event listener for help type radio button
$("input[name='helpType']").click(function () {

  const help = $("input[name='helpType']:checked").val();

  // if the value of the button is services, hide the monetary fields and display the services fields
  if (help === "services") {
    // also need to toggle required on/off for fields displayed/not displayed in order to submit form appropriately
    $('#amountRequested').removeAttr('required');
    $("#monetaryDiv").addClass("hide").removeClass("show")
    $("#servicesDiv").addClass("show").removeClass("hide");
    $('#serviceName').attr('required', '');
    $('#startDate').attr('required', '');
    $('#endDate').attr('required', '');

    // if the value of the button is monetary, hide the services fields and display the monetary fields
  } else if (help === "monetary") {
    // also need to toggle required on/off for fields displayed/not displayed in order to submit form appropriately
    $("#monetaryDiv").addClass("show").removeClass("hide");
    $('#amountRequested').attr('required', '');
    $('#serviceName').removeAttr('required');
    $('#startDate').removeAttr('required');
    $('#endDate').removeAttr('required');
    $("#servicesDiv").addClass("hide").removeClass("show")
  }

})

// Event listener for recurring checkbox
// If the recurring checkbox is checked, show the recurring fields. Otherwise, the fields are hidden
$("#recurringCheck").click(function () {
  if ($(this).is(":checked")) {

    $("#frequencyDiv").addClass("show").removeClass("hide");
  } else {
    $("#frequencyDiv").addClass("hide").removeClass("show");
  }

})

// Event listener for frequencySelect drop down
$("#frequencySelect").change(function () {
  const frequency = $("#frequencySelect").val();

  if (frequency === "daily") {

    $("#frequencySpan").text("days on:");
    $("#recurringDiv").addClass("show").removeClass("hide");

  } else if (frequency === "weekly") {

    $("#frequencySpan").text("weeks on:");
    $("#recurringDiv").addClass("show").removeClass("hide");

  } else if (frequency === "monthly") {

    $("#frequencySpan").text("months on:");
    $("#recurringDiv").addClass("show").removeClass("hide");

  } else {
    $("#recurringDiv").addClass("hide").removeClass("show");
  }

})