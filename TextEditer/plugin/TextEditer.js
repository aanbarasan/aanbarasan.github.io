
if (typeof jQuery === 'undefined') {
    throw new Error('JavaScript requires jQuery');
}

(function () {
    
    function textToHtmlFunction(data,data1) {
        if (typeof data == "object") {
            var text = data.text;
            var splitelem = text.split("\n");
            var texthtml = "";
            var len = splitelem.length;
            for (var i = 0; i < len; i++) {
                if (typeof data.options == "object") {
                    var spaceSplits = splitelem[i].split(" ");
                    var len_J = spaceSplits.length;
                    for (var j = 0; j < len_J; j++) {
                        var color = "";
                        for (var op_i = 0; op_i < data.options.length; op_i++) {
                            for (var arr_i = 0; arr_i < data.options[op_i].textArray.length; arr_i++) {
                                if (data.options[op_i].condition == "Contains") {
                                    if (spaceSplits[j].indexOf(data.options[op_i].textArray[arr_i]) >= 0) {
                                        color = data.options[op_i].color;
                                    }
                                }
                                else if (data.options[op_i].condition == "Equals") {
                                    if (spaceSplits[j]==data.options[op_i].textArray[arr_i]) {
                                        color = data.options[op_i].color;
                                    }
                                }
                            }
                        }
                        var styl = (color != "") ? " style='color:"+color+";'" : "";
                        texthtml = texthtml + "<span " + styl + ">" + withoutHMTL(spaceSplits[j]) + "</span>&nbsp;";
                    }
                }
                texthtml = texthtml + "<br/>";
            }
            return texthtml;
        }
    }
    function withoutHMTL(text) {
        var len = text.length;
        for (var i = 0; i < len; i++) {
            text = text.replace(" ", "&nbsp;");
            text = text.replace("<", "&lt;");
            text = text.replace(">", "&gt;");
        }
        return text;
    }

    $.fn.TextEditer = function (options, options1) {
        var defaultOptions = options;
        $(this).each(function (index, element) {
            var that = this;
            if (typeof options == "string") {
                if (options == "updateContent") {
                    $(that.frontShowingArea).val(options1);
                    $(that.frontShowingArea).trigger("input");
                }
            }
            else {
                element.style.position = "relative";
                $(element).html("");
                that.backgroundCollectionDiv = document.createElement("div");
                that.backgroundCollectionDiv.style.width = "100%";
                that.backgroundCollectionDiv.style.height = "100%";
                that.backgroundCollectionDiv.style.position = "absolute";
                that.backgroundCollectionDiv.style.top = "0px";
                that.backgroundCollectionDiv.style.left = "0px";
                that.backgroundCollectionDiv.style.zIndex = "1";
                that.backgroundCollectionDiv.style.overflow = "auto";
                that.backgroundCollectionDiv.style.color = defaultOptions.color;
                that.backgroundCollectionDiv.style.wordBreak = "break-all";
                that.backgroundCollectionDiv.style.border = "1px solid gray";

                that.frontShowingArea = document.createElement("textarea");
                $(that.frontShowingArea).css("-webkit-text-fill-color", "transparent");
                $(that.frontShowingArea).css("text-fill-color", "transparent");
                that.frontShowingArea.style.width = "100%";
                that.frontShowingArea.style.height = "100%";
                that.frontShowingArea.style.padding = "0px";
                that.frontShowingArea.style.outline = "none";
                that.frontShowingArea.style.position = "absolute";
                that.frontShowingArea.style.top = "0px";
                that.frontShowingArea.style.left = "0px";
                that.frontShowingArea.style.zIndex = "2";
                that.frontShowingArea.style.backgroundColor = "transparent";
                //that.frontShowingArea.style.color = "transparent";
                that.frontShowingArea.style.overflow = "auto";
                that.frontShowingArea.style.resize = "none";
                that.frontShowingArea.style.wordBreak = "break-all";
                that.frontShowingArea.style.border = "1px solid gray";
                
                that.frontShowingArea.onscroll = function () {
                    that.backgroundCollectionDiv.scrollTop = this.scrollTop;
                }

                $(that.frontShowingArea).on("input", function (asd, fas, dfasd) {
                    var innerhtml = textToHtmlFunction({ text: $(that.frontShowingArea).val(), options: defaultOptions.objects });
                    $(that.backgroundCollectionDiv).html(innerhtml);
                    ///$(this).scroll();
                });

                $(element).append(that.backgroundCollectionDiv);
                $(element).append(that.frontShowingArea);
            }
        });
    }
})($);