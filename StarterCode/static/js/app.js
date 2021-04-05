//Fetch the JSON data and console log it.
// var json_path="/StarterCode/samples.json"

d3.json("/StarterCode/samples.json").then(function (data) {
    var names = data.names;
    var metadata = data.metadata;
    var samples = data.samples;
    console.log(names);
    console.log(samples);
    console.log(metadata);
    names.forEach(name => {
        dropDown=d3.select("#selDataset");
        var option=dropDown.append("option").text(name);
        option.attr("value",name);
    });
    // Object.entries(data).forEach(element => {
    //     console.log(element);
    //     element.forEach(ele => {
    //         console.log(ele.names);
    //     });
    // });
});

