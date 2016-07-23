var headerHeight = 93;

// render language
var lang = window.navigator.userLanguage || window.navigator.language ;     
var relang = lang.toLowerCase();

// introduction slide
var slideIndex = 1;
var isSlideUp = false;

$(document).ready(function() {
    // language detect and render corresponding language
    renderLanguageText(relang);

    // Ludo logo move to top animation
    $('a.page-scroll-top').bind('click', function(event) {
        $('html, body').stop(true, false).animate({
            scrollTop: 0
        }, 800, 'easeOutCubic');
        event.preventDefault();
    });

    // side nav bar scroll animation invoke
    $(document).on("scroll", onScroll);
    // side nav bar click animation
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

    // Join us button link to form animation
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

    // initialize the slide 
    initialSlides();
    // mobile pan event handler on slide
    panSlides()
});



/* slides */
// show the first introduction slide
function initialSlides() {
    $(".introduction-slide").hide();
    $(".introduction-slide").eq(0).show();
    $('.left-button').hide();
    slideIndex = 1;
}
// introduction slide animation
function plusDivs(n) {
    showDivs(slideIndex += n);
}
// introduction slide animation
function showDivs(n) {
    var i;
    var slides = $(".introduction-slide");
    var screen_width = screen.width;
    size_of_slides = $(".introduction-slides").length;
    var cur_slide;
    var left = $('.left-button');
    var right = $('.right-button');
    if (n >= slides.length) { 
        right.hide();
        slideIndex = slides.length;
    } else if (n <= 1) { 
        left.hide();
        slideIndex = 1;
    } else {
        if (screen_width > 768) {
            left.show();
            right.show();
        }
    }
    for (i = 0; i < slides.length; i++) {
        slides.hide();
    }
    slides.eq(slideIndex - 1).css("display", "block");
}
// mobile pan event handler on slide
function panSlides() {
    var myElement = document.getElementById('introduction-slides');
    // create a simple instance
    // by default, it only adds horizontal recognizers
    var mc = new Hammer(myElement);

    // listen to events...
    mc.on("panleft", function(ev) {
        plusDivs(1);
    });
    mc.on("panright", function(ev) {
        plusDivs(-1);
    });
}



/* language switch */
// language-switch-button dropup animation
$('.language-switch-button').bind('click', function(event) {
    $(this).toggleClass('clicked');
    $('.language-switch-content').toggleClass('hidden');
});

// language switch click animation
$('.language').bind('click', function(event) {
    var chosen_language = $(this).attr("value");
    renderLanguageText(chosen_language);
    $('.language-switch-button').toggleClass('clicked');
    $('.language-switch-content').toggleClass('hidden');
    $('html, body').stop(true, false).animate({
        scrollTop: 0
    }, 500, 'easeOutCubic');
    initialSlides();
});



/* side nav */
// side nav bar scroll animation
function onScroll(event) {
    var scrollPos = $(document).scrollTop() + headerHeight;
    $('.side-nav-buttons a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('side-nav-buttons a').removeClass("active");
            currLink.addClass("active");
        }
        else {
            currLink.removeClass("active");
        }
    });
}