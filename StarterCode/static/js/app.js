//Fetch the JSON data and console log it.
// var json_path="/StarterCode/samples.json"

d3.json("StarterCode/samples.json").then(function (data) {
    buildDropDown(data);
    var initSubjectID = d3.select("#selDataset>option").node().value
    visualizations(data, initSubjectID);
    d3.selectAll('#selDataset').on('change', getDataID);
    function getDataID() {
        var dropDownMenu = d3.select('#selDataset');
        var datasetID = dropDownMenu.node().value;
        // console.log(datasetID);
        visualizations(data, datasetID);
    }

});
function buildDropDown(data) {
    //console.log(data);
    var names = data.names;
    //var samples = data.samples;
    //console.log(names);
    names.forEach(name => {
        dropDown = d3.select("#selDataset");
        var option = dropDown.append("option").text(name);
        option.attr("value", name);
    });
}
function visualizations(data, subjectID) {
    var metadata = data.metadata;
    var sample = data.samples;
    var resultMeta = metadata.filter(mdata => mdata.id === parseInt(subjectID))[0];
    var resultSample = sample.filter(smple => smple.id === subjectID)[0];
    buildPanel(resultMeta, metadata);
    buildHBar(resultSample, sample);
    buildGauge(resultMeta, metadata);
    buildBubble(resultSample, sample);
}
function buildPanel(resultMeta, metadata) {
    var panel = d3.select("#sample-metadata");
    var bar = d3.select("#bar");
    panel.html("");
    Object.entries(resultMeta).forEach(([key, value]) => {
        panel.append("h6").text(`${key.toUpperCase()}: ${value}`).style("color", "Black").style("font-weight","bold").style("margin-left","10px");

    });

}
function buildHBar(resultSample, sample) {
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
}
function buildGauge(resultMeta, metadata) {
    //finding the current frequency for subject ID
    var wfreq = resultMeta.wfreq;
    // console.log(wfreq);

    //finding the max frequency
    var wfreqArray = metadata.filter(wash => wash.wfreq);
    var maxFreq = d3.max(wfreqArray.map(freq => freq.wfreq));

    //calculating the steps for the gauge
    var gaugeSteps = [];
    var colors = coloring(maxFreq);
    for (var i = 0; i < maxFreq; i++) {
        //pushing steps and colors to a gaugeSteps list
        gaugeSteps.push({ range: [i, i + 1], color: colors[i] });
    }
    console.log(gaugeSteps);
    if (wfreq === null) {
        wfreq = 0;
    }
    //defining the gauge trace
    var traceGauge = {
        type: "indicator",
        mode: "gauge+number",
        value: wfreq,
        title: "Belly Button Washing Frequency<br>Scrubs per Week",
        gauge: {
            axis: { range: [null, maxFreq], tickwidth: 1, tickcolor: "darkblue" },
            bar: { color: "yellow" },
            bgcolor: "white",
            borderwidth: 4,
            bordercolor: "gray",
            steps: gaugeSteps,
            threshold: {
                line: { color: "red", width: 5 },
                thickness: 0.75,
                value: wfreq
            }
        }

    }
    var dataGauge = [traceGauge];
    Plotly.newPlot('gauge', dataGauge);

}
function buildBubble(resultSample, sample) {
    var xAxis = resultSample.otu_ids;
    var yAxis = resultSample.sample_values;
    console.log(resultSample);
    var xAxisLength = xAxis.length;
    var markerColors = coloring(xAxisLength);
    var opacityNum = randomNum(xAxisLength);

    bubbleTrace = {

        x: xAxis,
        y: yAxis,
        mode: 'markers',
        marker: { color: markerColors, opacity: opacityNum, size: yAxis }
    }

    var bubbleData = [bubbleTrace];
    var bubbleLayout={
        xaxis:{title:"OTU ID"}
    }
    Plotly.newPlot('bubble',bubbleData,bubbleLayout);

};

function coloring(numColor) {
    var colorsList = [];
    for (var i = 0; i < numColor; i++) {
        //defining a color in hex
        var color = Math.floor((Math.random() * 1000000) + 1);

        colorsList.push("#" + ("000000" + color.toString(16)).slice(-6));
    }

    return colorsList;
}
function randomNum(num) {
    var rnum = [];
    for (var i = 0; i < num; i++) {
        rnum.push(Math.random());
    }
    return rnum;
}

