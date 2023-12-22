let prestations;
let prestationsDescriptionSort = "down";
let prestationsCountSort = "down";
let prestationsSumSort = "down";

function sortByDescription() {
    if (prestationsDescriptionSort == "down") {
    prestations.sort((a, b) => d3.ascending(a.description, b.description));
    prestationsDescriptionSort = "up";
    } else {
    prestations.sort((a, b) => d3.descending(a.description, b.description));
    prestationsDescriptionSort = "down";
    }

    d3
    .select("#content")
    .selectAll("div")
    .data(prestations, d => d.id)
    .order()
}

function sortByCount() {
    if (prestationsCountSort == "down") {
    prestations.sort((a, b) => d3.ascending(a.count, b.count));
    prestationsCountSort = "up";
    } else {
    prestations.sort((a, b) => d3.descending(a.count, b.count));
    prestationsCountSort = "down";
    }

    d3
    .select("#content")
    .selectAll("div")
    .data(prestations, d => d.id)
    .order()
    }

    function sortBySum() {
    if (prestationsSumSort == "down") {
    prestations.sort((a, b) => d3.ascending(a.sum, b.sum));
    prestationsSumSort = "up";
    } else {
    prestations.sort((a, b) => d3.descending(a.sum, b.sum));
    prestationsSumSort = "down";
    }

    d3
    .select("#content")
    .selectAll("div")
    .data(prestations, d => d.id)
    .order()
}


/**
 * 
 * @param {Array<{sum : int,count: int,description: string}>} data 
 */
function draw(data) {
    prestations = data

    d3.selectAll("#content")
    .selectAll("div")
    .data(prestations)
    .join("div")
    .attr("class", "prestation")
    .append("div")
    .attr("class", "prestationDescription")
    .text(d => d.description)

    d3.selectAll(".prestation")
    .append("div")
    .attr("class", "prestationCount")
    .text(d => d.count)

    d3.selectAll(".prestation")
    .append("div")
    .attr("class", "prestationSum")
    .transition()
    .style("with", "0px")
    .duration(1000)
    .style("width", d => 50+ d.sum / 50 +"px")
    .text(d => d.sum)

}