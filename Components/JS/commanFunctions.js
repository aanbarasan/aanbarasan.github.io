function checkBoolean(str) {
	if (str == "true") {
		return true;
	} else {
		return false;
	}
}

function toggleVisblityForId(arg) {
	for (var i = 0; i < arg.length; i++) {
		var id = arg[i];
		$("#" + id).toggle();
	}
}

function getSpace(count) {
	var spaceText = "";
	for (var i = 0; i < count; i++) {
		spaceText = spaceText + " ";
	}
	return spaceText;
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

$(document).ready(function() {
});