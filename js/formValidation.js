const formSubscribe = document.getElementById("formSubscribe")
const emailSubscribe = document.getElementById("emailSubscribe")
const pwSubscribe = document.getElementById("pwSubscribe")
const pwCheckSubscribe = document.getElementById("pwCheckSubscribe")
const btnSubmit = document.getElementById("btnSubmit")
const formContainer = document.querySelector(".form-container")
const formControl = document.getElementsByClassName("form-control")
const confirmation = document.querySelector(".confirmation-background")
const confirmationButton = document.querySelector("#confirmationBtn")
const eyePW = document.getElementById("eyePW")
const eyeSlashPW = document.getElementById("eyeSlashPW")
const eyePWCheck = document.getElementById("eyePWCheck")
const eyeSlashPWCheck = document.getElementById("eyeSlashPWCheck")
const PWIcons = document.querySelector(".PW-icons")
const users = [] //empty array

let isSubscribeMenuOpen = false
let emailValid = false
let pwValid = false
let pwCheckValid = false

// Check if "inscription"'s click
subscribeButton.addEventListener("click", () => {
    openForm()
})

//close the menu when escape key is pressed
document.addEventListener("keydown", (e) => {
    //e.preventDefault()
    if (e.key === "Escape") {
        closeForm()
    }
})

// close the menu when click outside the userMenuWindow
formContainer.addEventListener("click", (e) => {
    //e.preventDefault()
    // e.stopImmediatePropagation()
    // e.stopPropagation()
    if (!formSubscribe.contains(e.target)) { //Check if the click is outside the form
        closeForm()
    }
})

// Opening Form
const openForm = () => {
    userMenuModalBackground.classList.remove("show")
    userMenu.classList.remove("active")
    body.style.overflow = "hidden"
    isMenuOpen = false
    formContainer.style.visibility = "visible"
    formSubscribe.style.visibility = "visible"
    isSubscribeMenuOpen = true
}

// Closing Form 
const closeForm = () => {
    body.style.overflow = "visible"
    formContainer.style.visibility = "hidden"
    formSubscribe.style.visibility = "hidden"

    for (let i = 0; i < formControl.length; i++) {
        formControl[i].classList.remove("success");
        formControl[i].classList.remove("error");
        console.log(formControl[i].className)
    }
    isSubscribeMenuOpen = false
}


// Event on email Input
emailSubscribe.addEventListener("blur", (e) => {
    isEmailValid(e.target.value)
})

//Check the email
function isEmailValid() {
    const emailSubscribeValue = emailSubscribe.value.trim()
    const regexEmail = /^(?=.{1,64}@.{1,255}$)[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/i
    if (emailSubscribeValue === "") {
        emailValid = setErrorFor(emailSubscribe, "L'adresse e-mail est obligatoire.")
    } else if (!regexEmail.test(emailSubscribeValue)) {
        emailValid = setErrorFor(emailSubscribe, "Il semble que l'adresse e-mail ne soit pas conforme.")
    } else {
        emailValid = setSuccessFor(emailSubscribe)
    }
}

// Event on 1st password Input
pwSubscribe.addEventListener("blur", (e) => {
    isPwValid(e.target.value)
})

// Check the 1st password
function isPwValid() {
    const pwSubscribeValue = pwSubscribe.value.trim()
    const regexPW = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i
    if (pwSubscribeValue === "") {
        pwValid = setErrorFor(pwSubscribe, "Le mot de passe est obligatoire.")
    } else if (!regexPW.test(pwSubscribeValue)) {
        pwValid = setErrorFor(pwSubscribe, "min. requis : 8 caractères, une capitale et un chiffre.")
    } else {
        pwValid = setSuccessFor(pwSubscribe)
    }

    // Event on 1st password Input
    pwCheckSubscribe.addEventListener("blur", (e) => {
        isPwCheckValid(e.target.value, pwSubscribe)
    })
}

// Check the 2nd password
function isPwCheckValid() {
    const pwCheckSubscribeValue = pwCheckSubscribe.value.trim()
    const pwSubscribeValue = pwSubscribe.value.trim()
    if (pwCheckSubscribeValue === "") {
        pwCheckValid = setErrorFor(pwCheckSubscribe, "Le mot de passe est obligatoire.")
    } else if (pwSubscribeValue !== pwCheckSubscribeValue) {
        pwCheckValid = setErrorFor(pwCheckSubscribe, "Les deux mots de passe ne sont pas identiques.")
    } else {
        pwCheckValid = setSuccessFor(pwCheckSubscribe)
    }
}

//Dynamically transform not validated inputs in red and disply error messages
function setErrorFor(input, message) {
    const formControl = input.parentElement //form-control class associated to the input
    const small = formControl.querySelector("small")

    //add error message 
    small.innerText = message

    //add error class
    formControl.className = "form-control error"
    return false
}

//Dynamically transform validated inputs in green
function setSuccessFor(input) {
    const formControl = input.parentElement
    formControl.className = "form-control success"
    return true
}

//Click on the SubscribeButton
formSubscribe.addEventListener("submit", (e) => {
    e.preventDefault()
    isFormValid()
})

//Check the form validity
function isFormValid() {
    console.log("pwCheck is ", pwCheckValid)
    console.log("pwValid is ", pwValid)
    console.log("emailValid is ", emailValid)
    if (emailValid && pwValid && pwCheckValid) {
        saveUser()
    }
}

function resetForm() {
    pwCheckSubscribe.value = ""
    pwSubscribe.value = ""
    pwValid = false
    pwCheckValid = false
}


function saveUser() {

    let id = 0 //first id

    // function to save a user from the inputs
    function createUser(email, password) {
        const user = {
            id: id++,
            email: email,
            password: password
        }
        return user
    }

    password = pwCheckSubscribe.value
    email = emailSubscribe.value
    const newUser = createUser(email, password)

    // If no user in the database thren...
    if (users.length === 0) { 
        users.push(newUser)
        closeForm()
        openConfirmation()
        resetForm()
    } else {
        const oldUser = users.find(user => user.email === email)
        if (oldUser) {
            pwValid = setErrorFor(emailSubscribe, "Cet e-mail existe déjà dans notre base de données.")
        } else { // if a user already exists then we push the new user object in the array users
            users.push(newUser)
            console.table(users)
            closeForm()
            openConfirmation()
            resetForm()
        }
    }
}

/*
    // Convert the user object to a JSON string
    const userJson = JSON.stringify(user);

    // Save the user JSON string to localStorage
    localStorage.setItem('user', userJson);
*/


// Confirmation modal after the form is filled up
function openConfirmation() {
    confirmation.classList.add("show")
}

// click handler on the confirmation Button
confirmationButton.addEventListener("click", (e) => {
    closeConfirmation()
})

// Once the button is click the confirmation modal is closed
function closeConfirmation() {
    confirmation.classList.remove("show")
}




// Toggle visibility passwords
eyePW.addEventListener("click", (e) => {
    togglePW()
})
eyeSlashPW.addEventListener("click", (e) => {
    togglePW()
})
eyePWCheck.addEventListener("click", (e) => {
    togglePWCheck()
})
eyeSlashPWCheck.addEventListener("click", (e) => {
    togglePWCheck()
})
function togglePW() {
        eyePW.classList.toggle("show")
        eyeSlashPW.classList.toggle("show")
        if (eyePW.classList.contains("show")) {
            pwSubscribe.type = "text"
        } else {
            pwSubscribe.type ="password"
        }
}
function togglePWCheck() {
        eyePWCheck.classList.toggle("show")
        eyeSlashPWCheck.classList.toggle("show")
        if (eyePWCheck.classList.contains("show")) {
            pwCheckSubscribe.type = "text"
        } else {
            pwCheckSubscribe.type ="password"
        }
}

/* PROBLEMES A REGLER: 
• ERRORS ON THE ICONS VIEW PASSWORD
• DISPLAY OR NOT THE PASSWORD
• CREATE USER LOCALSTORAGE
• CENTER OK BUTTON CONFIRMATION
*/