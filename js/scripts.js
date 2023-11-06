// Back-to-top button
var btn = $('#button');

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


// Button for toggle theme (dark/light)
function toggleTheme() {
    const bodyEl = document.body;
    const buttonEl = document.querySelector('button');
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
    const buttonEl = document.querySelector('button');
    if (window.scrollY > 0) {
        buttonEl.style.display = 'none';
    } else {
        buttonEl.style.display = 'block';
    }
});


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


// Dark/Light theme based on predefined time
document.addEventListener('DOMContentLoaded', function() {
    const buttonEl = document.querySelector('button');
    const speechBalloon = document.querySelector('.speech-balloon');
    var currentHour = new Date().getHours();

    // Dark theme is used between 8 PM of last day
    // to 6 AM next day. Otherwise, use light theme
    if (currentHour >= 20 || currentHour < 6) {
        document.body.classList.add('dark-theme');
        buttonEl.classList.add('dark-theme');
        buttonEl.innerText = '☀️';
        speechBalloon.innerText = 'it\'s night, lights off!';
    } else {
        document.body.classList.add('light-theme');
        buttonEl.classList.add('light-theme');
        buttonEl.innerText = '🌙';
        speechBalloon.innerText = 'it\'s day, lights on!';
    }
});


// Automatically update year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear();
