/**
 * Created by z on 2014/10/31.
 */

$(document).ready(function(){
    var bigImg = document.createElement("img");     //创建一个img元素
    bigImg.style.width  = '256px';
    bigImg.style.height = '256px';

    bigImg.style.position = 'absolute';
    bigImg.style.top  = "0px";
    bigImg.style.left = "0px";
    bigImg.src = "http://online1.map.bdimg.com/tile/?qt=tile&x=0&y=0&z=4&styles=pl&udt=20141102";
    document.getElementById('div1').appendChild(bigImg);

 });
