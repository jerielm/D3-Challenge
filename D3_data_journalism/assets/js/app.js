//setting graph bounds
var svgWidth = 900;
var svgHeight = 900;
var margin = {top:45, right:40, bottom: 100, left: 100};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// svg
var svg = d3
    .select('.chart')
    .append('svg')
    .attr('width',svgWidth)
    .attr('height',svgHeight)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
var chart = svg.append('g');
d3.select('.chart').append('div').attr('class','tooltip').style('opacity',0);



//reading in the csv
d3.csv('assets/data/data.csv',function(err, data) {



    //err function
    if (err) throw err;
    data.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });



    // chart bounds
    var yLinearScale = d3.scaleLinear().range([height,0]);
    var xLinearScale = d3.scaleLinear().range([0,width]);
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);




    //data chart scaling
    xLinearScale.domain([7,d3.max(data, function(data) {
            return +data.poverty;}),]);
    yLinearScale.domain([0, d3.max(data, function(data) {
        return +data.healthcare; }),]);

   

    //datapoints
    chart
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx',function(data, index){
            return xLinearScale(data.poverty);
        })
        .attr('cy',function(data, index){
            return yLinearScale(data.healthcare);
        })
        .attr('r', '20')
        .attr('stroke', 'black')
        .attr('opacity', 0.9)
        .attr('fill', 'black')
        
    chart
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(bottomAxis);

    chart.append('g').call(leftAxis);

    //State ID's on the
    svg.selectAll('.dot')
    .data(data)
    .enter()
    .append('text')
    .text(function(data){return data.abbr;})
    .attr('x', function(data){
        return xLinearScale(data.poverty);
    })
    .attr('y', function(data) {
        return yLinearScale(data.healthcare);
    })
    .attr('font-size','12px')
    .attr('fill','white')
    .style('text-anchor','middle');
    

    //y axis label
    chart
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left + 40)
        .attr('x', 0 - height / 2)
        .attr('dy','1em')
        .attr('class', 'axisText')
        .text('% Lacks Healthcare');


    //x axis label
    chart
        .append('text')
        .attr('transform', 'translate(' + width / 2 + ' , ' + (height + margin.top + 30) + ')',)
        .attr('class', 'axisText')
        .text('% In Poverty');
});