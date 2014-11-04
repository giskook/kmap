/**
 * Created by z on 2014/10/31.
 */

$(document).ready(function(){
    var bigImg = document.createElement("img");     //创建一个img元素
    bigImg.width = "256";
    bigImg.height = "256";
    bigImg.style.left = 1000;

    bigImg.src = "http://192.168.1.155/images/1.png";
    document.getElementById('div1').appendChild(bigImg);

 });
