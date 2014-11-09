/**
 * Created by zhangkai on 2014/6/30.
 */
"use strict";
var version = "0.1";

var kMap = {
    version : version,

    name : "default",

    centerdegree : {
        x : 0,
        y : 0
    },

    center : {
        x : 0,
        y : 0
    },

    level : 12,

    // 20037508.3427892表示地图周长的一半，以地图中心点做为（0，0）坐标。
    worldbounds : {
      left :   -20037508.3427892,
      bottom : -20037508.3427892,
      top :     20037508.3427892,
      right :   20037508.3427892
    },

    worlddegreebounds : {
        left : -180,
        bottom : -85.05112877980659,
        top : 85.05112877980659,
        right : 180
    },

    tilesize : 256,

    levels : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],

    worldpixels : [256,512,1024,2048,4096,8192,16384,32768,65536,131072,262144,524288,1048576,2097152,4194304,8388608,16777216,33554432,67108864,134217728,268435456,536870912,1073741824],

    worldsidetiles : [1,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768,65536,131072,262144,524288,1048576,2097152,4194304],

    //    20037508.3427892 * 2 / 256 / (Math.pow(2,level));
    resolution : [156543.03392804062,78271.51696402031,39135.758482010155,
        19567.879241005077,9783.939620502539,4891.969810251269,2445.9849051256347,
        1222.9924525628173,611.4962262814087,305.74811314070433,152.87405657035217,
        76.43702828517608,38.21851414258804,19.10925707129402,9.55462853564701,
        4.777314267823505,2.3886571339117526,1.1943285669558763,0.5971642834779382,
        0.2985821417389691,0.14929107086948454,0.07464553543474227,0.037322767717371134],

    pixelbounds : {
        left :   0,
        top :    0,
        right :  0,
        bottom : 0
    },

    geobounds : {
        left :   0,
        top :    0,
        right :  0,
        bottom : 0
    },

    viewtiles : {
        level : 12,
        startx : 0,
        starty : 0,
        endx : 0,
        endy : 0
    },

    pixeloutside : {
        height : 0,
        width : 0
    },

    domain : "http://192.168.1.166",

    setPixelBounds : function(left, top, right, bottom){
        this.pixelbounds.left = left;
        this.pixelbounds.top = top;
        this.pixelbounds.right = right;
        this.pixelbounds.bottom = bottom;
    },

    getPixelSize : function(){
        return {
            width : this.pixelbounds.right - this.pixelbounds.left,
            height : this.pixelbounds.bottom - this.pixelbounds.top
        }
    },

    setMap : function(name, center, level){
        this.name = name;
        this.centerdegree = center;
        this.level = level;
        // 111319.49079327333 235593.67912288825
        // worldbounds.width/360 worldbounds.height/worlddegreebounds.height
        this.center.x = (center.x - this.worlddegreebounds.left)*this.worldpixels[this.level]/(this.worlddegreebounds.right - this.worlddegreebounds.left);
        this.center.y = (center.y - this.worlddegreebounds.bottom)*this.worldpixels[this.level]/(this.worlddegreebounds.top - this.worlddegreebounds.bottom);
    },
    
    getViewBounds : function () {
        this.geobounds =
        {
            left : this.center.x - this.resolution[this.level] * Math.floor(this.getPixelSize().width / 2),
            bottom : this.center.y - this.resolution[this.level] * Math.floor(this.getPixelSize().height / 2),
            right : this.center.x + this.resolution[this.level] * Math.floor(this.getPixelSize().width / 2),
            top : this.center.y + this.resolution[this.level] * Math.floor(this.getPixelSize().height / 2)
        };

        return this.geobounds;
    },

    getViewTiles : function () {
        this.viewtiles.level = this.level;
        this.viewtiles.startx = Math.floor(((this.geobounds.left - this.worldbounds.left) / this.resolution[this.level]) / 256);
        this.viewtiles.starty = Math.floor(((this.worldbounds.top - this.geobounds.top) / this.resolution[this.level]) / 256);
        this.viewtiles.endx = Math.ceil(((this.geobounds.right - this.worldbounds.left) / this.resolution[this.level]) / 256);
        this.viewtiles.endy = Math.ceil(((this.geobounds.top - this.worldbounds.top) / this.resolution[this.level]) / 256);

        return this.viewtiles;
    },

    getPixelOutSide : function(){
        this.pixeloutside.width = ((this.geobounds.left - this.worldbounds.left) / this.resolution[this.level]) % 256;
        this.pixeloutside.height = ((this.worldbounds.top - this.geobounds.top) / this.resolution[this.level]) % 256;

        return this.pixelbounds;
    },

    getTileURL : function(){

    }
};




