/**
 * Created by z on 2014/7/2.
 */
kMap.map=function(name, height, width){
    var map={};
    map.name=name;
    map.height=height;
    map.width=width;
    map.projection="EPSG:4326";
    map.units="m";
    map.resolutions="";
    map.maxresolutions="";
    map.minresolutioins="";
    map.zoomlevel=1;
    map.center=kMap.point(0,0,0,0);

    map.getName=function(){
        return map.name;
    };

    map.setName=function(name){
        map.name=name;
    };

    map.getHeight=function(){
        return map.height;
    };

    map.setHeight=function(height){
        map.height=height;
    };

    map.getWidth=function(){
        return map.width;
    };

    map.setWidth=function(width){
      map.width= width;
    };

    return map;
};