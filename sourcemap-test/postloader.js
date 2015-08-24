var SourceMapConsumer = require("source-map").SourceMapConsumer;
var SourceMapGenerator = require("source-map").SourceMapGenerator;

module.exports = function (src, map) {
    var mapJson = new SourceMapConsumer(map);
    //console.log(mapJson);
    var generator = SourceMapGenerator.fromSourceMap(mapJson);
    mapJson.eachMapping(function (m) {
        //console.log(m);
        m.generatedLine++;
        generator.addMapping({
            generated: {
                line: m.generatedLine + 3,
                column: m.generatedColumn
            },
            source: m.source,
            original: {
                line: m.originalLine,
                column: m.originalColumn
            },
            name: m.name
        });
    });
    this.callback(null, '//*Hello*/\n\n\n\n' + src, generator.toString());
};