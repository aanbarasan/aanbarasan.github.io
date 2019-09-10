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
	trackClientLocation();
});

var countVersionClick = 0;
function versionTextClick(){
	countVersionClick ++;
	if(countVersionClick > 10){
		localStorage["donottrackonthispage"] = "true";
		alert("Do not track enabled");
	}
}

window.trackClientLocationWhenAvailable = false;
function trackClientLocation(){
	if(window.trackClientLocationWhenAvailable){
		if(localStorage["donottrackonthispage"] != "true"){
			$.getJSON('https://ipapi.co/json', function(data) {
				var locationDetails = JSON.stringify(data);
				var timeDetails = new Date().toString();
				var key = "1FAIpQLSerdMMu3Q7SCZNT8XTM_VkkGhrRswve7fzZxp1wNIsd-i7CFw";
				$.ajax({
					url : "https://docs.google.com/forms/d/e/"+key+"/formResponse",
					data : { "entry.2018069319" : locationDetails, "entry.74893816" : timeDetails },
					type : "POST",
					dataType : "xml",
					statusCode : {
						200 : function() {
							console.log("upated");
						}
					}
				});
			});
		}
	}
}
