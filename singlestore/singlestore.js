// Get email status element
const validate_icon = document.getElementById("validate-icon");
const email_text = document.getElementById("email");
const error_email = document.getElementById("error-email");
const error_business = document.getElementById("error-business");
const error_radio = document.getElementById("error-radio");

// Get drop down element
const drop_down = document.getElementById("input-dropdown");
const options = document.getElementById("options");
const option_list = document.querySelectorAll(".option");

// Get submit button
const submit = document.getElementById("input-submit");

// Drop down element listener
drop_down.addEventListener("click", function () {
    if (options.style.display == "" || options.style.display == "none") {
        options.style.display = "block";
        drop_down.classList.remove("input-dropdown");
        drop_down.classList.add("input-dropdown-focus");
    } else {
        options.style.display = "none";
        drop_down.classList.remove("input-dropdown-focus");
        drop_down.classList.add("input-dropdown");
    }

});

// Click elsewhere to close dropdown
window.addEventListener("mouseup", function (event) {
    if (event.target != drop_down && options.style.display != "none") {
        options.style.display = "none";
        drop_down.classList.remove("input-dropdown-focus");
        drop_down.classList.add("input-dropdown");
    }
});

// Each option listener
option_list.forEach(option =>
    option.addEventListener("click", () => {
        business.innerHTML = option.querySelector("p").innerHTML;
        options.style.display = "none";
    })
);

// Validate all three fields
function Validate(email, size, thing) {
    email_regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    disabled_email = /@gmail|@outlook|@hotmail|@yahoo/;
    error_prompt = "";
    if (email_regex.test(email.toLowerCase()) == false) {
        error_prompt = "Please make sure this is a valid email address";
    }
    if (disabled_email.test(email.toLowerCase()) == true) {
        error_prompt = "Please make sure this isn't a personal email address";
    }
    // Activate validation status
    if (error_prompt == "") {
        validate_icon.classList.add("fa-solid");
        validate_icon.classList.remove("fa-triangle-exclamation");
        validate_icon.classList.add("fa-circle-check");
        email_text.classList.remove("email-text");
        email_text.classList.remove("email-text-failure");
        email_text.classList.add("email-text-success");
        error_email.classList.remove("error-email-active");
        error_email.classList.add("error-email");

    } else {
        validate_icon.classList.add("fa-solid");
        validate_icon.classList.remove("fa-circle-check");
        validate_icon.classList.add("fa-triangle-exclamation");
        email_text.classList.remove("email-text");
        email_text.classList.remove("email-text-success");
        email_text.classList.add("email-text-failure");
        error_email.innerHTML = error_prompt;
        error_email.classList.remove("error-email");
        error_email.classList.add("error-email-active");
    }
    if (size == "Select Size") {
        error_business.innerHTML = "Please make sure business size is selected";
        error_business.classList.remove("error-business");
        error_business.classList.add("error-business-active");
        drop_down.classList.remove("input-dropdown");
        drop_down.classList.add("input-dropdown-error")
    } else {
        error_business.classList.add("error-business");
        error_business.classList.remove("error-business-active");
        drop_down.classList.remove("input-dropdown-error");
        drop_down.classList.add("input-dropdown-success")
    }
    if (thing == "") {
        error_radio.innerHTML = "Please make sure select at least one thing";
        error_radio.classList.remove("error-radio");
        error_radio.classList.add("error-radio-active");
    } else {
        error_radio.classList.add("error-radio");
        error_radio.classList.remove("error-radio-active");
    }

    if (error_prompt != "" || email == "" || size == "Select Size" || thing == "") {
        return false;
    } else {
        return true;
    }
}



// Business size validate
function ValidateSize(size) {
    disqualify_list = ["1-10"]
    for (let i = 0; i < disqualify_list.length; i++) {
        if (size == disqualify_list[i]) {
            return false;
        }
    }
    return true;
}

// Business size validate
function ValidateRadio(thing) {
    disqualify_list = ["Document Storage", "Full Text Search", "Price"];
    for (let i = 0; i < disqualify_list.length; i++) {
        console.log(thing==disqualify_list[i]);
        if (thing == disqualify_list[i]) {
            return false;
        }
    }
    return true;
}

// submit listener
submit.addEventListener("click", function (event) {
    var email = document.getElementById("email");
    var business = document.getElementById("business");
    var radios = document.getElementsByClassName("input-radio");
    var radio_text = "";
    for (let i = 0; i < radios.length; i++) {
        var radio = radios[i].querySelector("input");
        if (radio.checked == true) {
            radio_text = radios[i].textContent.trim();
            break;
        }
    }

    if (Validate(email.value, business.innerHTML, radio_text)) {
        if (ValidateSize(business.innerHTML) && ValidateRadio(radio_text)) {
            // console.log(email.value);
            // console.log(business.innerHTML);
            
            window.location.href = "success.html";
        } else {
            window.location.href = "failure.html";
        }
    }

});