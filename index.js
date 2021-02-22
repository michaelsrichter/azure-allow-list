const { exec } = require("child_process");
const fs = require('fs');
const urlRegex = require('url-regex');
const ipRegex = require('ip-regex');
const { convertArrayToCSV } = require('convert-array-to-csv');
const converter = require('convert-array-to-csv');
var tmp = require('temporary');

var file = new tmp.File();

var query = 'az graph query -q "Resources | where subscriptionId =~ \'' + process.argv[2] + '\'" -o json > ' + file.path;
exec(query, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }

    var resources = JSON.parse(fs.readFileSync(file.path));

 var output = [];
    //find each resource and return it 
    resources.forEach(function (resource) {

        //recursively look through all nodes and see if it's a URL or an IP Address
        var result = searchObject(resource, resource, function (value) { return isUrlOrIPAddress(value); });
        if (result.length > 0) {
            Array.prototype.push.apply(output,result); 

        }

    });

    var csvFromArrayOfObjects = convertArrayToCSV(output);
    console.log(csvFromArrayOfObjects);
});

var isUrlOrIPAddress = function (value) {
    if (value == null) return false;
    if (value == undefined) return false;

    if (urlRegex({ exact: true }).test(value)) return true;
    if (ipRegex({ exact: true }).test(value)) return true;
    if (ipRegex.v6({ exact: true }).test(value)) return true;
    return false;

}


// https://stackoverflow.com/questions/22222599/javascript-recursive-search-in-json-object
var searchObject = function (object, parentResource, matchCallback, currentPath, result, searched) {
    currentPath = currentPath || '';
    result = result || [];
    searched = searched || [];
    if (searched.indexOf(object) !== -1 && object === Object(object)) {
        return;
    }
    searched.push(object);
    if (matchCallback(object)) {
        //console.info(resource.location + " " + resource.type + " " + resource.resourceGroup + " " + resource.name)
        result.push({
            resourceGroup: parentResource.resourceGroup,
            name: parentResource.name,
            location: parentResource.location,
            property: currentPath.substring(1),
            type: parentResource.type,
            value: object,
        });
    }
    try {
        if (object === Object(object)) {
            for (var property in object) {
                if (property.indexOf("$") !== 0) {
                    searchObject(object[property], parentResource, matchCallback, currentPath + "." + property, result, searched);
                }
            }
        }
    }
    catch (e) {
        console.log(object);
        throw e;
    }
    return result;
}
