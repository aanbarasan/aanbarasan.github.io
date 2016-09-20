$(document).ready(function () {
    runResult();
});
function runResult() {
    var data = $("#simpleTextArea").val();
    eval(data);
}