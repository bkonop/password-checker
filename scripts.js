let username_entry = document.getElementById('username_entry');
let username = "";

let password_entry = document.getElementById('password_entry');
let confirm_password_entry = document.getElementById('confirm_password_entry');
let passwords_match = document.getElementById('passwords_match');
let password = "";

let reveal_button = document.getElementById('reveal_button');

let char_count_req = document.getElementById('char_count_req');
let upper_lower_req = document.getElementById('upper_lower_req');
let number_req = document.getElementById('number_req');
let spec_char_req = document.getElementById('spec_char_req');
let consecutive_req = document.getElementById('consecutive_req');

let char_icon = document.getElementById('char_icon');
let upper_icon = document.getElementById('upper_icon');
let number_icon = document.getElementById('number_icon');
let spec_icon = document.getElementById('spec_icon');
let consec_icon = document.getElementById('consec_icon');

let upper_lower_regex = new RegExp('(?=.*[a-z])(?=.*[A-Z])')
let number_regex = new RegExp('(?=.*[0-9])')
let spec_char_regex = new RegExp('[^A-Za-z0-9]')

let red_text = "rgb(180, 0, 0)"
let blue_text = "rgb(0, 130, 150)"

// Get new username data on change
username_entry.addEventListener('input', (e) => {
    username = username_entry.value;
    updateRequirementsList();
})

// Get new username data on change
password_entry.addEventListener('input', (e) => {
    password = password_entry.value;
    updateRequirementsList();
    checkPasswordMatching();
})

confirm_password_entry.addEventListener('input', (e) => {
    checkPasswordMatching();
})

const checkPasswordMatching = () => {
    if (confirm_password_entry.value == password && password) {
        passwords_match.setAttribute("src", "./images/check.png")
    } else {
        passwords_match.setAttribute("src", "./images/cross.png")
    }
}

const consecutiveCharacterTest = () => {
    let temp = true
    for (let i=0;i<password.length-2;i++) {
        if (username.includes(password.slice(i,i+3))) {
            temp = false
        }
    }
    return temp
}

//
const updateRequirementsList = () => {
    // Check char count
    password.length >= 12 ? char_count_req.style.color = blue_text : char_count_req.style.color = red_text
    password.length >= 12 ? char_icon.setAttribute("src", "./images/check.png") : char_icon.setAttribute("src", "./images/cross.png")

    upper_lower_regex.test(password) ? upper_lower_req.style.color = blue_text : upper_lower_req.style.color = red_text
    upper_lower_regex.test(password) ? upper_icon.setAttribute("src", "./images/check.png") : upper_icon.setAttribute("src", "./images/cross.png")

    number_regex.test(password) ? number_req.style.color = blue_text : number_req.style.color = red_text
    number_regex.test(password) ? number_icon.setAttribute("src", "./images/check.png") : number_icon.setAttribute("src", "./images/cross.png")

    spec_char_regex.test(password) ? spec_char_req.style.color = blue_text : spec_char_req.style.color = red_text
    spec_char_regex.test(password) ? spec_icon.setAttribute("src", "./images/check.png") : spec_icon.setAttribute("src", "./images/cross.png")

    password.length > 0 && consecutiveCharacterTest() ? consecutive_req.style.color = blue_text : consecutive_req.style.color = red_text
    password.length > 0 && consecutiveCharacterTest() ? consec_icon.setAttribute("src", "./images/check.png") : consec_icon.setAttribute("src", "./images/cross.png")
}

// Reveal password
reveal_button.addEventListener('change', function() {
    this.checked ? password_entry.setAttribute("type", "text") : password_entry.setAttribute("type", "password")
})