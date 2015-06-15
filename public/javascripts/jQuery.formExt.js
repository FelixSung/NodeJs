/*jQuery.loadForm-1.0.js
 *Author：FelixSung 2014/10/09
 *Example:
 *	var data = { "userName": "张三", "id": 1, "sex": 0, "interest": "2,4,8", "province": "shanghai" };
 *  $("form").loadForm(data);
 *
 */
jQuery.fn.extend({
    loadForm: function (data) {
        this.find("input").each(function (index, item) {
            var name = $(item).attr("name");
            var type = $(item).attr("type");
            var val = data[name];
            if (type === "radio") {
                if (val.toString() === $(item).val()) {
                    $(item).attr("checked", "checked");
                } else {
                    $(item).removeAttr("checked");
                }
            } else if (type === "checkbox") {
                var dataType = $(item).attr("data-type");
                if (dataType == "bool") {
                    if (val) {
                        if (val.toString() == "true") {
                            $(item).attr("checked", "checked");
                        } else {
                            $(item).removeAttr("checked");
                        }
                    }
                } else if (dataType == "wei") {  //位运算
                    if (val & $(item).val()) {
                        $(item).attr("checked", "checked");
                    } else {
                        $(item).removeAttr("checked");
                    }
                }
                else {
                    if (val != null) {
                        var s = val; // '1,2,3,' 
                        if (s.substr(s.length - 1, 1) != ",") s += ",";
                        if (s.indexOf($(item).val() + ",") >= 0) {
                            $(item).attr("checked", "checked");
                        } else {
                            $(item).removeAttr("checked");
                        }
                    }
                }
            } else if (type == "reset") {
            } else if (type == "submit") {
            } else if (type == "datetime-local") {
                $(item).val(val);
            } else {
                $(item).val(val);
            }
        });
        this.find("select").each(function (index, item) {
            var name = $(item).attr("name");
            var val = data[name];

            if (val != null && val != undefined) {
                $(item).children("option").each(function (i, option) {
                    if (val.toString() === $(option).val()) {
                        $(option).attr("selected", "selected");
                    } else {
                        $(option).removeAttr("selected");
                    }
                });
            }
        });
        this.find("textarea").each(function (index, item) {
            var name = $(item).attr("name");
            var val = data[name];
            $(item).html(val);

        });
        this.find("img[data-form='true']").each(function (index, item) {
            var name = $(item).attr("name");
            var val = data[name];
            $(item).attr("data-src", val).attr("src", $.imgHost + val);
        });
    },
    toJson: function () { //转化为json对象
        var obj = {};
        var $obj = this;
        this.find("input,select,textarea,hidden").each(function (index, item) {
            var name = $(item).attr("name");
            if (name == "") return;
            var val = $(item).val();
            var type = $(item).attr("type");
            switch (type) {
                case "submit":
                case "reset":
                case "button":
                case "file":
                case "image":
                    break;
                case "checkbox":
                    val = $obj.find(":checked[name='" + name + "']").val();
                    var dataType = $(item).attr("data-type");
                    if (dataType == "bool") {
                        obj[name] = val == "true" ? true : false;
                    } else if (dataType == "wei") //位运算
                    {
                        if (!obj[name]) {
                            obj[name] = 0;
                            $obj.find(":checked[name='" + name + "']").each(function (index, cboItem) {
                                var val = $(cboItem).val();
                                obj[name] += parseInt(val);
                            });
                        }
                    }
                    else {
                        obj[name] = val;
                    }
                    break;
                case "radio":
                    val = $obj.find("input[name='" + name + "']:checked").val();
                    obj[name] = val;
                    break;
                case "textarea":
                    obj[name] = $(item).html();
                    break;
                default:
                    obj[name] = val;
                    break;
            }
        });
        this.find("img[data-form='true']").each(function () {
            var name = $(this).attr("name");
            obj[name] = $(this).attr("data-src");
        });
        return obj;
    },
    disabled: function () { //禁用
        this.find("input,select,file,textarea,button").attr("disabled", "disabled");
        this.find("button").addClass("disabled");
    },
    enable: function () { //启用
        this.find("input,select,file,textarea,button").removeAttr("disabled");
        this.find("button").removeClass("disabled");
    }
});