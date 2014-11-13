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

    container : {
        name : null,
        div : {},
        img : {},
        cellcount : 0,
        xcount : 0,
        ycount : 0
    },

    initMap : function(controlproperty){
        var imgsize = controlproperty.imagesize;
        var container = controlproperty.container;
        var width = Math.floor((document.documentElement.clientWidth+imgsize*2)/imgsize);
        var height = Math.floor((document.documentElement.clientHeight+imgsize*2)/imgsize);
        if(width > this.container.xcount){
            for(var i = this.container.xcount; i < width; ++i){
                for(var j = 0; j < height; ++j){
                    if(typeof this.container.div[i.toString() + j.toString()] === "undefined"){
                        this.container.div[i.toString() + j.toString()] = document.createElement("div");
                        document.getElementById(container).appendChild(this.container.div[i.toString() + j.toString()]);
                    }
                    if(typeof this.container.img[i.toString() + j.toString()] === "undefined" ){
                        this.container.img[i.toString() + j.toString()] = document.createElement("img");
                    }
                    this.container.div[i.toString() + j.toString()].id = i.toString() + j.toString();
                    this.container.img[i.toString() + j.toString()].id = i.toString() + j.toString();
                    if(this.container.div[i.toString() + j.toString()].hasChildNodes() === false){
                        this.container.div[i.toString() + j.toString()].appendChild(this.container.img[i.toString() + j.toString()]);
                    }
                }
            }
        }
        this.container.width = width;

        if(height > this.container.ycount){
            for(var i = 0; i < width; ++i){
                for(var j = this.container.ycount; i < height; ++i){
                    if(typeof this.container.div[i.toString() + j.toString()] === "undefined"){
                        this.container.div[i.toString() + j.toString()] = document.createElement("div");
                    }
                    if(typeof this.container.img[i.toString() + j.toString()] === "undefined" ){
                        this.container.img[i.toString() + j.toString()] = document.createElement("img");
                    }
                    this.container.div[i.toString() + j.toString()].id = i.toString() + j.toString();
                    this.container.img[i.toString() + j.toString()].id = i.toString() + j.toString();
                    if(this.container.div[i.toString() + j.toString()].hasChildNodes() === false){
                        this.container.div[i.toString() + j.toString()].appendChild(this.container.img[i.toString() + j.toString()]);
                    }
                }
            }
        }
        this.container.ycount = height;
        this.container.cellcount = height*width;
        this.container.name = container;
    },

    initMapControlEventHandler : function () {
        var div = document.getElementById(this.container.name);
        this.eventutil.addHandler(div, "mousedown", this.onmousedown);
        this.eventutil.addHandler(div, "mousemove", this.onmousemove);
        this.eventutil.addHandler(div, "mouseup", this.onmouseup);
    },

    setMap : function(mapproperty){
        var container = mapproperty.container;
        var level = mapproperty.level;
        var center = mapproperty.center;
        var pixelbounds = mapproperty.pixelbounds;
        kMap.setMap(container, center, level);

        kMap.setPixelBounds(pixelbounds.left, pixelbounds.top,pixelbounds.right, pixelbounds.bottom);
        kMap.getViewBounds();
        var viewtiles = kMap.getViewTiles();
        var pixeloutside = kMap.getPixelOutSide();

        var ii = 0;
        var jj = 0;
        for(var i = viewtiles.starty; i < viewtiles.endy; ++i){
            for(var j = viewtiles.startx; j < viewtiles.endx; ++j){
                kMapControl.container.img[jj.toString()+ii.toString()].style.position = "absolute";
                kMapControl.container.img[jj.toString()+ii.toString()].style.width = "256px";
                kMapControl.container.img[jj.toString()+ii.toString()].style.height = "256px";
                kMapControl.container.img[jj.toString()+ii.toString()].style.top = (ii*256-pixeloutside.height).toString()+"px";
                kMapControl.container.img[jj.toString()+ii.toString()].style.left = (jj*256-pixeloutside.width).toString()+"px";
                kMapControl.container.img[jj.toString()+ii.toString()].src = "http://online1.map.bdimg.com/tile/?qt=tile&x=0&y=0&z=4&styles=pl&udt=20141102";
                ++jj;
            }
            ++ii;
            jj = 0;
        }
    },

    eventutil : {
        addHandler : function(element, type, handler){
            if(element){
                if(element.addEventListener){
                    element.addEventListener(type, handler, false);
                }else if(element.attachEvent){
                    element.attachEvent("on"+type, handler);
                }else {
                    element["on"+type] = handler;
                }
            }
        },

        removeHandler : function(element, type, handler){
            if(element){
                if(element.removeEventListener){
                    element.removeEventListener(type, handler, false);
                }else if(element.detachEvent){
                    element.detachEvent("on"+type, handler);
                }else{
                    element["on"+type] = null;
                }
            }
        }
    },

    onmousemove : function (ev) {
        ev = ev || event;
        this.mousemovepos.x = ev.clientX;
        this.mousemovepos.y = ev.clientY;
        this.action |=this.mousemove;
        this.pan({
            x : (this.mousemovepos.x - this.mousedownpos.x),
            y : (this.mousemovepos.y - this.mousedownpos.y)
        });
    },

    onmousedown : function(ev){
        ev = ev || event;
        console.log(this.mousedownpos);
        this.mousedownpos.x = ev.clientX;
        this.mousedownpos.y = ev.clientY;
        this.action |= this.mousedown;

        return false;
    },

    onmouseup : function(ev){
        ev = ev || event;
        this.action |= this.mouseup;
        this.action &= ~this.mousedown;
    }

   /* refreshMap : function(){
        var viewtiles = kMap.viewtiles;
        var pixeloutside = kMap.pixeloutside;
        var ii = 0;
        var jj = 0;
        for(var i = viewtiles.starty; i < viewtiles.endy; ++i){
            for(var j = viewtiles.startx; j < viewtiles.endx; ++j){
                kMapControl.container.img[jj.toString()+ii.toString()].style.position = "absolute";
                kMapControl.container.img[jj.toString()+ii.toString()].style.width = "256px";
                kMapControl.container.img[jj.toString()+ii.toString()].style.height = "256px";
                kMapControl.container.img[jj.toString()+ii.toString()].style.top = (ii*256-pixeloutside.height).toString()+"px";
                kMapControl.container.img[jj.toString()+ii.toString()].style.left = (jj*256-pixeloutside.width).toString()+"px";
                kMapControl.container.img[jj.toString()+ii.toString()].src = "http://online1.map.bdimg.com/tile/?qt=tile&x=0&y=0&z=4&styles=pl&udt=20141102";
                ++jj;
            }
            ++ii;
            jj = 0;
        }
    },

    pan : function(pixeloffset){

        kMap.pan(pixeloffset);

        this.refreshMap();
    }*/

};

$(window).load(function(){
    document.body.parentNode.style.overflow="hidden";
    kMapControl.initMap({
        imagesize : 256,
        container : "div1"
    });

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

    kMapControl.initMapControlEventHandler();
    console.log(document.getElementById("div1"));

 });

/*
$(window).resize(function(){
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
*/
