/**
 * Created by zhangkai on 2014/6/30.
 */
"use strict";
var version = "0.1";

var kMap = {
    version : version,

    name : "default",

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

    tilesize : 256,

    levels : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],

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
        this.center = center;
        this.level = level;
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

    getTileURL : function(index){
    }
};




