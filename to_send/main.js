//let data = d3.csv("amsterdamBar.csv");
let data = [
  { combined: 'Entire home/apt Weekday'    , realSum: 733.179099 },
  { combined: 'Entire home/apt Weekend'    , realSum: 736.089716 },
  { combined: 'Private room Weekday'   , realSum: 366.764655 },
  { combined: 'Private room Weekend', realSum: 407.722149 },
  { combined: 'Shared room Weekday'  , realSum: 280.973918 },
  { combined: 'Shared room Weekend'  , realSum: 280.798163 }
];
//create SVG

let width=800, height = 600;

let margin = {
  top: 30, 
  bottom: 30,
  left: 30,
  right: 30
};

const colorArray = d3.scaleOrdinal()
.domain(['groupA', 'groupB']) 
  .range(['orange', 'steelblue']);

let svg = d3.select('#plot')
  .append('svg')  
  .attr('width', width)
  .attr('height', height)
  .style('background', '#e9f7f2');

// Make the y axis 
let yScale = d3.scaleLinear()
  .domain([0, 800])
  .range([height - margin.bottom, margin.top]);  

let yAxis = svg.append('g') 
  .attr('transform', `translate(${margin.left},0)`)
  .call(d3.axisLeft().scale(yScale));

//Make the x axis

let xScale = d3.scaleBand()
  .domain(data.map(d => d.combined))
  .range([margin.left, width - margin.right])
  .padding(0.05);

let xAxis = svg.append('g')
  .attr('transform', `translate(0, ${height - margin.bottom})`)
  .call(d3.axisBottom().scale(xScale));

let bar = svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', d => xScale(d.combined))
  .attr('y', d => yScale(d.realSum))
  .attr('width', xScale.bandwidth())
  .attr('height', d=> height - margin.bottom - yScale(d.realSum))
  .attr('fill', (d, i) => colorArray(i % 2));


