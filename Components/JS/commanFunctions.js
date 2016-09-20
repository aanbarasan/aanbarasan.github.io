function checkBoolean(str) {
    if (str == "true") {
        return true;
    }
    else {
        return false;
    }
}
function clearThisPageLocalStorage() {
    localStorage.singleClickEnabledLocal = "";
    localStorage.enterToNextTabLocal = "";
    localStorage.useMultipleQueryGenLocal = "";
    localStorage.dynamicColumnsHeadLocal = "";
    localStorage.maintainCacheEnabledLocal = "";
    localStorage.newColumnsDataContentsLocal = "undefinedDatatypescrtag";
    localStorage.CommonBackColorContentsLocal = "undefinedDatatypescrtag";
}
function reloadPage() {
    window.location.reload();
}

$(document).ready(function () {});