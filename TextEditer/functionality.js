$(document).ready(function () {
    var option = {};
    option.color = "Red";
    option.objects = [{ textArray: ["var", "for"], condition: "Contains", color: "green" },
                    { textArray: ["(", ")"], condition: "Equals", color: "violet" }];
    $("#textareaViusalize").TextEditer(option);
});