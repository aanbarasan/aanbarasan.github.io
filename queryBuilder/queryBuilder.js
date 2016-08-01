
var topics = {
    "database": { display:false,title: "Database", value: "database", divId: "databaseDIV", textid: "databaseTextID", textcontentID: "databaseContentID", dynamicValues: [] },
    "connection": { display: false, title: "Connections", value: "connection", divId: "connectionDIV", textid: "connectionTextID", textcontentID: "connectionContentID", dynamicValues: [] },
    "table": { display: true, title: "Tables", value: "table", divId: "tableDIV", textid: "tableTextID", textcontentID: "tableContentID", dynamicValues: [] }
};
var columns = { oldColumns: [], newColumns: [] };
$(document).ready(function () {
    var ke = Object.keys(topics);
    for (var i = 0; i < ke.length; i++) {
        appendConditions(topics[ke[i]]);
    }
});
function addConditions(id) {
    $("#addToggle").hide();
    if (topics[id].display == false) {
        if (topics[id]) {
            topics[id].display = true;
            appendConditions(topics[id]);
        }
    }
}

function addValuesInConditionKey(event, value) {
    if (event.keyCode == 13) {
        event.preventDefault();
        addValuesInCondition(value);
    }
}
function addValuesInCondition(value) {
    if (value == "oldcolumns") {
        var val = $("#oldColumnsTextID").val().split('\n');
        for (var i = 0; i < val.length; i++) {
            if (!(val[i].trim() == "" && i>0 && i>=val.length-1)) {
                var valID = "oldColumnscont_" + columns.oldColumns.length;
                $("#oldColumnsTextID").val('');
                columns.oldColumns.push({ val: val[i], valID: valID });
                $("#oldColumnsContentID").append('<div id="' + valID + '">' + val[i] + '<span class="closeButton" onclick="closeContentList(\'' + valID + '\',\'' + value + '\')" style="margin-left:10px;">&times;</div>');
            }
        }
    }
    else if (value == "newcolumns") {
        var val = $("#newColumnsTextID").val().split('\n');
        for (var i = 0; i < val.length; i++) {
            if (!(val[i].trim() == "" && i > 0 && i >= val.length - 1)) {
                var valID = "newColumnscont_" + columns.newColumns.length;
                $("#newColumnsTextID").val('');
                columns.newColumns.push({ val: val[i], valID: valID });
                $("#newColumnsContentID").append('<div id="' + valID + '">' + val[i] + '<span class="closeButton" onclick="closeContentList(\'' + valID + '\',\'' + value + '\')" style="margin-left:10px;">&times;</div>');
            }
        }
    }
    else {
        if (topics[value].display == true) {
            if (topics[value]) {
                var val = $("#" + topics[value].textid).val().split('\n');
                for (var i = 0; i < val.length; i++) {
                    if (val[i].trim() != "") {
                        var valID = topics[value].textcontentID + "cont_" + topics[value].dynamicValues.length;
                        $("#" + topics[value].textid).val('');
                        topics[value].dynamicValues.push({ val: val[i], valID: valID });
                        $("#" + topics[value].textcontentID).append('<div id="' + valID + '">' + val[i] + '<span onclick="closeContentList(\'' + valID + '\',\'' + value + '\')" class="closeButton" style="margin-left:10px;">&times;</div>');
                    }
                }
            }
        }
    }
}
function generateQueries() {
    $("#queriesTextAreaID").val('');
    var columnsName = $("#newColumnName").val();
    var queries = [];
    var paths = [];
    var tables= [];
    var connection = [".."];
    var database=[""];
    if (topics.table.display == true) {
        for (var i = 0; i < topics.table.dynamicValues.length; i++) {
            tables.push(topics.table.dynamicValues[i].val);
        }
    }
    if (topics.connection.display == true) {
        connection = [];
        for (var j = 0; j < topics.connection.dynamicValues.length; j++) {
            connection.push(topics.connection.dynamicValues[j].val);
        }
    }
    if (topics.database.display == true) {
        database = [];
        for (var i = 0; i < topics.database.dynamicValues.length; i++) {
            for (var j = 0; j < connection.length; j++) {
                database.push(topics.database.dynamicValues[i].val + connection[j]);
            }
        }
    }
    for (var i = 0; i < database.length; i++) {
        for (var k = 0; k < tables.length; k++) {
            paths.push(database[i] + tables[k]);
        }
    }
    for (var i = 0; i < paths.length; i++) {
        for (j = 0; (j < columns.oldColumns.length || j < columns.newColumns.length) ; j++) {
            queries.push("update " + paths[i] + " set " + columnsName + "='" + (columns.newColumns[j] ? columns.newColumns[j].val : '')
                + "' where " + columnsName + "='" + (columns.oldColumns[j] ? columns.oldColumns[j].val : '') + "';");
        }
    }
    $("#queriesTextAreaID").val(queries.join("\n"));
}
function appendConditions(data) {
    if (data.display == true) {
        $("#columnUpdates").append('<div class="FL layoutFlows" id="' + data.divId + '"> ' +
                '     <div class="FL layoutFlowsHeading">                   ' +
                '         ' + data.title + '                                          ' +
                '         <span class="closeButton" style="" onclick="closeContent(\'' + data.divId + '\',\'' + data.value + '\')">&times;</span>         ' +
                '     </div>                                                ' +
                '     <div class="FL layoutFlowsContent">                   ' +
                '         <div class="FL" style="width:100%;">              ' +
                '             <textarea style="width:100px;" id="' + data.textid + '" onkeydown="addValuesInConditionKey(event,\'' + data.value + '\')"></textarea>    ' +
                '             <input type="button" value="Add" onclick="addValuesInCondition(\'' + data.value + '\')"/>           ' +
                '         </div>                                            ' +
                '         <div class="FL layoutDynamicList" id="' + data.textcontentID + '">' +
                '                                                           ' +
                '         </div>                                            ' +
                '     </div>                                                ' +
                ' </div>');
    }
}
function closeContentList(id,value) {
    if (value == "oldcolumns") {
        for (var j = 0; j < columns.oldColumns.length; j++) {
            if (columns.oldColumns[j].valID == id) {
                columns.oldColumns.splice(j, 1);
                var a = document.getElementById(id);
                if (a) {
                    a.remove();
                }
                break;
            }
        }
    }
    else if (value == "newcolumns") {
        for (var j = 0; j < columns.newColumns.length; j++) {
            if (columns.newColumns[j].valID == id) {
                columns.newColumns.splice(j, 1);
                var a = document.getElementById(id);
                if (a) {
                    a.remove();
                }
                break;
            }
        }
    }
    else {
        if (topics[value].display == true) {
            if (topics[value]) {
                for (var j = 0; j < topics[value].dynamicValues.length; j++) {
                    if (topics[value].dynamicValues[j].valID == id) {
                        topics[value].dynamicValues.splice(j, 1);
                        var a = document.getElementById(id);
                        if (a) {
                            a.remove();
                        }
                        break;
                    }
                }
            }
        }
    }
}

function closeContent(id,value) {
    if (topics[value].display == true) {
        if (topics[value]) {
            topics[value].display = false;
            topics[value].dynamicValues = [];
            var a = document.getElementById(id);
            if (a) {
                a.remove();
            }
        }
    }
}
