function TransConvert() {
    document.getElementById("trans").value = ToTrans(document.getElementById("num").value)
}
function ToTrans(a) {
    var b = 9.999999999999E10,
    f = "\u96f6",
    h = "\u58f9",
    g = "\u8d30",
    e = "\u53c1",
    k = "\u8086",
    p = "\u4f0d",
    q = "\u9646",
    r = "\u67d2",
    s = "\u634c",
    t = "\u7396",
    l = "\u62fe",
    d = "\u4f70",
    i = "\u4edf",
    m = "\u4e07",
    j = "\u4ebf",
    u = "人民币",
    o = "\u5143",
    c = "\u89d2",
    n = "\u5206",
    v = "\u6574";
    a = a.toString();
    if (a == "") {
		showErrorBox("转换内容不能为空!");
        return ""
    }
    if (a.match(/[^,.\d]/) != null) {
		showErrorBox("输入有误,请输入小数点和纯数字!");
        return ""
    }
    if (a.match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
		showErrorBox("输入有误,请输入小数点和纯数字!");
        return ""
    }
    a = a.replace(/,/g, "");
    a = a.replace(/^0+/, "");
    if (Number(a) > b) {
        alert("\u5bf9\u4e0d\u8d77,\u4f60\u8f93\u5165\u7684\u6570\u5b57\u592a\u5927\u4e86!\u6700\u5927\u6570\u5b57\u4e3a99999999999.99\uff01");
        return ""
    }
    b = a.split(".");
    if (b.length > 1) {
        a = b[0];
        b = b[1];
        b = b.substr(0, 2)
    } else {
        a = b[0];
        b = ""
    }
    h = new Array(f, h, g, e, k, p, q, r, s, t);
    l = new Array("", l, d, i);
    m = new Array("", m, j);
    n = new Array(c, n);
    c = "";
    if (Number(a) > 0) {
        for (d = j = 0; d < a.length; d++) {
            e = a.length - d - 1;
            i = a.substr(d, 1);
            g = e / 4;
            e = e % 4;
            if (i == "0") j++;
            else {
                if (j > 0) c += h[0];
                j = 0;
                c += h[Number(i)] + l[e]
            }
            if (e == 0 && j < 4) c += m[g]
        }
        c += o
    }
    if (b != "") for (d = 0; d < b.length; d++) {
        i = b.substr(d, 1);
        if (i != "0") c += h[Number(i)] + n[d]
    }
    if (c == "") c = f + o;
    if (b.length < 2) c += v;
    return c;
}

function englishConvert(str) {
    var text = document.getElementById("content").value;
    if (text == "" || text == null) {
		showErrorBox("请输入要转换的内容!");
        return;
    }
    if (str == "tolowercase") {
        document.getElementById("content").value = text.toLowerCase();
    }
    else if (str == "touppercase") {
        document.getElementById("content").value = text.toUpperCase();
    }
    else {
        document.getElementById("content").value = FirstLetterCase(text);
    }
}

function FirstLetterCase(str) {
    var index;
    var tmpStr;
    var tmpChar;
    var preString;
    var postString;
    var strlen;
    tmpStr = str.toLowerCase();
    strLen = tmpStr.length;
    if (strLen > 0) {
        for (index = 0; index < strLen; index++) {
            if (index == 0) {
                tmpChar = tmpStr.substring(0, 1).toUpperCase();
                postString = tmpStr.substring(1, strLen);
                tmpStr = tmpChar + postString;
            }
            else {
                tmpChar = tmpStr.substring(index, index + 1);
                if (tmpChar == " " && index < (strLen - 1)) {
                    tmpChar = tmpStr.substring(index + 1, index + 2).toUpperCase();
                    preString = tmpStr.substring(0, index + 1);
                    postString = tmpStr.substring(index + 2, strLen);
                    tmpStr = preString + tmpChar + postString;
                }
            }
        }
    }
    return tmpStr;
}

function clearText(str) {
    document.getElementById(str).value = "";
}

