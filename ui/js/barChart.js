function barChart(htmlClassorId,graphQlQuery,) {
      // set the dimensions and margins of the graph
  const margin = { top: 30, right: 30, bottom: 70, left: 60 },
  width = 760 - margin.left - margin.right,
  height = 650 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Parse the Data
//d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv").then( function(data) {
d3.json("data/countries.json").then(function (data) {
  //console.log(data);

  // X axis
  const x = d3.scaleBand()
    .range([0, width])
    .domain(data.map(d => d.country))
    .padding(0.2);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, 13000])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Bars
  svg.selectAll("mybar")
    .data(data)
    .join("rect")
    .attr("x", d => x(d.country))
    .attr("y", d => y(d.count))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.count))
    .attr("fill", "#69b3a2")

})
.catch(error => console.error(error));     
}