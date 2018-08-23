var localUrl = "../";
function getUrl(url){
    return localUrl + url;
}

$(document).ready(function(){
    var container = $("#workListContainerTBody")[0];
    for(var i=0;i<100;i++){
        var word = wordList[i];
        var text = word.word;
        if(typeof(text) != "string"){
            text = "" + text;
        }
        if(commonWordHide.indexOf(text) >= 0){
        	continue;
        }
        var textTd = document.createElement("td");
        var meaningTd = document.createElement("td");
        var hideColumn = document.createElement("td");
        var tableRow = document.createElement("tr");
        textTd.append(text);
        hideColumn.innerHTML = "<span>Hide</span>";
        textTd.classList.add("textColumn");
        meaningTd.classList.add("meaningColumn");
        hideColumn.classList.add("hideColumn");
        hideColumn.onclick = hideFunction;
        $(textTd).data("word", text);
        tableRow.appendChild(textTd);
        tableRow.appendChild(meaningTd);
        tableRow.appendChild(hideColumn);
        appendDefinition(text, meaningTd);
        container.appendChild(tableRow);
    }
});

function hideFunction(event){window.event = event;
	var tr=$(event.target).parents("tr");
	var word=$(tr.find(".textColumn")[0]).data("word");
	if(commonWordHide.indexOf(word) < 0){
		$(tr).remove();
		commonWordHide.push(word);
		console.log(commonWordHide);
	}
}

function appendDefinition(text, meaningTd){
	var folder = text.substring(0,1);
    var url = getUrl("Components/Dictionary/"+folder+"/"+text+".xml");
    $.get(url,function(data){
    	try{
    		var WordDefinition = $(data.documentElement).find("WordDefinition");
    		if(WordDefinition.length > 0){
                var definition = WordDefinition[0].textContent;
                var content = "<pre>" + definition + "</pre>";
                meaningTd.innerHTML = content;
    		}
    	}
    	catch(e){
    		console.error(text);
    		console.error(e);
    		eee = data;
    	}
    });
}
