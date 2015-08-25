exports.move2 = function (map, range, to) {
    var start = range[0];
    var end = range[1];
    var lineShift = to.line - start.line;
    var shiftColumn = start.column - to.column;
    for (var i = 0; i < map.length; i++) {
        var item = map[i];
        var gen = item.generated;
        var orig = item.original;
        if (orig.line > start.line && orig.line < end.line) {
            gen.line = orig.line + lineShift;
        }
        if ((orig.line == start.line && orig.column >= start.column) ||
            (orig.line == end.line && orig.column <= end.column)) {
            gen.line = orig.line + lineShift;
            gen.column = orig.column + shiftColumn;
        }
    }
};

exports.move = function (map, range, to) {
    //console.log("move", range, to);
    var start = range[0];
    var end = range[1];
    var lineShift = to.line - start.line;
    var shiftColumn = to.column - start.column;
    for (var i = 0; i < map.length; i++) {
        var item = map[i];
        var gen = item.generated;
        if (gen.line > start.line && gen.line < end.line) {
            gen.line = gen.line + lineShift;
        }
        if ((gen.line == start.line && gen.column >= start.column) ||
            (gen.line == end.line && gen.column <= end.column)) {
            gen.line = gen.line + lineShift;
            gen.column = gen.column + shiftColumn;
        }
    }
};

exports.shiftGenRight = function(map, start, to){
    var diffLine = to.line - start.line;
    var diffCol = to.column - start.column;
    //console.log("shiftGenRight", start, to, diffLine);
    for (var i = 0; i < map.length; i++) {
        var item = map[i];
        var gen = item.generated;
        if (gen.line > start.line) {
            gen.line += diffLine;
        }
        if ((gen.line == start.line && gen.column >= start.column)) {
            gen.line += diffLine;
            gen.column += diffCol;
        }
    }
};

exports.remove = function (map, range) {
    exports.move(map, range, {line: 0, column: 0});
};