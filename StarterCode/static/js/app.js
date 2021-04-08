//Fetch the JSON data and console log it.
// var json_path="/StarterCode/samples.json"

d3.json("/StarterCode/samples.json").then(function (data) {
    //console.log(data);
    var names = data.names;
    //var samples = data.samples;
    //console.log(names);
    names.forEach(name => {
        dropDown = d3.select("#selDataset");
        var option = dropDown.append("option").text(name);
        option.attr("value", name);
    });
    var initSubjectID = d3.select("#selDataset>option").node().value
    demoInfo(initSubjectID);
    d3.selectAll('#selDataset').on('change', getDataID);
    function getDataID() {
        var dropDownMenu = d3.select('#selDataset');
        var datasetID = dropDownMenu.node().value;
        // console.log(datasetID);
        demoInfo(datasetID);
    }
    function demoInfo(subjectID) {
        var metadata = data.metadata;
        var sample = data.samples;
        // console.log(subjectID);
        //console.log(metadata)
        //console.log(sample)
        var resultMeta = metadata.filter(mdata => mdata.id === parseInt(subjectID))[0];
        var resultSample = sample.filter(smple => smple.id === subjectID)[0];
        //console.log(resultMeta);
        var panel = d3.select("#sample-metadata");
        var bar = d3.select("#bar");
        panel.html("");
        Object.entries(resultMeta).forEach(([key, value]) => {
            panel.append("h6").text(`${key.toUpperCase()}: ${value}`).style("color", "red");

        });
        console.log(resultSample);
        var values = resultSample.sample_values;
        var barTicks = resultSample.otu_ids.slice(0, 10).map((item)=>{

            return `OTU ${item}`

        });
        var trace = {
            x: values.slice(0, 10).reverse(),
            y: barTicks.reverse(),
            type: 'bar',
            orientation: 'h'

        };
        var data1 = [trace];
        Plotly.newPlot('bar', data1);
    }

});

    //  {
    //     conseole.log(this);
    //     var listItem = d3.select(this);
    //     console.log(listItem.property("value"));
    // });
    // Object.entries(data).forEach(element => {
    //     console.log(element);
    //     element.forEach(ele => {
    //         console.log(ele.names);
    //     });
    // });


