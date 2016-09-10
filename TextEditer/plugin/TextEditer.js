
if (typeof jQuery === 'undefined') {
    throw new Error('JavaScript requires jQuery');
}

(function () {
    
    function textToHtmlFunction(data) {
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
                                if (spaceSplits[j].indexOf(data.options[op_i].textArray[arr_i])>=0) {
                                    color = data.options[op_i].color;
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

    $.fn.TextEditer = function (options) {
        var defaultOptions = options;
        $(this).each(function (index, element) {
            element.style.position = "relative";
            $(element).html("");
            var div = document.createElement("div");
            div.style.width = "100%";
            div.style.height = "100%";
            div.style.position = "absolute";
            div.style.top = "0px";
            div.style.left = "0px";
            div.style.zIndex = "1";
            div.style.overflow = "auto";
            div.style.color = defaultOptions.color;

            var textarea = document.createElement("textarea");
            textarea.style.width = "100%";
            textarea.style.height = "100%";
            textarea.style.padding = "0px";
            textarea.style.outline = "none";
            textarea.style.position = "absolute";
            textarea.style.top = "0px";
            textarea.style.left = "0px";
            textarea.style.zIndex = "2";
            textarea.style.backgroundColor = "transparent";
            textarea.style.color = "transparent";
            textarea.style.overflow = "auto";
            textarea.style.resize = "none";
            textarea.onscroll = function () {
                div.scrollTop = this.scrollTop;
            }

            $(textarea).on("input", function (asd, fas, dfasd) {
                var innerhtml = textToHtmlFunction({ text: $(textarea).val(), options: defaultOptions.objects });
                $(div).html(innerhtml);
                ///$(this).scroll();
                aa=textarea;
            });

            $(element).append(div);
            $(element).append(textarea);


        });
    }
})($);