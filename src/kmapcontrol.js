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
    },

    setMap : function(mapproperty){
        var container = mapproperty.container;
        var level = mapproperty.level;
        var center = mapproperty.center;
        var pixelbounds = mapproperty.pixelbounds;
        kMap.setMap(container, center, level);
        document.write(kMap.center.x);
        document.write(" ");
        document.write(kMap.center.y);
        document.write(" ");
        kMap.setPixelBounds(pixelbounds.left, pixelbounds.top,pixelbounds.right, pixelbounds.bottom);
        var geobounds  = kMap.getViewBounds();
        var viewtiles = kMap.getViewTiles();
        var pixeloutside = kMap.getPixelOutSide();
        document.write(geobounds.left);
        document.write(" ");
        document.write(geobounds.top);
        document.write(" ");
        document.write(geobounds.right);
        document.write(" ");
        document.write(geobounds.bottom);
        document.write(" ");
        document.write(viewtiles.startx);

        document.write(" ");
        document.write(viewtiles.endx);
        document.write(" ");
        document.write(viewtiles.starty);
        document.write(" ");
        document.write(viewtiles.endy);
        document.write(" ");

        /*for(var i = viewtiles.startx; i < viewtiles.endx; ++i){
            for(var j = viewtiles.starty; j < viewtiles.endy; ++j){
                kMapControl.setImg({
                    container : container,
                    width : "256px",
                    height : "256px",
                    top : (j*256-pixeloutside.height)+"px",
                    left : (i*256-pixeloutside.width)+"px",
                    src : "http://online1.map.bdimg.com/tile/?qt=tile&x=0&y=0&z=4&styles=pl&udt=20141102"
                })
            }
        }*/
    }
};

$(document).ready(function(){
    kMapControl.setMap({
        container : "div1",
        level : 20,
        center : {
            x : 127,
            y : 34
        },
        pixelbounds : {
            left : document.documentElement.clientLeft,
            top : document.documentElement.clientTop,
            right : document.documentElement.clientLeft + document.documentElement.clientWidth,
            bottom : document.documentElement.clientTop + document.documentElement.clientHeight
        }
    })
 });
