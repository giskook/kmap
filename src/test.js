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

(function(){
    var element = document.getElementById("div1");
    document.writeln(element.tagName);
    document.writeln(element.getAttribute("id"));
    element.setAttribute("TITLE", "zhangkai");
    document.writeln(element.title);
    document.writeln(element.getAttribute("title"));
})();

// documentElement
/*(function(){
    var de = document.documentElement;
    for(var i in de){
        //alert(i + " "+de[i]);
    }
    alert(document.body.innerHTML);
})();*/



