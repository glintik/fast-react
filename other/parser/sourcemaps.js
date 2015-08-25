exports.move = function (map, range, to) {
    var start = range[0];
    var end = range[0];
    var lineShift = to.line - start.line;
    var shiftColumn = start.column - to.column;
    for (var i = 0; i < map.length; i++) {
        var item = map[i];
        var gen = item.generated;
        var orig = item.generated;
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
exports.remove = function (map, range) {
    exports.move(map, range, {line: 0, column: 0});
};