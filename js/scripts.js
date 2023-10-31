// Script button for back-to-top button
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
    $('html, body').animate({scrollTop:0}, '300');
});


// Script button for toggle theme (dark/light)
function toggleTheme() {
    const bodyEl = document.body;
    const buttonEl = document.querySelector('button');

    if (bodyEl.classList.contains('light-theme')) {
        bodyEl.classList.remove('light-theme');
        bodyEl.classList.add('dark-theme');
        buttonEl.classList.remove('light-theme');
        buttonEl.classList.add('dark-theme');
        buttonEl.innerText = '☀️';
    } else {
        bodyEl.classList.remove('dark-theme');
        bodyEl.classList.add('light-theme');
        buttonEl.classList.remove('dark-theme');
        buttonEl.classList.add('light-theme');
        buttonEl.innerText = '🌙';
    }
}


// Handle scroll event to hide/show button
window.addEventListener('scroll', function() {
    const buttonEl = document.querySelector('button');
    if (window.scrollY > 0) {
        buttonEl.style.display = 'none';
    } else {
        buttonEl.style.display = 'block';
    }
});


// Dark/Light theme based on time
document.addEventListener('DOMContentLoaded', function() {
    const buttonEl = document.querySelector('button');
    var currentHour = new Date().getHours();

    // Dark theme is used between 8 PM of last day
    // to 6 AM next day. Otherwise, use light theme
    if (currentHour >= 20 || currentHour < 6) {
        document.body.classList.add('dark-theme');
        buttonEl.classList.add('dark-theme');
        buttonEl.innerText = '☀️';
    } else {
        document.body.classList.add('light-theme');
        buttonEl.classList.add('light-theme');
        buttonEl.innerText = '🌙';
    }
});


// Automatically update year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear();
