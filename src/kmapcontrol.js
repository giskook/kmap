/**
 * Created by z on 2014/10/31.
 */

$(document).ready(function(){
    var bigImg = document.createElement("img");     //创建一个img元素
    bigImg.width = "256px";  //200个像素 不用加px
    bigImg.height = "256px";
    bigImg.src = "http://www.baidu.com/img/bdlogo.gif";   //给img元素的src属性赋值
    document.getElementById('div1').appendChild(bigImg);      //为dom添加子元素img

});
