//Selectors
const filterButtons = document.querySelectorAll(".button-filter");
const resetButton = document.querySelector("#reset-button");
const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#searchEngine");
const searchResult = document.querySelector(".cards-wrapper");
const counterResult = document.querySelector(".counter-result");
const regexError = document.querySelector(".regex-error");
let tagList = [];
let newData = [];


//FUNCTION FETCH ASYNCHRONE
async function getPlaces() {
    try {
        const response = await fetch("./json/placeData.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Can't fetch the data...");
    }
}

//FUNCTION INIT
async function init() {
    const data = await getPlaces(); //launch the fetch function and wait for the response.
    const dataSorted = orderList(data); //sort data in alphabetical order. 
    createPlaceList(dataSorted); //render the html of all the places.

    // filtering results
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            button.classList.toggle("active"); //toggle .active class
            let btnValue = button.getAttribute("value"); //save the value into btnValue

            if (button.classList.contains("active")) { //if the button class .active exists
                if (!tagList.includes(btnValue)) { //if the btnValue doesn't exist inside tagList...
                    tagList.push(btnValue); //...then you push this value to tagList
                }
            } else {
                let index = tagList.indexOf(btnValue); // else if the button class .active doesn't exist...
                if (index > -1) {
                    tagList.splice(index, 1); //then you remove the btn value from the tagList.
                }
            }

            if (tagList.length === 0) { //if tagList is empty ...
                newData = dataSorted    // ...then newData is not filtered
                updateResults(newData)  //update and render the html with the whole data.
            } else {
                newData = filterResults(dataSorted) //otherwise the data are filtered.
                updateResults(newData)  //and update and render the html with filtered data.
            }
        });
    });

    resetButton.addEventListener("click", () => { //if resetButton is clicked,
        filterButtons.forEach((button) => {
            button.classList.remove("active"); // then remove the class .active from all buttons
        });
        tagList = []; // and clear the tagList
        newData = dataSorted; // and go back to the no filter data.
        updateResults(newData);// then update the html
    });

    /*searchInput.addEventListener("keyup", (event) => {

        const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ -]*$/;
        const inputValue = searchInput.value.trim();
        if (!regex.test(inputValue)) {
            regexError.textContent = "Please enter only letters and spaces";
        } else {
            regexError.textContent = "";
        }

        if (searchInput.value.length === 0) {
            updateResults(dataSorted)
        }
    });

    searchInput.addEventListener("invalid", (event) => {
        event.preventDefault(); // Prevents the browser from showing its own error message
        event.target.setCustomValidity("Please enter only letters and spaces");
    });*/


    //handler Search Button
    searchButton.addEventListener("click", () => {
        locationSearch()
    })
    //handler Enter key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            locationSearch()
        }
    })
    //function search when search button is clicked or when Enter key is pressed
    const locationSearch = () => {
        searchResult.innerHTML = "" //clear the html list of places while typing
        const searchedString = searchInput.value.toLowerCase();// make the input in lowercase
        const filteredArr = dataSorted.filter(el => el.location.toLowerCase().includes(searchedString))
        updateResults(filteredArr)
    }
}

//Pour filtrer la base de données en fonction des filtres.
function filterResults(data) {
    return data.filter((item) => {
        // Check if tags exists in tagList using AND operator method and include them in item.tags
        return tagList.every(tag => item.tags.includes(tag));
    });
}

//POUR TRIER UNE LISTE PAR ORDRE ALPHABETIQUE BASSEE SUR LE CODE NUEMRIQUE DES LETTRES
function orderList(data) {
    const orderedData = data.sort((a, b) => {
        if (a.location.toLowerCase() < b.location.toLowerCase()) {
            return -1;
        }

        if (a.location.toLowerCase() > b.location.toLowerCase()) {
            return 1;
        }
        return 0;
    })
    return orderedData
}

//CREATION DE LA LISTE DES RESULTATS
function createPlaceList(data) {

    const count = data.length;
    counterResult.innerHTML = `<p class="search-result-count">Nous avons trouvé <span>${count}</span> résidence(s) selon vos critères.</p>`

    if (data.length === 0) {
        const errorMessage = document.createElement("div");
        errorMessage.setAttribute("class", "errorMessage");
        searchResult.innerHTML = `
        <div class="errorMessage">
        <h1>Aucune résidence disponible...</h1>
        <p> Veuillez modifier votre recherche.</p>
        </div>
        `

    } else {

        data.forEach(item => {

            let solidStars = "";
            let outlinedStars = "";
            let maxStars = 5;
            for (let i = 0; i < item.rating; i++) {
                solidStars += '<i class="fa-solid fa-star icon-star"></i>'
            }

            for (let j = 0; j < (maxStars - item.rating); j++) {
                outlinedStars += '<i class="fa-regular fa-star icon-star"></i>'
            }
            const listItem = document.createElement("div");
            listItem.setAttribute("class", "cardWrapper");
            listItem.innerHTML = `
            <a href="./place.html?id=${item.id}" class="wrapper">
            <img class="card-img" src=${item.cover} alt="cover"/>
            <div class="card-content">
            <p class="card-title">${item.title}</p>
            <p class="card-city">${item.location}</p>
            <span class="card-rating">${solidStars}${outlinedStars}</span>    
            </div>   
            </a>
        `

            searchResult.appendChild(listItem);
        })
    }
}

//FUNCTION TO UPDATE RESULTS
function updateResults(data) {

    counterResult.innerHTML = ''; //Clear the counterResult
    searchResult.innerHTML = ''; // Clear the searchResult div
    createPlaceList(data);// Create a new list of results based on the filtered data
}

init();