var gitHubUrl = "https://anbarasanmbbs.github.io/";
var localUrl = "../";
var commanUrl = gitHubUrl;
// var commanUrl = localUrl;
function getUrl(url){
    return commanUrl + url;
}

$(document).ready(function(){
    var container = $("#workListContainer")[0];
    console.log(container);
    for(var i=0;i<10;i++){
        var word = wordList[i];
        var text = word.word;
        if(typeof(text) != "string"){
            text = "" + text;
        }
        var textTd = document.createElement("td");
        var meaningTd = document.createElement("td");
        textTd.append(text);
        var folder = text.substring(0,1);
        var url = getUrl("Components/Dictionary/"+folder+"/"+text+".xml");
        $.get(url,function(data){
            console.log(data);
        });


        var tableRow = document.createElement("tr");
        tableRow.appendChild(textTd);
        tableRow.appendChild(meaningTd);
        container.appendChild(tableRow);
    }

});