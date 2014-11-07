/**
 * Created by z on 2014/10/31.
 */
var kMapControl = {
    setImg : function(imgproperty){
        var divcontainer = imgproperty.container;
        var div = document.createElement("div");
        var img = document.createElement("img");
        document.getElementById(divcontainer).appendChild(div);
        div.appendChild(img);

        img.style.width  = imgproperty.width;
        img.style.height = imgproperty.height;
        img.style.position = "absolute";
        img.style.top  = imgproperty.top;
        img.style.left = imgproperty.left;
        img.src = imgproperty.src;
    }
};

$(document).ready(function(){
    kMapControl.setImg({
        container:"div1",
        width:"256px",
        height:"256px",
        top:"0px",
        left:"0px",
        src:"http://online1.map.bdimg.com/tile/?qt=tile&x=0&y=0&z=4&styles=pl&udt=20141102"
    });

 });
