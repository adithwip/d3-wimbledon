/* global d3 */
let dataSet = [];

// Our canvas
const width = 1250,
  		height = 300,
  		margin = 20,
			marginLeft = 40,
			paddingTop = 10,
			paddingBottom = 15

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
	.attr('height', height)
	


// Data reloading
let reload = () => {
	// Your data parsing here...
	d3.tsv('afcw-results.tsv', (rows) => {
		rows.forEach(row => {
			dataSet.push(row.GoalsScored)
		})
		console.log(dataSet)
		console.log(d3.max(dataSet))
		redraw(dataSet)
	})
}

// redraw function
let redraw = (data) => {

	let yScale = d3.scaleLinear()
						.domain([0, d3.max(data)])
						.range([0, height])

	let xScale = d3.scaleLinear()
						.domain([0, data.length])
						.range([0, width])

	// D3 ColorScale
	let colorScale = d3.scaleLinear()
									.domain([0, d3.max(data)])
									.range(['peru', 'teal'])

	let xAxis = d3.scaleLinear()
						.domain([0, data.length])
						.range([0, width])

	let yAxis = d3.scaleLinear()
						.domain([0, d3.max(data)])
						.range([height, 0])
	
  // Your data to graph here
	svg.selectAll('rect')
							.data(data)
							.enter()
							.append('rect')
							.attr('class', 'bar')
							
							.attr('x', function(d, i) {
								return i * 14 + marginLeft
							})
							.attr('y', function(d) {
								return height - yScale(d)
							})
							
							.attr('width', 12)
							.attr('height', function(d) {
								return yScale(d)
							})
							.attr('fill', colorScale)

	svg.append("g")
    .attr("transform", "translate(" + marginLeft + ",0)")
    .attr("class", "axis")
    .call(d3.axisLeft(yAxis)
        .ticks(d3.max(data)));
				
	svg.append("g")
    .attr("transform", `translate(${marginLeft}, ${height - margin})`)
    .attr("class", "axis")
    .call(d3.axisBottom(xAxis)
        .ticks(data.length));

}

reload()
