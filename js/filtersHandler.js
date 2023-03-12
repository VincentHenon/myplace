//drag scroll
const slider = document.querySelector('.buttons-filter');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('grabbing');
});
slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('grabbing');
});
slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
    // console.log(walk);
});
////////////////////////////

//Arrows scroll 
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const filterList = document.querySelector('.buttons-filter');

const scrollToLeft = () => {
    const scrollDistance = filterList.clientWidth / 2;
    filterList.scrollBy({ left: -scrollDistance, behavior: "smooth" });
};

const scrollToRight = () => {
    const scrollDistance = filterList.clientWidth / 2;
    filterList.scrollBy({ left: scrollDistance, behavior: "smooth" });
};

arrowLeft.addEventListener("click", scrollToLeft);
arrowRight.addEventListener("click", scrollToRight);
///////////////////////////

//Hover
arrowLeft.addEventListener("mouseenter", () => {
    arrowLeft.classList.add("hover")
})
arrowLeft.addEventListener("mouseleave", () => {
    arrowLeft.classList.remove("hover")
})

//Hover
arrowRight.addEventListener("mouseenter", () => {
    arrowRight.classList.add("hover")
})
arrowRight.addEventListener("mouseleave", () => {
    arrowRight.classList.remove("hover")
})
///////////////////////////