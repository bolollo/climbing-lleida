const csv = require("csvtojson");
const fs = require("fs");

const myArgs = process.argv.slice(2);

const csvFilePath = myArgs[0];
const geojsonFilePath = myArgs[1]

const geojson = {
    "type": "FeatureCollection",
    "features": []
};

csv().fromFile(csvFilePath).then((json)=>{
    console.log(json);
    const features = json.map((item) => {
        return {
            "type": "Feature",
            "properties": {
                "name": item.name
            },
            "geometry": {
              "type": "Point",
              "coordinates": [
                parseFloat(item.lon),
                parseFloat(item.lat)
              ]
            }
        }
    });
    geojson.features = features;

    fs.writeFileSync(geojsonFilePath, JSON.stringify(geojson, null, 4));
});

