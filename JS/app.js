/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables nav_list and section
 * 
*/
const nav_list = document.getElementById('navbar__list');
const section = document.querySelectorAll('section');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
* @description The Y required to scroll
* @param {object} element
* @returns {number} Subtraction of element and documnet size
*/
function space_top (element){
    const space = element.getBoundingClientRect().top - document.body.getBoundingClientRect().top - (-150);
    return space;
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
// For each section create element li, then add the section attributes and append it to the navigation bar 
function list_sections(){
    for (index of section){
        const list = document.createElement('li');
        const ID = index.id;
        const section_name = index.dataset.nav;
        list.innerHTML = `<a herf='#${ID}' class='menu__link' > ${section_name} </a>`;
        nav_list.appendChild(list);
    }
}

// Add class 'active' to section when near top of viewport
function active_section() {
    //Define the options for IntersectionObserver
 const options =  {
     root : null,
     threshold: 0.5,
    }
    //TODO: add 'your-active-class' class
    const callback = (entries, observer) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                entry.target.classList.add('your-active-class');
            } else {
                entry.target.classList.remove('your-active-class');} 
        });
    }
    //Define IntersectionObserver 
    const observer = new IntersectionObserver(callback, options);
    section.forEach((sec)=>{
        observer.observe(sec);
    });
} //End of active_section()

// Scroll to anchor ID using scrollTO event
function scroll_section() { 
    nav_list.addEventListener('click', function (event) {  
        event.preventDefault();
        const target = event.target.attributes.herf.nodeValue;
        for( let i=1 ; i <= section.length ; i++){
            const element = document.getElementById('section'+i);
            if ('#'+ element.id == target ){ 
                const y = space_top(element);
                window.scrollTo({
                    top: y ,
                    behavior: 'smooth',
                });
                break;
            }
        }
    }); // End of EventListner
} // End of scroll_section()
    

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
list_sections();
// Scroll to section on link click
scroll_section();
// Set sections as active
active_section();