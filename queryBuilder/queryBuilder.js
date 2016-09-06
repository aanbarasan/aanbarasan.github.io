var app = angular.module("QueryBuilder", []);

app.controller("QueryBuilderCtrl", function ($scope) {
    window.$scope = $scope;
    $scope.dynamicColumnsHead = [{ headingID: "old_col", headingText: "Old_Column", replace_data: "<<Before_Column>>", replace_head: "<<Before_Column_Name>>", updateContents: "UPDATE Table_Name SET ColumnName='" },
                        { headingID: "new_col", headingText: "New_Column", replace_data: "<<After_Column>>", replace_head: "<<After_Column_Name>>", updateContents: "' WHERE ColumnName='" }];
    $scope.dynamicColumnsRow = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
    $scope.dynamicRowsHead = [{ headingID: "table", headingText: "Table_Name",replace_data:"<<Table_Name>>" }]
    $scope.dynamicRowsRow = [];
    $scope.editEnable = false;
    $scope.newColumnsDataContents = "';";

    $scope.mapp = {
        row: { head: $scope.dynamicRowsHead, data: $scope.dynamicRowsRow },
        column: { head: $scope.dynamicColumnsHead, data: $scope.dynamicColumnsRow }
    };

    for (var i = 0; i < 1; i++) {
        $scope.mapp.row.data.push({ old_col: { value: '', edit: false }, new_col: { value: '', edit: false } });
    }
    for (var i = 0; i < 1; i++) {
        $scope.mapp.column.data.push({ table: { value: '', edit: false } });
    }

    $scope.addColumnHeader = function () {
        $scope.mapp.column.head.push({ headingID: "new_Column_header" + ($scope.mapp.column.head.length), headingText: "New Columns" + $scope.mapp.column.head.length, updateContents: $scope.newColumnsDataContents });
        $scope.newColumnsDataContents = "";
    }

    $scope.editHeadFunctionCall = function (ind, type, core, eve) {
        $scope.editEnable = true;
        if ($scope.mapp[core].head[ind]) {
        }
        else {
            $scope.mapp[core].head[ind] = {};
        }
        $scope.mapp[core].head[ind].edit = true;
        setTimeout(function () {
            $scope.$apply();
            $("#" + core + "HeadEditInput" + ind).focus();
        }, 10);
    }
    $scope.editBlurHeadFunctionCall = function (ind, type, core) {
        $scope.editEnable = false;
        $scope.mapp[core].head[ind].edit = false;
    }
    $scope.editKeyPressHeadFunctionCall = function (ind, type, core, eve) {
        if (eve.keyCode == 13) {
            $scope.clearAllEditCells();
            $scope.mapp[core].head[ind].edit = false;
            setTimeout(function () {
                if ($scope.mapp[core].head[ind + 1]) {
                    $scope.editEnable = true;
                    $scope.mapp[core].head[ind + 1].classes = "ST SR SB SL";
                    $scope.mapp[core].head[ind + 1].edit = true;
                    $scope.cellSelected = true;
                    $scope.selectedCellObj.ind = ind + 1;
                    $scope.selectedCellObj.col = type;
                    $scope.selectedCellObj.core = core;
                    $scope.selectedCellObj.type= "head";
                    $scope.$apply();
                    $("#" + core + "HeadEditInput" + (ind+1)).focus();
                }
            }, 10);
        }
    }
    $scope.editChangeHeadFunctionCall = function (ind, type, core, eve) {
        $scope.editEnable = true;
        var a = $scope.mapp[core].head[ind].headingText;
        var split_enter = a.split('\n');
        var split_tap = a.split('\t');
        if (split_enter.length > 1 || split_tap.length > 1) {
            $scope.mapp[core].head[ind].edit = false;
            $scope.mapp[core].head[ind].headingText = split_enter[0].split('\t')[0];
        }
    }
    $scope.editMouseDownHeadFunctionCall = function (ind, type, core, eve) {
        eve.stopPropagation();
        $scope.cellSelected = true;
        $scope.selectedCellObj.ind = ind;
        $scope.selectedCellObj.col = type;
        $scope.selectedCellObj.core = core;
        $scope.selectedCellObj.type = "head";
        $scope.clearAllEditCells();
        if ($scope.mapp[core].head[ind]) { }
        else {
            $scope.mapp[core].head[ind] = {};
        }
        $scope.mapp[core].head[ind].classes = "ST SR SB SL";
    }
    $scope.editColFunctionCall = function (ind, type, core, eve) {
        $scope.editEnable=true;
        if ($scope.mapp[core].data[ind][type]) {
        }
        else {
            $scope.mapp[core].data[ind][type] = {};
        }
        $scope.mapp[core].data[ind][type].edit = true;
        setTimeout(function () {
            $scope.$apply();
            $("#" + core + "EditInput" + ind + "_" + type).focus();
        }, 10);
    }
    $scope.editBlurColFunctionCall = function (ind, type, core) {
        $scope.editEnable = false;    
        $scope.mapp[core].data[ind][type].edit = false;        
    }

    $scope.editChangeColFunctionCall = function (ind, type, core, eve) {
        $scope.editEnable = true;
        var a = $scope.mapp[core].data[ind][type].value;
        var split_enter = a.split('\n');
        var split_tap = a.split('\t');
        if (split_enter.length > 1 || split_tap.length > 1) {
            $scope.mapp[core].data[ind][type].edit = false;
            var col_i;
            for (var i = 0; i < $scope.mapp[core].head.length; i++) {
                if ($scope.mapp[core].head[i].headingID == type) {
                    col_i = i;
                    break;
                }
            }
            for (var sp_i = 0, j = ind; sp_i < split_enter.length; sp_i++, j++) {
                var split_col = split_enter[sp_i].split('\t');
                for (var sp_col_i = 0, i = col_i; sp_col_i < split_col.length; sp_col_i++, i++) {
                    if ($scope.mapp[core].head[i]) {
                        if ($scope.mapp[core].data.length > j) {
                            if ($scope.mapp[core].data[j]) {
                                if ($scope.mapp[core].data[j][$scope.mapp[core].head[i].headingID]) {
                                    $scope.mapp[core].data[j][$scope.mapp[core].head[i].headingID].value = split_col[sp_col_i];
                                }
                                else {
                                    $scope.mapp[core].data[j][$scope.mapp[core].head[i].headingID] = {};
                                    $scope.mapp[core].data[j][$scope.mapp[core].head[i].headingID].value = split_col[sp_col_i];
                                }
                            }
                            else {
                                $scope.mapp[core].data[j] = {};
                                $scope.mapp[core].data[j][$scope.mapp[core].head[i].headingID] = {};
                                $scope.mapp[core].data[j][$scope.mapp[core].headd[i].headingID].value = split_col[sp_col_i];
                            }
                        }
                        else {
                            $scope.mapp[core].data.push({});
                            $scope.mapp[core].data[j][$scope.mapp[core].head[i].headingID] = {};
                            $scope.mapp[core].data[j][$scope.mapp[core].head[i].headingID].value = split_col[sp_col_i];
                        }
                    }
                }
            }
        }
    }

    $scope.editKeyPressColFunctionCall = function (ind, type, core, eve) {
        if (eve.keyCode == 13) {
            $scope.clearAllEditCells();
            $scope.mapp[core].data[ind][type].edit = false;
            setTimeout(function () {
                $scope.editEnable = true;
                if ($scope.mapp[core].data[ind + 1]) {
                }
                else {
                    $scope.mapp[core].data.push({});
                }
                if ($scope.mapp[core].data[ind + 1][type]) {
                }
                else {
                    $scope.mapp[core].data[ind + 1][type] = {};
                }
                $scope.mapp[core].data[ind + 1][type].classes = "ST SR SB SL";
                $scope.mapp[core].data[ind + 1][type].edit = true;
                $scope.cellSelected = true;
                $scope.selectedCellObj.ind = ind + 1;
                $scope.selectedCellObj.col = type;
                $scope.selectedCellObj.core = core;
                $scope.$apply();
                $("#" + core + "EditInput" + (ind + 1) + "_" + type).focus();
            }, 10);
        }
    }
    $scope.editKeyPressInBodyFunctionCall = function (eve) {
        if ($scope.cellSelected == true) {
            if ($scope.editEnable == false) {
                //console.log(eve);
                if (eve.keyCode == 116) {

                }
                else if (eve.ctrlKey == true && eve.keyCode == 86) {
                    if ($scope.selectedCellObj) {
                        eve.preventDefault();
                        var place = ($scope.selectedCellObj.ind > 5) ? 'top' : 'bottom';
                        var aa = $("#" + $scope.selectedCellObj.core + "EditInput" + $scope.selectedCellObj.ind + "_" + $scope.selectedCellObj.col).parent().parent();
                        aa.popover({ animation: true, content: "Clipboard doesnot supported in your browser. Paste Here!...", placement: place, trigger: 'manual' });
                        aa.popover('show');
                        setTimeout(function () {
                            aa.popover('hide');
                        }, 2000);
                        $scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.selectedCellObj.col].edit = true;
                        setTimeout(function () {
                            $scope.editEnable = true;
                            $scope.$apply;
                            $("#" + $scope.selectedCellObj.core + "EditInput" + $scope.selectedCellObj.ind + "_" + $scope.selectedCellObj.col).focus();
                        }, 10);
                        //if (window.clipboardData) {
                        //    var a = window.clipboardData.getData('text');
                        //    console.log(a);
                        //}
                    }
                }
                else if (eve.keyCode == 46) {
                    eve.preventDefault();
                    $scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.selectedCellObj.col].edit = false;
                    $scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.selectedCellObj.col].value = "";
                }
                else if (eve.keyCode == 40) {
                    eve.preventDefault();
                    if ($scope.selectedCellObj.ind < ($scope.mapp[$scope.selectedCellObj.core].data.length - 1)) {
                        if (!$scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.selectedCellObj.col]) {
                            $scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.selectedCellObj.col] = {};
                        }
                        $scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.selectedCellObj.col].classes = "";
                        $scope.selectedCellObj.ind = $scope.selectedCellObj.ind + 1;

                        if (!$scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.selectedCellObj.col]) {
                            $scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.selectedCellObj.col] = {};
                        }
                        $scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.selectedCellObj.col].classes = "ST SR SB SL";
                    }
                }
                else if (eve.keyCode == 38) {
                    eve.preventDefault();
                    if ($scope.selectedCellObj.ind > 0) {
                        if (!$scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.selectedCellObj.col]) {
                            $scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.selectedCellObj.col] = {};
                        }
                        $scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.selectedCellObj.col].classes = "";
                        $scope.selectedCellObj.ind = $scope.selectedCellObj.ind - 1;
                        if (!$scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.selectedCellObj.col]) {
                            $scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.selectedCellObj.col] = {};
                        }
                        $scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.selectedCellObj.col].classes = "ST SR SB SL";
                    }
                }
                else if (eve.keyCode == 37) {
                    eve.preventDefault();
                    for (var i = 0; i < $scope.mapp[$scope.selectedCellObj.core].head.length; i++) {
                        if ($scope.mapp[$scope.selectedCellObj.core].head[i].headingID == $scope.selectedCellObj.col && i > 0) {
                            if (!$scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.mapp[$scope.selectedCellObj.core].head[i].headingID]) {
                                $scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.mapp[$scope.selectedCellObj.core].head[i].headingID] = {};
                            }
                            if (!$scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.mapp[$scope.selectedCellObj.core].head[i - 1].headingID]) {
                                $scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.mapp[$scope.selectedCellObj.core].head[i - 1].headingID] = {};
                            }
                            $scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.mapp[$scope.selectedCellObj.core].head[i].headingID].classes = "";
                            $scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.mapp[$scope.selectedCellObj.core].head[i - 1].headingID].classes = "ST SR SB SL";
                            $scope.selectedCellObj.col = $scope.mapp[$scope.selectedCellObj.core].head[i - 1].headingID;
                            break;
                        }
                    }
                }
                else if (eve.keyCode == 39) {
                    eve.preventDefault();
                    for (var i = 0; i < $scope.mapp[$scope.selectedCellObj.core].head.length; i++) {
                        if ($scope.mapp[$scope.selectedCellObj.core].head[i].headingID == $scope.selectedCellObj.col && i < ($scope.mapp[$scope.selectedCellObj.core].head.length - 1)) {
                            if (!$scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.mapp[$scope.selectedCellObj.core].head[i].headingID]) {
                                $scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.mapp[$scope.selectedCellObj.core].head[i].headingID] = {};
                            }
                            if (!$scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.mapp[$scope.selectedCellObj.core].head[i + 1].headingID]) {
                                $scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.mapp[$scope.selectedCellObj.core].head[i + 1].headingID] = {};
                            }
                            $scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.mapp[$scope.selectedCellObj.core].head[i].headingID].classes = "";
                            $scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.mapp[$scope.selectedCellObj.core].head[i + 1].headingID].classes = "ST SR SB SL";
                            $scope.selectedCellObj.col = $scope.mapp[$scope.selectedCellObj.core].head[i + 1].headingID;
                            break;
                        }
                    }
                }
                else if (eve.keyCode == 13) {
                    eve.preventDefault();
                    $scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.selectedCellObj.col].edit = true;
                    setTimeout(function () {
                        $scope.editEnable = true;
                        $scope.$apply;
                        $("#" + $scope.selectedCellObj.core + "EditInput" + $scope.selectedCellObj.ind + "_" + $scope.selectedCellObj.col).focus();
                    }, 10);
                }
                else if (eve.ctrlKey == false) {
                    eve.preventDefault();
                    $scope.mapp[$scope.selectedCellObj.core].data[$scope.selectedCellObj.ind][$scope.selectedCellObj.col].edit = true;
                    setTimeout(function () {
                        $scope.editEnable = true;
                        $scope.$apply;
                        $("#" + $scope.selectedCellObj.core + "EditInput" + $scope.selectedCellObj.ind + "_" + $scope.selectedCellObj.col).focus();
                    }, 10);
                }
            }
        }
    }
    $scope.editMouseDownInBodyFunctionCall = function (eve) {
        if ($scope.cellSelected == true) {
            $scope.cellSelected = false;
            $scope.selectedCellObj = {};
            $scope.clearAllEditCells();
            setTimeout(function () { $scope.$apply();},10);
        }
    }
    
    $scope.selectedCellObj = {};
    $scope.editMouseDownFunctionCall = function (ind, type,core, eve) {
        eve.stopPropagation();
        $scope.cellSelected = true;
        $scope.selectedCellObj.ind = ind;
        $scope.selectedCellObj.col = type;
        $scope.selectedCellObj.core = core;
        $scope.clearAllEditCells();
        if ($scope.mapp[core].data[ind][type]) { }
        else {
            $scope.mapp[core].data[ind][type] = {};
        }
        $scope.mapp[core].data[ind][type].classes = "ST SR SB SL";
    }

    $scope.clearAllEditCells = function () {
        for (var i = 0; i < $scope.mapp.row.head.length; i++) {
            $scope.mapp.row.head[i].classes = "";
            for (var j = 0; j < $scope.mapp.row.data.length; j++) {
                if ($scope.mapp.row.data[j][$scope.mapp.row.head[i].headingID]) {
                    $scope.mapp.row.data[j][$scope.mapp.row.head[i].headingID].classes = "";
                }
            }
        }
        for (var i = 0; i < $scope.mapp.column.head.length; i++) {
            $scope.mapp.column.head[i].classes = "";
            for (var j = 0; j < $scope.mapp.column.data.length; j++) {
                if ($scope.mapp.column.data[j][$scope.mapp.column.head[i].headingID]) {
                    $scope.mapp.column.data[j][$scope.mapp.column.head[i].headingID].classes = "";
                }
            }
        }
    }

    var textfile = null;
    $scope.downloadContent = function () {
        var hrf = document.createElement('a');
        var txt = $("#outputTextArea").val();
        var dow = new Blob([txt], { type: "text/plain" });

        if (textfile != null) {
            window.URL.revokeObjectURL(textfile);
        }
        textfile=window.URL.createObjectURL(dow);
        hrf.href = textfile;
        hrf.download = "query.txt";
        hrf.click();
    }

    $scope.copyContent = function () {
        var a = document.getElementById("outputTextArea");
        a.select();
        document.execCommand('copy');
    }

    $scope.generateOutput = function () {
        var query = "UPDATE <<Table_Name>> SET <<After_Column_Name>>='<<After_Column>>' WHERE <<Before_Column_Name>>='<<Before_Column>>';";
        var queries = [];

        for (var row_data_i = 0; row_data_i < $scope.mapp.row.data.length || $scope.mapp.row.data.length==0; row_data_i++) {
            for (var col_data_i = 0; col_data_i < $scope.mapp.column.data.length; col_data_i++) {
                var colEmptyCheck = false;
                for (var col_head_i = 0; col_head_i < $scope.mapp.column.head.length; col_head_i++) {
                    if ($scope.mapp.column.data[col_data_i][$scope.mapp.column.head[col_head_i].headingID]) {
                        if ($scope.mapp.column.data[col_data_i][$scope.mapp.column.head[col_head_i].headingID].value && $scope.mapp.column.data[col_data_i][$scope.mapp.column.head[col_head_i].headingID].value != undefined && $scope.mapp.column.data[col_data_i][$scope.mapp.column.head[col_head_i].headingID].value != "") {
                            colEmptyCheck = true;
                        }
                    }
                }
                if (colEmptyCheck == false) {
                    continue;
                }
                var str = "";
                for (var col_head_i = 0; col_head_i < $scope.mapp.column.head.length; col_head_i++) {
                    str = str + $scope.mapp.column.head[col_head_i].updateContents;
                    if ($scope.mapp.column.data[col_data_i][$scope.mapp.column.head[col_head_i].headingID] && $scope.mapp.column.data[col_data_i][$scope.mapp.column.head[col_head_i].headingID].value) {
                        str = str.replace($scope.mapp.column.head[col_head_i].replace_data, $scope.mapp.column.data[col_data_i][$scope.mapp.column.head[col_head_i].headingID].value.trim());
                        str = str + $scope.mapp.column.data[col_data_i][$scope.mapp.column.head[col_head_i].headingID].value.trim();
                    }
                }
                str = str + $scope.newColumnsDataContents;

                for (var row_head_i = 0; row_head_i < $scope.mapp.row.head.length; row_head_i++) {
                    if ($scope.mapp.row.data[row_data_i][$scope.mapp.row.head[row_head_i].headingID] && $scope.mapp.row.data[row_data_i][$scope.mapp.row.head[row_head_i].headingID].value) {
                        str = str.replace($scope.mapp.row.head[row_head_i].replace_data, $scope.mapp.row.data[row_data_i][$scope.mapp.row.head[row_head_i].headingID].value.trim());
                    }
                    else {
                        str = str.replace($scope.mapp.row.head[row_head_i].replace_data, '');
                    }
                }
                queries.push(str);
            }
        }
        $("#outputTextArea").val(queries.join("\n"));
    }

    //$scope.generateOutput = function () {
    //    var query = "UPDATE <<Table_Name>> SET <<After_Column_Name>>='<<After_Column>>' WHERE <<Before_Column_Name>>='<<Before_Column>>';";
    //    var queries = [];

    //    for (var row_data_i = 0; row_data_i < $scope.mapp.row.data.length; row_data_i++) {
    //        var rowEmptyCheck = false;
    //        for (var row_head_i = 0; row_head_i < $scope.mapp.row.head.length; row_head_i++) {
    //            if ($scope.mapp.row.data[row_data_i][$scope.mapp.row.head[row_head_i].headingID]) {
    //                if ($scope.mapp.row.data[row_data_i][$scope.mapp.row.head[row_head_i].headingID].value && $scope.mapp.row.data[row_data_i][$scope.mapp.row.head[row_head_i].headingID].value != undefined && $scope.mapp.row.data[row_data_i][$scope.mapp.row.head[row_head_i].headingID].value != "") {
    //                    rowEmptyCheck = true;
    //                }
    //            }
    //        }
    //        if (rowEmptyCheck == false) {
    //            continue;
    //        }
    //        for (var col_data_i = 0; col_data_i < $scope.mapp.column.data.length; col_data_i++) {
    //            var colEmptyCheck = false;
    //            for (var col_head_i = 0; col_head_i < $scope.mapp.column.head.length; col_head_i++) {
    //                if ($scope.mapp.column.data[col_data_i][$scope.mapp.column.head[col_head_i].headingID]) {
    //                    if ($scope.mapp.column.data[col_data_i][$scope.mapp.column.head[col_head_i].headingID].value && $scope.mapp.column.data[col_data_i][$scope.mapp.column.head[col_head_i].headingID].value != undefined && $scope.mapp.column.data[col_data_i][$scope.mapp.column.head[col_head_i].headingID].value != "") {
    //                        colEmptyCheck = true;
    //                    }
    //                }
    //            }
    //            if (colEmptyCheck == false) {
    //                continue;
    //            }
    //            var str = query;
    //            for (var row_head_i = 0; row_head_i < $scope.mapp.row.head.length; row_head_i++) {
    //                if ($scope.mapp.row.data[row_data_i][$scope.mapp.row.head[row_head_i].headingID] && $scope.mapp.row.data[row_data_i][$scope.mapp.row.head[row_head_i].headingID].value) {
    //                    str = str.replace($scope.mapp.row.head[row_head_i].replace_data, $scope.mapp.row.data[row_data_i][$scope.mapp.row.head[row_head_i].headingID].value.trim());
    //                }
    //                else {
    //                    str = str.replace($scope.mapp.row.head[row_head_i].replace_data, '');
    //                }
    //            }
    //            for (var col_head_i = 0; col_head_i < $scope.mapp.column.head.length; col_head_i++) {
    //                if ($scope.mapp.column.data[col_data_i][$scope.mapp.column.head[col_head_i].headingID] && $scope.mapp.column.data[col_data_i][$scope.mapp.column.head[col_head_i].headingID].value) {
    //                    str = str.replace($scope.mapp.column.head[col_head_i].replace_data, $scope.mapp.column.data[col_data_i][$scope.mapp.column.head[col_head_i].headingID].value.trim());
    //                }
    //                else {
    //                    str = str.replace($scope.mapp.column.head[col_head_i].replace_data, '');
    //                }
    //                str = str.replace($scope.mapp.column.head[col_head_i].replace_head, $scope.mapp.column.head[col_head_i].headingText.trim());
    //            }
    //            queries.push(str);
    //        }
    //    }
    //    $("#outputTextArea").val(queries.join("\n"));
    //}

    $scope.showSettings = function () {
        $("#popupModalContent").modal("show");
    }

});