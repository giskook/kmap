/**
 * Created by z on 2014/9/25.
 */
document.write(document.documentElement.clientHeight);
document.write(" ");
document.write(document.documentElement.clientWidth);
document.write("\r\n");

/*setTimeout(function () {
    document.write(document.documentElement.clientHeight);
    document.write(" ");
    document.write(document.documentElement.clientWidth);
}, 1000);*/

// 最好不要使用间歇调用 使用超时调用模拟 间歇调用最佳
/*var num = 0;
var max = 10;
var interid = null;
function interaction() {
    num++;
    document.write(document.documentElement.clientHeight);
    document.write(" ");
    document.write(document.documentElement.clientWidth);
    document.write(" ");
    document.close();
    if (num < max) {
        //clearInterval(interid);
        setTimeout(interaction, 1000);
    }
}
//interid = setInterval(interaction, 1000);
setTimeout(interaction, 1000);*/

// navigator screen history doucument
/*(function(){
     var div_str;
     var prediv = document.getElementById("main");
     //for(var i in window.navigator){
     for(var i in window.document){
         //div_str = i + " " + window.navigator[i];
         //div_str = i + " " + window.screen[i];
         if (typeof window.document[i] == "string" ){
             div_str = i + " " + window.document[i];
             var para = document.createElement("p");
             var node = document.createTextNode(div_str);
             para.appendChild(node);

             prediv.appendChild(para);
         }

     }

})();*/

/*(function(){
    var element = document.getElementById("div1");
    document.writeln(element.tagName);
    document.writeln(element.getAttribute("id"));
    element.setAttribute("TITLE", "zhangkai");
    document.writeln(element.title);
    document.writeln(element.getAttribute("title"));
})();*/
/*
(function(){
    var supportsDOM2Core = document.implementation.hasFeature("Core", "2.0");
    var supportsDOM3Core = document.implementation.hasFeature("Core", "3.0");
    var supportsDOM2Html = document.implementation.hasFeature("HTML", "2.0");
    var supportsDOM2View = document.implementation.hasFeature("Views", "2.0");
    var supportsDOM2XML = document.implementation.hasFeature("XML", "2.0");
    document.writeln(" supportsDOM2Core " + supportsDOM2Core);
    document.writeln(" supportsDOM3Core " + supportsDOM3Core);
    document.writeln(" supportsDOM2HTML " + supportsDOM2Html);
    document.writeln(" supportsDOM2Views " + supportsDOM2View);
    document.writeln(" supportsDOM2XML" + supportsDOM2XML);
})()*/;

// documentElement
/*(function(){
    var de = document.documentElement;
    for(var i in de){
        //alert(i + " "+de[i]);
    }
    alert(document.body.innerHTML);
})();*/

// css / style
(function () {
    var myDiv = document.getElementById("div1");
    myDiv.style.background = "#50ffff";
    myDiv.style.width = "100px";
    myDiv.style.height = "200px";
    myDiv.style.border = "5px solid black";

    document.writeln(myDiv.style.cssText + " " + myDiv.style.length);
    for(var i = 0, len = myDiv.style.length; i < len; i++){
        document.writeln("|");
        document.writeln(".."+myDiv.style.item(i) + " " + myDiv.style.getPropertyCSSValue(myDiv.style.item(i))+"..");
    }
    myDiv.style.removeProperty("border");
})();