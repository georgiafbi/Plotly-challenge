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
        console.log(metadata)
        console.log(sample)
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
        var barTicks = resultSample.otu_ids.slice(0, 10).map((item) => {

            return `OTU ${item}`

        });
        var traceBar = {
            x: values.slice(0, 10).reverse(),
            y: barTicks.reverse(),
            type: 'bar',
            orientation: 'h'

        };
        var dataBar = [traceBar];
        Plotly.newPlot('bar', dataBar);
        var wfreqArray = metadata.filter(wash => wash.wfreq >= 0);
        console.log(wfreqArray);
        var wfreq = resultMeta.wfreq;
        console.log(wfreq);

        var traceGauge = {
            type: "indicator",
            mode: "gauge+number+delta",
            value: wfreq,
            title: 'Belly Button Washing Frequency',
            delta: {
                reference: 0, increasing: { color: "RebeccaPurple" },
                gauge: {
                    axis: { range: [null, Math.max(wfreqArray)], tickwidth: 1, tickcolor: "darkblue" },
                    bar: { color: "darkblue" },
                    bgcolor: "white",
                    borderwidth: 2,
                    bordercolor: "gray",
                    steps: [
                        { range: [0, 1], color: "#00FFFF" },
                        { range: [1, 2], color: "#7FFFD4" },
                        { range: [2, 3], color: "#AFE1AF" },
                        { range: [3, 4], color: "#40E0D0" },
                        { range: [4, 5], color: "#00FF7F" },
                        { range: [5, 6], color: "#C4B454" },
                        { range: [6, 7], color: "#C9CC3F" },
                        { range: [7, 8], color: "#96DED1" },
                        { range: [8, 9], color: "#454B1B" },
                    ],
                    threshold: {
                        line: { color: "red", width: 4 },
                        thickness: 0.75,
                        value: 490
                    }
                }
            }
        }
        var dataGauge = [traceGauge];
        Plotly.newPlot('gauge', dataGauge);
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


