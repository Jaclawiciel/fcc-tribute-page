$window = $(window);

var earthContainer = $(".earth-container");
var earthContainerTopPosition;
var earthContainerBottomPosition;
var earthContainerHeight;
var earthImage = $(".earth-img");

var quoteContainer = $(".quote");
var quoteTopPosition;
var quoteBottomPosition;

function lineBreak() {
    console.log("----------------------------------");
}

function goToTop() {
    window.scrollTo(0, 0);
}

function fixedPositionOn(element) {
    element.toggleClass("fixed", true);
}

function removeFixedPositionOn(element) {
    element.toggleClass("fixed", false);
}

function addMarginToQuote() {
    quoteContainer.toggleClass("margin-top", true);
}

function removeMarginFromQuote() {
    quoteContainer.toggleClass("margin-top", false);
}

function show(element) {
    $(element).show();
}

function hide(element) {
    $(element).hide();
}

function offsetBottom(el, i) { i = i || 0; return el[i].getBoundingClientRect().bottom }

function calculateElementsPosition() {
    earthContainerTopPosition = earthContainer.position().top;
    earthContainerBottomPosition = offsetBottom(earthContainer);
    earthContainerHeight = earthContainerBottomPosition - earthContainerTopPosition;
    quoteTopPosition = quoteContainer.position().top;
    quoteBottomPosition = offsetBottom(quoteContainer);
}

function scale(element, currentPosition) {
    var max = quoteBottomPosition - quoteTopPosition;
    var current = (currentPosition + earthContainerHeight) - quoteTopPosition;
    var percentage = current / max;
    var scale = (1 - percentage);
    if (scale > 0) {
        element.css("transform", "scale(" + scale + ")");
    }
}

window.onload = function () {
    goToTop();
    calculateElementsPosition();
}


$window.resize(function () {
    removeFixedPositionOn(earthContainer);
    removeMarginFromQuote();
    goToTop();
    calculateElementsPosition();
});

$window.scroll(function () {
    var currentPosition = $window.scrollTop();
    if (currentPosition >= earthContainerTopPosition && currentPosition < quoteBottomPosition) {
        fixedPositionOn(earthContainer);
        addMarginToQuote();
        show(earthContainer);
        scale(earthImage, currentPosition);
    } else if (currentPosition < earthContainerTopPosition) {
        removeFixedPositionOn(earthContainer);
        removeMarginFromQuote();
    } else if (currentPosition > quoteBottomPosition) {
        hide(earthContainer);
    }
});