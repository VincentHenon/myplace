// Get the id of the place from the page's URL
const placeId = new URLSearchParams(window.location.search).get("id");

getPlaceById(placeId)
    .then(place => {
        renderHTML(place); // Render the HTML once the status is ok 
    })
    .catch(error => {
        console.error(error);
    });

////////////////////////////////////////////////////////////////////////

// Function to fetch the place data from a JSON file and return a Promise that resolves with the place object
function getPlaceById(id) {
    // Fetch the JSON file using the Fetch API
    return fetch("./json/placeData.json")
        // Handle any HTTP errors that occur during the fetch
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            // If the fetch succeeds, parse the JSON data and return it as a Promise
            return res.json();
        })
        // Once the JSON data is retrieved, find the place with the specified ID and return it
        .then(data => {
            const place = data.find(place => place.id === id);
            if (place) {
                // Use JSON.parse and JSON.stringify to create a deep copy of the place object,
                // since we will be modifying it later and don't want to modify the original data
                return JSON.parse(JSON.stringify(place));
            } else {
                throw new Error(`Place with id ${id} not found!`);
            }
        })
        // If any errors occur during the fetch or parsing, log the error and return null
        .catch(error => {
            console.error("Error getting place data:", error);
            return null;
        });
}

////////////////////////////////////////////////////////////////////////

//handle the book Reservation Button
function handleButtonReserver() {
    const confirm = document.querySelector(".reservation-button")
    confirm.addEventListener("click", () => {
        if (people.value == 0) {
            document.querySelector(".modal-reservation-bg").classList.remove("hidden")
        } else {
            document.querySelector(".modal-reservation-bg").classList.add("hidden")
        }
    })
}

////////////////////////////////////////////////////////////////////////

//handle the close button of the required people value modal
function handleButtonClose() {
    const close = document.querySelector(".modal-reservation-btn-cross")
    close.addEventListener("click", () => {
        document.querySelector(".modal-reservation-bg").classList.toggle("hidden")
    })
}

////////////////////////////////////////////////////////////////////////

// render the HTML once data is fetched
function renderHTML(place) {
    const renderHTML = document.querySelector(".section-place");

    //by default today
    let date1 = new Date();

    //by default tomorrow
    let date2 = new Date(date1);
    date2.setDate(date1.getDate() + 1);

    //format date into "full letters" date
    const options = { dateStyle: 'full' };
    const formatter = new Intl.DateTimeFormat('fr-FR', options);
    let checkIn = formatter.format(date1);
    let checkOut = formatter.format(date2);

    //Price Calculation
    let stayNights = Number((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
    let staySum = Number(place.price * stayNights);
    let cleaningFee = Number(place.cleaningFee);
    let people = 0;
    let totalCleaningFee = Number(0);
    let stayTotal = Number(totalCleaningFee + staySum);

    renderHTML.innerHTML += `
    <div class="place-upper">
        <div class="place-heading">
            <h1 class="place-title">${place.title}</h1>
            <div class="place-subtitle">
                <p class="place-location"><i class="fas fa-map-marker-alt"></i> : ${place.location}</p>
                <p class="place-reviews"><i class="fas fa-pencil"></i> : ${place.review.length} reviews</p>
                <p class="place-rating"><i class="fa-solid fa-star icon-star"></i> : ${place.rating}</p>  
                <p class="place-host-name"><i class="fas fa-user"></i> : ${place.host.name}</p>
            </div>                
        </div>   
    </div>

    <div class="place-gallery">
        <img class="place-main-img" src=${place.pictures[0]} alt='main picture of ${place.title}'/>
        <div class="place-thumbnails">
        </div>
    </div>

    <div class="place-bottom">
        <div class="bottom-col-1">
            <div class="place-details place-row">
                <div class="details-heading">
                    <h3 class="details-title">${place.type} chez ${place.host.name}</h3>
                    <p class="details-content">${place.details}</p>
                </div>
                <img class="details-img" src=${place.host.picture} />
            </div>
            <hr>
            <div class="place-description place-row">
                <!--<h3>Description</h3>-->
                <p class="place-description-content">${place.description}</p>
            </div>
            <hr>
            <div class="place-equipments place-row">
                <!--<h3>Équipements</h3>-->
                <ul class="place-equipments-content"></ul>
            </div>
            <hr>
            <div class="place-tags place-row">
                <!--<h3>Tags</h3>-->
                <div class="place-tags-content"></div>
            </div>            
        </div>

        <div class="bottom-col-2">
            <h3>${place.price}€ / nuit</h3>
            <div class="place-calendar-wrapper place-row">
            <div class="date-stay">
                    <div class="checkIn">
                        <h3>Arrivée:</h3>
                        <p id="checkIn">${checkIn}</p>
                    </div>
                    <div class="checkOut">
                        <h3>Départ:</h3>
                        <p id="checkOut">${checkOut}</p>
                    </div>
                </div>
                <!-- <h3>Calendrier</h3> -->
                <!--<input id="datepicker"/>--> <!-- pour daterangepicker -->
                <div id="datepicker"></div> <!-- pour easePick & flatpickr-->
            </div>
                <hr />
            <div class="place-reservation-wrapper place-row">
                <div class="select-people">
                    <p>Nombre de voyageur: </p>
                    <form action="#">
                        <label for="voyageur(s)"></label>
                        <select name="people" id="people" class="error" required>
                        <!-- <option value="0" selected  disabled hidden>0</option> -->
                            <option value="0" selected>0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </form>
                </div>
                <div class="calc-stay">
                    <div class="stay-calcul-wrapper">
                        <p class="stay-calcul"><span id="price">${place.price}</span>€ x <span id="stayNights">${stayNights}</span> nuit(s): </p>  
                        <p class="stay-total"><span id="staySum">${staySum}</span>€</p>
                    </div>
                    <div class="stay-cleaning-wrapper">
                        <p>Frais de ménage:</p>
                        <p class="stay-cleaning">${totalCleaningFee}€</p>
                    </div>
                    <hr />
                    <div class="stay-grand-total-wrapper">
                        <p class="stay-grand-total">TOTAL:</p>
                        <p class="stay-grand-total"><span id="grandTotal" >${stayTotal}</span>€</p>
                    </div>
                </div>
                <button class="reservation-button"><i class="fa-solid fa-circle-check"></i>Réserver</button>
            </div>
        </div>
    </div>
    `;


    ////////////////////////////////////////////////////////////////////////

    // update people will re-render totalCleaningFee + grandTotal
    const peopleInput = document.querySelector("#people")

    peopleInput.addEventListener("change", () => {
        people = peopleInput.value
        if (people == 0) { // if 0 people then input = red error
            peopleInput.classList.add("error");
            peopleInput.classList.remove("valid");
            totalCleaningFee = 0
            stayTotal = Number(totalCleaningFee + staySum);
            document.querySelector(".stay-cleaning").innerHTML = `
            <p class="stay-cleaning">${totalCleaningFee}€</p>
            `
            document.querySelector("#grandTotal").textContent = stayTotal

        } else if (people == 1) {
            peopleInput.classList.remove("error") // if 1 people then input = valid
            peopleInput.classList.add("valid")
            totalCleaningFee = cleaningFee         // Cleaning fee won't get bonus
            stayTotal = Number(totalCleaningFee + staySum);
            document.querySelector(".stay-cleaning").innerHTML = `
            <p class="stay-cleaning">${totalCleaningFee}€</p>
            `
            document.querySelector("#grandTotal").textContent = stayTotal

        } else {
            peopleInput.classList.remove("error") // if  people > 1 then input = valid
            peopleInput.classList.add("valid")
            totalCleaningFee = calcCleaningFee(people, cleaningFee) // Cleaning fee get a bonus calculate by the number of people
            stayTotal = Number(totalCleaningFee + staySum);
            document.querySelector(".stay-cleaning").innerHTML = `
                <p class="stay-cleaning">${totalCleaningFee}€</p>
                `
            document.querySelector("#grandTotal").textContent = stayTotal
        }
    })

    ////////////////////////////////////////////////////////////////////////

    // calculation of the total cleaning Fee 
    function calcCleaningFee(people, cleaningFee) {

        if (people === 1) {
            totalCleaningFee = cleaningFee;
            return totalCleaningFee
        } else if (people > 1) {
            totalCleaningFee = cleaningFee * (1 + (people * 0.25));
        }
        return totalCleaningFee
    }

    ////////////////////////////////////////////////////////////////////////

    // handle infinite slider modal
    const slidesContainer = document.getElementById("slides-container");
    const prevButton = document.getElementById("slide-arrow-prev");
    const nextButton = document.getElementById("slide-arrow-next");
    const sectionSlider = document.querySelector(".section-slider")
    const placeGallery = document.querySelector(".place-gallery")

    for (let i = 0; i < place.pictures.length; i++) {
        slidesContainer.innerHTML += `
        <li>
            <img src=${place.pictures[i]} class="slide" alt='picture ${i} of the place ${place.id}'/>
        </li>
        `
    }
    const slide = document.querySelector(".slide");
    // display the slider when gallery's elements are clicked
    placeGallery.addEventListener("click", () => {
        sectionSlider.classList.remove("hidden")
    })
    // button left to slide a previous slide
    nextButton.addEventListener("click", () => {
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft += slideWidth;
    });
    // button right to slide a next slide
    prevButton.addEventListener("click", () => {
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft -= slideWidth;
    });

    ////////////////////////////////////////////////////////////////////////

    // Generate thumbnails for the gallery
    const thumbnails = document.querySelector(".place-thumbnails")
    const maxNumImg = 4;
    const numImg = place.pictures.length - 1

    // Generate thumbnail by scanning the index.
    for (let i = 1; i <= numImg; i++) {
        const thumb = "place-thumb_";
        thumbnails.innerHTML += `
            <img class=${thumb + i} src=${place.pictures[i]} alt='picture ${i} of the place ${place.id}'  />
          `
    }

    ////////////////////////////////////////////////////////////////////////

    // Change layout depending on number of pictures available.
    if (numImg === 1) {
        document.querySelector(".place-thumbnails").style.gridTemplateAreas = "'thumb_1 thumb_1' 'thumb_1 thumb_1'";
        document.querySelector(".place-thumb_1").style.width = "var(--half_screen";
        document.querySelector(".place-thumb_1").style.height = "var(--half_screen";
    }
    else if (numImg === 2) {
        document.querySelector(".place-thumbnails").style.gridTemplateAreas = "'thumb_1 thumb_1' 'thumb_2 thumb_2'";
        document.querySelector(".place-thumb_1").style.width = "var(--half_screen";
        document.querySelector(".place-thumb_2").style.width = "var(--half_screen";
    }
    else if (numImg === 3) {
        document.querySelector(".place-thumbnails").style.gridTemplateAreas = "'thumb_1 thumb_2' 'thumb_3 thumb_3'"
        document.querySelector(".place-thumb_3").style.width = "var(--half_screen";
    }

    ////////////////////////////////////////////////////////////////////////

    //generate list of equipements
    const equipments = document.querySelector(".place-equipments-content")
    for (let j = 0; j < place.equipments.length; j++) {
        equipments.innerHTML += `
            <li>${place.equipments[j]}</li>
        `
    }

    ////////////////////////////////////////////////////////////////////////

    //generate a list of tags
    const tags = document.querySelector(".place-tags-content")
    for (let l = 0; l < place.tags.length; l++) {
        tags.innerHTML += `
            <p>${place.tags[l]}</p>
        `
    }

    ////////////////////////////////////////////////////////////////////////

    //init flatpicker (calendar)
    flatpickr.localize(flatpickr.l10ns.fr);
    flatpickr("#datepicker", {
        mode: "range",
        defaultDate: [date1, date2],
        inline: true,
        minDate: "today",
        dateFormat: "d-m-Y",
        showMonths: 1, //1 calendar or 2 calendars

        // update dates will re-render nights number + grandTotal
        onChange: function (dates) {
            if (dates.length == 2) { //if 2 dates have been selected we calculate the number of nights
                date1 = dates[0];
                date2 = dates[1];
                checkIn = formatter.format(date1);
                checkOut = formatter.format(date2);
                stayNights = Math.round(Number((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)));
                staySum = Number(place.price * stayNights);
                cleaningFee = Number(place.cleaningFee);
                stayTotal = Number(totalCleaningFee + staySum);

                // Render again the variables
                document.querySelector("#checkIn").textContent = formatter.format(date1)
                document.querySelector("#checkOut").textContent = formatter.format(date2)
                document.querySelector("#price").textContent = place.price
                document.querySelector("#stayNights").textContent = stayNights
                document.querySelector("#staySum").textContent = staySum
                document.querySelector("#grandTotal").textContent = stayTotal
            }
        }
    })

    ////////////////////////////////////////////////////////////////////////

    // those functions must be called after HTML is rendered
    handleButtonReserver() //to book the reservation    
    handleButtonClose() //to close the inforamtion modal
}