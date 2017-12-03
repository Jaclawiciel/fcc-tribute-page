$window = $(window);

var voyagerContainer = $(".voyager-container");
var isVoyagerContainerVisible;
var voyagerImage = $("#voyager-img");
voyagerImage.hide();

$window.scroll(function () {
    isVoyagerContainerVisible = voyagerContainer.visible();
    if (isVoyagerContainerVisible) {
        console.log("true");
        voyagerImage.toggleClass("voyager-img-animate", true);
        voyagerImage.show();
    }
});