var headerHeight = 93;
var completedUsers = 10;

var lang = window.navigator.userLanguage || window.navigator.language ;     
var relang = lang.toLowerCase();

// introduction slide
var slideIndex = 1;
showDivs(slideIndex);

$(document).ready(function() {
    // language detect and render corresponding language
    renderLanguageText(relang);
    // animation
    $(document).on("scroll", onScroll);

    // Join us link to form animation
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll-top').bind('click', function(event) {
        $('html, body').stop(true, false).animate({
            scrollTop: 0
        }, 800, 'easeOutCubic');
        event.preventDefault();
    });

    $('a.page-scroll').bind('click', function(event) {
        $('a.page-scroll').removeClass("active");
        $(this).addClass("active");
        var $anchor = $(this);
        var sectionPosition = $($anchor.attr('href')).offset().top;
        var sectionPositionWithHeader = sectionPosition - headerHeight;
        $('html, body').stop(true, false).animate({
            scrollTop: sectionPositionWithHeader
        }, 800, 'easeOutCubic');
        event.preventDefault();
    });
});

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var slides = $(".introduction-slide");
    var prev = $('.prev-button');
    var next = $('.next-button');
    if (n >= slides.length) { 
        next.hide();
        slideIndex = slides.length;
    } else if (n <= 1) { 
        prev.hide();
        slideIndex = 1;
    } else {
        prev.show();
        next.show();
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

// language-switch-button dropup animation
$('.language-switch-button').bind('click', function(event) {
    $(this).toggleClass('clicked');
    $('.language-switch-content').toggleClass('hidden');
});

$('.language').bind('click', function(event) {
    var chosen_language = $(this).attr("value");
    renderLanguageText(chosen_language);
    $('.language-switch-button').toggleClass('clicked');
    $('.language-switch-content').toggleClass('hidden');
    $('html, body').stop(true, false).animate({
        scrollTop: 0
    }, 500, 'easeOutCubic');
});

function onScroll(event){
    var scrollPos = $(document).scrollTop() + headerHeight;
    $('.side-nav a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('side-nav a').removeClass("active");
            currLink.addClass("active");
        }
        else {
            currLink.removeClass("active");
        }
    });
}