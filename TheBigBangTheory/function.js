window.wordPageSize = 50;
window.currentPageNumber = 1;
var tempHide = "temporaryHideWords";

$(document).ready(function() {
	intPage();
});

function intPage() {
	temporaryHideWords();
	reloadPages();
}

function temporaryHideWords(){
	var tempString = localStorage[tempHide];
	if(tempString){
		var tempObject = JSON.parse(tempString);
		if(tempObject.length > 0){
			for(var i=0;i<tempObject.length;i++){
				commonWordHide.push(tempObject[i]);
			}
		}
	}
}

function reloadPages() {
	updateTableWithCurrentPage();
}

function previousPage(event) {
	event.preventDefault();
	if (currentPageNumber > 1) {
		currentPageNumber = currentPageNumber - 1;
	}
	updateTableWithCurrentPage();
}

function nextPage(event) {
	event.preventDefault();
	var words = getWordList(currentPageNumber + 1);
	if (words.length > 0) {
		currentPageNumber = currentPageNumber + 1;
		updateTable(words);
	} else {
		updateTableWithCurrentPage();
	}
}

function currentNumberValueChanged(event) {
	currentPageNumber = parseInt($(event.target).val());
	updateTableWithCurrentPage();
}

function getWordList(pageNumber) {
	var words = [];
	var count = 0;
	for (var i = 0; i < wordList.length; i++) {
		if (commonWordHide.indexOf(wordList[i].word) < 0) {
			count++;
			if (count > ((pageNumber - 1) * wordPageSize)) {
				wordList[i].index = i;
				words.push(wordList[i]);
			}
			if (count >= (pageNumber * wordPageSize)) {
				break;
			}
		}
	}
	return words;
}

function updateTableWithCurrentPage(){
	updateTable(getWordList(currentPageNumber));
}

function updateTable(words) {
	$(".currentPageNumber").html(currentPageNumber);
	$(".currentPageNumber").val(currentPageNumber);
	var container = $("#workListContainerTBody")[0];
	$(container).hide();
	container.innerHTML = "";
	for (var i = 0; i < words.length; i++) {
		var word = words[i];
		var text = word.word;
		if (typeof (text) != "string") {
			text = "" + text;
		}
		var textTd = document.createElement("td");
		var meaningTd = document.createElement("td");
		var hideColumn = document.createElement("td");
		var tableRow = document.createElement("tr");
		var textTag = "<a href='https://www.google.com/search?q="+text+"+meaning' target='_blank' style='color:#0000ff;'>"+text+"</a>"
		textTd.innerHTML = textTag;
		hideColumn.innerHTML = "<span>Hide</span>";
		textTd.classList.add("textColumn");
		meaningTd.classList.add("meaningColumn");
		hideColumn.classList.add("hideColumn");
		hideColumn.onclick = hideFunction;
		$(textTd).attr("data-word", text);
		tableRow.innerHTML = "<td>" + word.index + "</td>";
		tableRow.appendChild(textTd);
		tableRow.appendChild(meaningTd);
		tableRow.appendChild(hideColumn);
		$(tableRow).attr("data-index", i);
		appendDefinition(text, meaningTd);
		container.appendChild(tableRow);
	}
	$(container).show();
}

function hideFunction(event) {
	var tr = $(event.target).parents("tr");
	var word = $(tr.find(".textColumn")[0]).data("word");
	if (commonWordHide.indexOf(word) < 0) {
		$(tr).remove();
		commonWordHide.push(word);
		removeWordInLocalStorage(word);
		console.log(commonWordHide);
		if($("#workListContainerTBody tr").length < 10){
			updateTableWithCurrentPage();
		}
		// removeInFormData(word);
	}
}

function removeWordInLocalStorage(word){
	var tempString = localStorage[tempHide];
	var tempObject = [];
	if(!tempString){
		tempObject = [word];
	}
	else {
		tempObject = JSON.parse(tempString);
		tempObject.push(word);
	}
	localStorage[tempHide] = JSON.stringify(tempObject);
}

function removeInFormData(word) {
	var key = "1FAIpQLSfBxhs-DtQ07yQPIKmCfFhBchvCTFfi6ZXroZDyk0lHvdPeZg";
	$.ajax({
		url : "https://docs.google.com/forms/d/e/"+key+"/formResponse",
		data : { "entry.403631636" : word },
		type : "POST",
		dataType : "xml",
		statusCode : {
			0 : function() {
				console.log("removed inform"+0);
			},
			200 : function() {
				console.log("removed inform"+200);
			}
		}
	});
}

function appendDefinition(text, meaningTd) {
	var folder = text.substring(0, 1);
	var url = getUrl("Components/Dictionary/" + folder + "/" + text + ".xml");
	$.get(url, function(data) {
		try {
			var WordDefinition = $(data.documentElement).find("WordDefinition");
			if (WordDefinition.length > 0) {
				var definition = WordDefinition[0].textContent;
				var content = "<pre>" + definition + "</pre>";
				meaningTd.innerHTML = content;
			}
		} catch (e) {
			console.error(text);
			console.error(e);
			eee = data;
		}
	});
}

var localUrl = "../";
function getUrl(url) {
	return localUrl + url;
}
