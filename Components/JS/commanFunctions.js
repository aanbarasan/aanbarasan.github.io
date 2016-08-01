
$(document).ready(function () {

    $("body").on("click", function (event) {
        $(".layoutDropDownToggle").removeClass("layoutOpen");
    });
    $(".layoutDropDown .layoutDropDownMenu").on("click", function (event) {
        $(event.target).closest(".layoutDropDown").find(".layoutDropDownToggle").toggleClass("layoutOpen");
        event.stopPropagation();
    });

});