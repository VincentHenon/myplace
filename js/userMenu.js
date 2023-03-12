// USER MENU TOGGLE HANDLER
const userMenuModalBackground = document.getElementById("userMenuModalBackground");
const userMenuModalWindow = document.getElementById("userMenuModalWindow");
const userMenu = document.getElementById("userMenuWrapper"); //userMenu dans le header
const subscribeButton = document.querySelector(".subscribeBtn") //Button "inscription" from userMenu
let isMenuOpen = false;

// show the menu when userMenu is clicked and menu is closed
userMenu.addEventListener("click", () => {
    if (!isMenuOpen) {
        userMenuModalBackground.classList.add("show");
        userMenu.classList.add("active")
        body.style.overflow = "hidden"
        isMenuOpen = true;
    }
});

// close the menu when click outside the userMenuWindow
document.addEventListener("click", (e) => {

    if (isMenuOpen && !userMenu.contains(e.target) && !userMenuModalWindow.contains(e.target)) {
        closeUserMenuModal()
    }
})

//close the menu when escape key is pressed
document.addEventListener("keydown", (e) => {
    //e.preventDefault()
    if (e.key === "Escape") {
        closeUserMenuModal()
    }
})

const closeUserMenuModal = () => {
    userMenuModalBackground.classList.remove("show")
    userMenu.classList.remove("active")
    body.style.overflow = "visible"
    isMenuOpen = false
}