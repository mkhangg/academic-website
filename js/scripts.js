// Back-to-top button
var btn = $('#back-to-top-button');

$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});

btn.on('click', function(e) {
    e.preventDefault();
    const speechBalloon = document.querySelector('.speech-balloon');
    const clickSound = new Audio('assets/sounds/collision_sound.wav');
    $('html, body').animate({scrollTop:0}, '300');
    speechBalloon.innerText = 'back to top!';
    clickSound.play();
});


// Change the text interchangably "See More" and "See Less"
function toggleText(linkElement) {
    var collapseId = linkElement.getAttribute('href').substring(1);
    var collapseElement = document.getElementById(collapseId);

    $(collapseElement).on('hidden.bs.collapse', function () {
        linkElement.textContent = '... See More';
    });
    $(collapseElement).on('shown.bs.collapse', function () {
        linkElement.textContent = '... See Less';
    });
}


// Initialize the toggleText function for each link
document.querySelectorAll('[data-toggle="collapse"]').forEach(function (linkElement) {
    toggleText(linkElement);
});



// Scroll to top of a div based on its tag
function scrollToTopDiv(divTag) {
    $(divTag)[0].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}


// Button for toggle theme (dark/light)
function toggleTheme() {
    const bodyEl = document.body;
    const buttonEl = document.querySelector('.toggle-theme-button');
    const speechBalloon = document.querySelector('.speech-balloon');
    const clickSound = new Audio('assets/sounds/switch_sound.wav');

    if (bodyEl.classList.contains('light-theme')) {
        bodyEl.classList.remove('light-theme');
        bodyEl.classList.add('dark-theme');
        buttonEl.classList.remove('light-theme');
        buttonEl.classList.add('dark-theme');
        buttonEl.innerText = '☀️';
        speechBalloon.innerText = 'lights turned off!';
        clickSound.play();
    } else {
        bodyEl.classList.remove('dark-theme');
        bodyEl.classList.add('light-theme');
        buttonEl.classList.remove('dark-theme');
        buttonEl.classList.add('light-theme');
        buttonEl.innerText = '🌙';
        speechBalloon.innerText = 'lights turned on!';
        clickSound.play();
    }
}


// Handle scroll event to hide/show back-to-top and toggle theme button
window.addEventListener('scroll', function() {
    const buttonEl = document.querySelector('.toggle-theme-button');
    if (window.scrollY > 0) {
        buttonEl.style.display = 'none';
    } else {
        buttonEl.style.display = 'block';
    }
});


// Owl carousel for updates
function initializeOwlCarousel() {
    $('.owl-carousel').owlCarousel({
        loop: false,
        rewind: false,
        margin: 10,
        nav: true,
        dots: false,
        lazyLoad: false,
        slideBy: 'page',
        responsive: {
            0: {items: 1.75},
            600: {items: 3},
            900: {items: 5},
            1200: {items: 6}
        }
    });
}

// Touch and mouse event listeners
let isDragging = false;
let isMobile = 'ontouchstart' in window;
let startEvent = isMobile ? 'touchstart' : 'mousedown';
let moveEvent = isMobile ? 'touchmove' : 'mousemove';
let endEvent = isMobile ? 'touchend' : 'mouseup';


// Capture mouse down (desktop) or touch start (mobile) events
popupIconContainer.addEventListener(startEvent, (e) => {
    e.preventDefault();
    isDragging = true;
    let clientX = isMobile ? e.touches[0].clientX : e.clientX;
    let clientY = isMobile ? e.touches[0].clientY : e.clientY;

    startX = clientX;
    startY = clientY;
    originalX = popupIconContainer.getBoundingClientRect().left;
    originalY = popupIconContainer.getBoundingClientRect().top;
    dismissalArea.style.display = 'flex';
    
    // Hide the speech balloon as users start dragging and drag the icon
    document.querySelector('.speech-balloon').classList.add('hidden');
});


// Capture mouse move (desktop) or touch move (mobile) events
document.addEventListener(moveEvent, (e) => {
    if (!isDragging) {
        return;
    }
    
    let clientX = isMobile ? e.touches[0].clientX : e.clientX;
    let clientY = isMobile ? e.touches[0].clientY : e.clientY;

    let x = originalX + (clientX - startX);
    let y = originalY + (clientY - startY);
    popupIconContainer.style.left = `${x}px`;
    popupIconContainer.style.bottom = `calc(100% - ${y}px - ${popupIconContainer.offsetHeight}px)`;
});


// Capture mouse up (desktop) or touch end (mobile) events
document.addEventListener(endEvent, (e) => {
    const clickSound = new Audio('assets/sounds/disappear_sound.wav');

    if (!isDragging) {
        return;
    }

    let clientX = isMobile ? e.changedTouches[0].clientX : e.clientX;
    let clientY = isMobile ? e.changedTouches[0].clientY : e.clientY;
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight;

    // Check if icon is near the middle bottom dismissal area
    if (Math.abs(clientX - centerX) < 50 && Math.abs(clientY - centerY) < 100) {
        popupIconContainer.classList.add('hidden');
        clickSound.play();
    }

    dismissalArea.style.display = 'none';
    isDragging = false;
});


// Hide speech balloon when scrolling down
window.addEventListener('scroll', function() {
    let scrollPosition = window.scrollY || document.documentElement.scrollTop;
    if (scrollPosition > 300) {
        document.querySelector('.speech-balloon').classList.add('hidden');
    } else {
        document.querySelector('.speech-balloon').classList.remove('hidden');
    }
});


// Update progress bar as user scrolls down
window.onscroll = function() {progressBar()};

function progressBar() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
}


// Get all filter buttons and change their active status as user clicks
var filterButtons = document.querySelectorAll('#filters .filter-button'); 
var speechBalloon = document.querySelector('.speech-balloon');
filterButtons.forEach(function(filterButton) {
    filterButton.addEventListener('click', function() {
        filterButtons.forEach(function(flrbtn) {
            flrbtn.classList.remove('active');
        });
        this.classList.add('active');
        if (this.textContent === "perception + manipulation") {
            speechBalloon.innerText = 'see RoPM projects!';
        } else {
            speechBalloon.innerText = 'see ' + this.textContent + ' projects!';
        }
        speechBalloon.classList.remove('hidden');
    });
});


// Function to update Isotope layout with smooth transitions
function updateLayout(collapseElement, isExpanding) {
    
    // Initialize Isotope with vertical layout
    var iso = new Isotope('#projects', {
        itemSelector: '.project',
        layoutMode: 'vertical'
    });

    if (isExpanding) {
        $(collapseElement).css('display', 'none');
        iso.arrange();
        setTimeout(function() {
            $(collapseElement).css('display', '');
            iso.arrange();
        }, 300);
    } else {
        iso.arrange();
        setTimeout(function() {
            $(collapseElement).css('display', 'none');
            iso.arrange();
        }, 300);
    }
}


// Bind updateLayout function to the collapsible elements' events
$('.collapse').on('show.bs.collapse', function () {
    updateLayout(this, true);
}).on('hide.bs.collapse', function () {
    updateLayout(this, false);
});


// Modified from https://codepen.io/SohRonery/pen/wvvBLyP
var itemsPerPageDefault = 5;
var currentNumberPages = 1;
var currentPage = 1;
var currentFilter = '*';
var filterAtribute = 'data-filter';
var pageAtribute = 'data-page';
var pagerClass = 'isotope-pager';
var $projects = $('#projects').isotope({
    itemcategory: '.project',
    layoutMode: 'vertical'
});


// Filter based on input category
function filterCategory(category) {
    $projects.isotope({
        filter: category
    });
}


// Determine items to be categorized and displayed per page
function showPage(n) {
    currentPage = n;
    var category = '.project';
        category += ( currentFilter != '*' ) ? '[' + filterAtribute + '="' + currentFilter + '"]' : '';
        category += '[' + pageAtribute + '="' + currentPage+'"]';
    filterCategory(category);
}


// Update pager indicator when user clicks previous or next button, and disable buttons as needed
function updatePager() {
    var $isotopePager = ($('.' + pagerClass).length == 0 ) ? $('<div class="' + pagerClass + '"></div>') : $('.' + pagerClass);
    $isotopePager.html('');

    var $previous = $('<button class="pager" id="previous-page">&#8592; previous</button>');
    $previous.click(function() {
        if (currentPage > 1) {
            showPage(currentPage - 1);
            updatePager();
            scrollToTopDiv('#research');
        }
    });
    if (currentPage === 1) {
        $previous.prop('disabled', true);
    }
    
    var $next = $('<button class="pager" id="next-page">next &#8594;</button>');
    $next.click(function() {
        if (currentPage < currentNumberPages) {
            showPage(currentPage + 1);
            updatePager();
            scrollToTopDiv('#research');
        }
    });
    if (currentPage === currentNumberPages) {
        $next.prop('disabled', true);
    }

    var $currentPageIndicator = $('<span class="current-page">&nbsp; page ' + currentPage + ' of ' + currentNumberPages + ' &nbsp; </span>');
    
    $previous.appendTo($isotopePager);
    $currentPageIndicator.appendTo($isotopePager);
    $next.appendTo($isotopePager);
    $projects.after($isotopePager);
}


// Set pagination
function setPagination() {
    var SettingsPagesOnItems = function() {
        var itemsLength = $projects.children('.project').length;
        var pages = Math.ceil(itemsLength / itemsPerPageDefault);
        var item = 1;
        var page = 1;
        var category = '.project';
            category += ( currentFilter != '*' ) ? '[' + filterAtribute + '="' + currentFilter + '"]' : '';
        
        $projects.children(category).each(function() {
            if (item > itemsPerPageDefault) {
                page++;
                item = 1;
            }
            $(this).attr(pageAtribute, page);
            item++;
        });
        currentNumberPages = page;
    }();

    updatePager();
}


function initializeIsotope() {
    // Set number of pages, return to first page,
    setPagination();
    showPage(1);


    // Filter projects based on category, including change active buttons, filter projects, 
    // set the number of pages, return to the first page, and update the pager indicator 
    $('#filters .filter-button').click(function() {
        $('#filters .filter-button').removeClass('active');
        $(this).addClass('active');
        var filter = $(this).attr('data-filter');
        currentFilter = filter;
        setPagination();
        showPage(1);
        updatePager();
    });
}


// // Guarantee correct layouts when all web resources are fully loaded 
// This version is slow --> only re-layout when all the gifs are fully loaded
// $(window).on('load', function() {
//     initializeOwlCarousel();
//     initializeIsotope();
// });
// This version is faster --> re-layout when all the images are fully loaded not neccessarily all the gifs
$(document).ready(function() {
    var Images = $('img[src$=".jpg"], img[src$=".jpeg"], img[src$=".png"]').get();
    var imageLoadPromises = Images.map(function(img) {
        return new Promise(function(resolve) {
            if (img.complete) {
                resolve();
            } else {
                img.onload = resolve;
            }
        });
    });

    Promise.all(imageLoadPromises).then(function() {
        initializeOwlCarousel();
        initializeIsotope();
    });
});


// Dark/Light theme based on predefined time
document.addEventListener('DOMContentLoaded', function() {
    const buttonEl = document.querySelector('.toggle-theme-button');
    const speechBalloon = document.querySelector('.speech-balloon');
    var currentHour = new Date().getHours();

    // Dark theme is used between 7 PM of last day
    // to 7 AM next day. Otherwise, use light theme
    if (currentHour >= 19 || currentHour < 7) {
        document.body.classList.add('dark-theme');
        buttonEl.innerText = '☀️';
        speechBalloon.innerText = 'it\'s night, lights off!';
    } else {
        document.body.classList.add('light-theme');
        buttonEl.innerText = '🌙';
        speechBalloon.innerText = 'it\'s day, lights on!';
    }
});


// Automatically update year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear();


// Canvas for particle moves
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const particles = [];


// Resize canvas width and height
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();


// Class for Particle
class Particle {
    
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.color = 'rgba(255, 255, 255, ' + 0.7 + ')';
        this.lifespan = 100;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.color = 'rgba(255, 255, 255, ' + this.lifespan--/100 + ')';

        if (this.lifespan <= 0) {
            this.reset();
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}


// Initialize 101 particles
for (let i = 0; i < 101; i++) {
    particles.push(new Particle());
}


// Make the particles move
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
    });

    requestAnimationFrame(animate);
}


// Animate the particles
animate();
