/**
 * Created by z on 2014/10/31.
 */
var kMapControl = {

    mousedown : 1,

    mouseup : 2,

    mousemove : 4,

    mousewheel : 8,

    click : 16,

    dbclick : 32,

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
        var width = Math.ceil((screen.width+imgsize*2)/imgsize);
        var height = Math.ceil((screen.height+imgsize*2)/imgsize);

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
        this.container.xcount = width;

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
        kMapControl.eventutil.addHandler(div, "mousedown", kMapControl.onmousedown);
        kMapControl.eventutil.addHandler(div, "mousemove", kMapControl.onmousemove);
        kMapControl.eventutil.addHandler(div, "mousewheel", kMapControl.onmousewheel);
        kMapControl.eventutil.addHandler(document, "mouseup", kMapControl.onmouseup);
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
        for(var i = viewtiles.starty; i <= viewtiles.endy; ++i){
            for(var j = viewtiles.startx; j <= viewtiles.endx; ++j){
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
                if(element.addEventListener && false){
                    element.addEventListener(type, handler, false);
                }else if(element.attachEvent && false){
                    element.attachEvent("on"+type, handler);
                }else {
                    element["on"+type] = handler;
                }
            }
        },

        removeHandler : function(element, type, handler){
            if(element){
                if(element.removeEventListener && false){
                    element.removeEventListener(type, handler, false);
                }else if(element.detachEvent && false){
                    element.detachEvent("on"+type, handler);
                }else{
                    element["on"+type] = null;
                }
            }
        }
    },

    onmousemove : function (ev) {
        ev = ev || event;

        kMapControl.mousemovepos.x = ev.clientX;
        kMapControl.mousemovepos.y = ev.clientY;
        kMapControl.action |=kMapControl.mousemove;

        if(kMapControl.action & kMapControl.mousedown){
            kMapControl.pan({
                x : (kMapControl.mousemovepos.x - kMapControl.mousedownpos.x),
                y : (kMapControl.mousemovepos.y - kMapControl.mousedownpos.y)
            });
            kMapControl.mousedownpos.x = kMapControl.mousemovepos.x;
            kMapControl.mousedownpos.y = kMapControl.mousemovepos.y;
        }

        return false;
    },

    onmousedown : function(ev){
        ev = ev || event;

        kMapControl.mousedownpos.x = ev.clientX;
        kMapControl.mousedownpos.y = ev.clientY;
        kMapControl.action |= kMapControl.mousedown;

        return false;
    },

    onmouseup : function(ev){
        ev = ev || event;
        kMapControl.action |= kMapControl.mouseup;
        kMapControl.action &= ~kMapControl.mousedown;

        return false;
    },

    onmousewheel : function(ev){
        ev = ev || event;
        kMapControl.action |= kMapControl.mousewheel;
    },

    refreshMap : function(){
        var viewtiles = kMap.viewtiles;
        var pixeloutside = kMap.pixeloutside;
        var ii = 0;
        var jj = 0;
        for(var i = viewtiles.starty; i <= viewtiles.endy; ++i){
            for(var j = viewtiles.startx; j <= viewtiles.endx; ++j){
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
        kMapControl.refreshMap();

        return false;
    }
};

$(window).load(function(){
    document.body.parentNode.style.overflow="hidden";
    kMapControl.initMap({
        imagesize : 256,
        container : "div1"
    });
    kMapControl.initMapControlEventHandler();

    kMapControl.setMap({
        container : "div1",
        level : 20,
        center : {
            x : 127,
            y : 34.5
        },
        pixelbounds : {
            left: document.documentElement.clientLeft,
            top : document.documentElement.clientTop,
            right : document.documentElement.clientLeft + screen.width,
            bottom : document.documentElement.clientTop + screen.height
        }
    });
 });
