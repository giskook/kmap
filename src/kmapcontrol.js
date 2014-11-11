/**
 * Created by z on 2014/10/31.
 */
var kMapControl = {

    mousedown : 1,

    mouseup : 2,

    mousemove : 4,

    click : 8,

    dbclick : 16,

    action : 0,

    mousedownpos : {
        x : 0,
        y : 0
    },

    mousemovepos : {
        x : 0,
        y : 0
    },

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
        kMap.setPixelBounds(pixelbounds.left, pixelbounds.top,pixelbounds.right, pixelbounds.bottom);
        var geobounds  = kMap.getViewBounds();
        var viewtiles = kMap.getViewTiles();
        var pixeloutside = kMap.getPixelOutSide();

        var ii = 0;
        var jj = 0;
        kMapControl.setImg({
            container : container,
            width : "256px",
            height : "256px",
            top : (ii*256-pixeloutside.height)+"px",
            left : (jj*256-pixeloutside.width)+"px",
            src : "http://online1.map.bdimg.com/tile/?qt=tile&x=0&y=0&z=4&styles=pl&udt=20141102"
        });
        for(var i = viewtiles.starty; i < viewtiles.endy; ++i){
            for(var j = viewtiles.startx; j < viewtiles.endx; ++j){
                kMapControl.setImg({
                    container : container,
                    width : "256px",
                    height : "256px",
                    top : (ii*256-pixeloutside.height)+"px",
                    left : (jj*256-pixeloutside.width)+"px",
                    src : "http://online1.map.bdimg.com/tile/?qt=tile&x=0&y=0&z=4&styles=pl&udt=20141102"
                });
                ++jj;
            }
            ++ii;
            jj = 0;
        }
    },

    refreshMap : function(){
        var viewtiles = kMap.viewtiles;
        var pixeloutside = kMap.pixeloutside;
        var ii = 0;
        var jj = 0;
        for(var i = viewtiles.starty; i < viewtiles.endy; ++i){
            for(var j = viewtiles.startx; j < viewtiles.endx; ++j){
                kMapControl.setImg({
                    container : kMap.name,
                    width : "256px",
                    height : "256px",
                    top : (ii*256-pixeloutside.height)+"px",
                    left : (jj*256-pixeloutside.width)+"px",
                    src : "http://online1.map.bdimg.com/tile/?qt=tile&x=0&y=0&z=4&styles=pl&udt=20141102"
                });
                ++jj;
            }
            ++ii;
            jj = 0;
        }
    },

    pan : function(pixeloffset){

        kMap.pan(pixeloffset);

        this.refreshMap();
    },

    onmousemove : function (ev) {
        ev = ev || event;
        this.mousemovepos.x = ev.x;
        this.mousedownpos.y = ev.y;
        this.action |=this.mousemove;
        this.pan({
            x : (this.mousemovepos.x - this.mousedownpos.x),
            y : (this.mousemovepos.y - this.mousedownpos.y)
        });
    },

    onmousedown : function(ev){
        ev = ev || window.event;
        this.mousedownpos.x = ev.clientX;
        this.mousedownpos.y = ev.clientY;
        this.action |= this.mousedown;

    },

    onmouseup : function(ev){
        ev = ev || event;
        this.action |= this.mouseup;
        this.action &= ~this.mousedown;
    }
};

$(window).load(function(){
    document.body.parentNode.style.overflow="hidden";
    console.log("should not here");
    kMapControl.setMap({
        container : "div1",
        level : 20,
        center : {
            x : 127,
            y : 34
        },
        pixelbounds : {
            left: document.documentElement.clientLeft,
            top : document.documentElement.clientTop,
            right : document.documentElement.clientLeft + document.documentElement.clientWidth,
            bottom : document.documentElement.clientTop + document.documentElement.clientHeight
        }
    });

 });

$(window).resize(function(){
    console.log("should not here2");
    kMapControl.setMap({
        container : "div1",
        level : 20,
        center : {
            x : 127,
            y : 34
        },
        pixelbounds : {
            left: document.documentElement.clientLeft,
            top : document.documentElement.clientTop,
            right : document.documentElement.clientLeft + document.documentElement.clientWidth,
            bottom : document.documentElement.clientTop + document.documentElement.clientHeight
        }
    });
});

$('#div1').mousedown(function(ev){
    //kMapControl.onmousedown(ev);
    console.log("mousedown");
});

$('#div1').mousemove(function(ev){
    //kMapControl.onmousemove(ev);
    console.log("mousemove")
});

$('#div1').mouseup(function(ev){
//    kMapControl.onmouseup(ev);
    console.log("mouseup");
});




