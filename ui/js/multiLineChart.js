
/**
 * 
 * @param {Array<{date : string,count: int,description: string}>} dataArray 
 * The date should be a string of year
 * @param {String} htmlIdorClass html id or class
 * @param {String} labelY label for the yAxis
 * @param {string} labelX label for the xAxis
 */
function multiLineGraph(dataArray, htmlIdorClass, labelY, labelX) {
    //console.log(dataArray)
    const width = 1000; // Augmentation de la largeur
    const height = 550; // Augmentation de la hauteur
    const marginTop = 50; // Ajustement de la marge supérieure
    const marginRight = 200; // Ajustement de la marge droite
    const marginBottom = 70; // Ajustement de la marge inférieure
    const marginLeft = 120; // Ajustement de la marge gauche

    // pour parser l'année en date
    const parseTime = d3.utcParse("%Y");

    // création de l'axe x qui contient les dates
    const x = d3.scaleUtc()
        .domain([parseTime(dataArray[0].date), parseTime(dataArray[dataArray.length - 1].date)])
        .range([marginLeft, width - marginRight]);

    // création de l'axe y qui contient le nombre de prestations
    const y = d3.scaleLinear()
        .domain([0, d3.max(dataArray, d => d.count)])
        .range([height - marginBottom, marginTop]);

    // création d'un ensemble des couleurs pour les prestations
    const color = d3.scaleOrdinal()
        .domain(dataArray.map(d => d.description))
        .range(d3.schemeCategory10);

    // création du svg qui va contenir le graph
    const svg = d3.select(htmlIdorClass).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    // ajout des axes x
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x))
        // ajout de label pour l'axe x
        .append("text")
        .attr("x", width / 2)
        .attr("y", marginBottom - 10)
        .attr("fill", "#000")
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .attr("style", "font: 18px sans-serif;")
        .text(labelX);

    // ajout des axes y
    svg.append("g")
        .attr("transform", `translate(${marginLeft},${0})`)
        .call(d3.axisLeft(y))
        // ajout de label pour l'axe y
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -marginLeft + 50)
        .attr("fill", "#000")
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .attr("style", "font: 18px sans-serif;")
        .text(labelY);

    // création des groupes pour les données grouper par description
    const serie = svg.append("g")
        .selectAll()
        .data(d3.group(dataArray, d => d.description))
        .join("g");

    // ajout des chemin pour dessiner les lignes
    serie.append("path")
        .attr("fill", "none")
        .attr("stroke", d => color(d[0]))
        .attr("stroke-width", 3)
        .attr(
            "d", d => d3.line()
                .x(d => x(parseTime(d.date)))
                .y(d => y(d.count))(d[1])
        );

    // Ajout des légendes
    const legend = svg.append("g")
        .attr("transform", `translate(${width - marginRight + 10},${marginTop + 20})`); // Ajustement de la position

    // Création des cercles colorés et des étiquettes pour chaque description
    const legends = legend.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legends.append("rect")
        .attr("x", 0)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legends.append("text")
        .attr("x", 25)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .attr("style", "font: 12px sans-serif;")
        //.style("font-size", "12px") // Ajustement de la taille du texte
        .text(d => d);
}

/**
 * 
 * @param {Array<{date : number, count: int, description: string}>} dataArray 
 * The date should be a number representing the month
 * @param {String} htmlIdorClass html id or class
 * @param {String} labelY label for the yAxis
 * @param {string} labelX label for the xAxis
 */
function multiLineGraphMonth(dataArray, htmlIdorClass, labelY, labelX) {
    const width = 1000;
    const height = 550;
    const marginTop = 50;
    const marginRight = 200;
    const marginBottom = 70;
    const marginLeft = 100;

    const x = d3.scaleLinear()
        .domain([1, 12])  // Months in numeric form
        .range([marginLeft, width - marginRight]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(dataArray, d => d.sum)])
        .range([height - marginBottom, marginTop]);

    const color = d3.scaleOrdinal()
        .domain(dataArray.map(d => d.description))
        .range(d3.schemeCategory10);

    const svg = d3.select(htmlIdorClass).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [20, 20, width, height])
        .attr("style", "max-width: 100%; height: auto; font: 2px sans-serif;");

    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x)
            .tickFormat(d3.format("d")))
        .append("text")
        .attr("x", width / 2)
        .attr("y", marginBottom - 10)
        .attr("fill", "#000")
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .attr("style", "font: 18px sans-serif;")
        .text(labelX);

    svg.append("g")
        .attr("transform", `translate(${marginLeft},${0})`)
        .call(d3.axisLeft(y))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -marginLeft + 50)
        .attr("fill", "#000")
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .attr("style", "font: 18px sans-serif;")
        .text(labelY);

    const serie = svg.append("g")
        .selectAll()
        .data(d3.group(dataArray, d => d.description))
        .join("g");

    serie.append("path")
        .attr("fill", "none")
        .attr("stroke", d => color(d[0]))
        .attr("stroke-width", 3)
        .attr(
            "d", d => d3.line()
                .x(d => x(d.month))  // Use the month directly as x-coordinate
                .y(d => y(d.sum))(d[1])
        );

    const legend = svg.append("g")
        .attr("transform", `translate(${width - marginRight + 10},${marginTop + 20})`);

    const legends = legend.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legends.append("rect")
        .attr("x", 0)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legends.append("text")
        .attr("x", 25)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .attr("style", "font: 12px sans-serif;")
        .text(d => d);
}
