/**
 * Created by z on 2014/10/16.
 */
(function(){
//    for(var i in kMap.resolution){
//        document.write(i);
//        document.write(" ");
//        document.write(kMap.resolution[i]);
//        document.write(" ");
//    }
    kMap.setMap("kmap", {x:2,y:2}, 2);
    document.writeln(kMap.level);

    document.writeln(kMap.name);

    document.writeln(kMap.center.x);
    document.writeln(kMap.center.y)

    var four = kMap.center.x + kMap.center.y;
    document.writeln(four);
    document.writeln(127/2);
})();