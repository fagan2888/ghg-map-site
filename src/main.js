import { expandableSankeyDiagram } from 'd3-expandable-sankey';
import * as d3 from 'd3';
import { select, json } from 'd3';

var SCALE = 8e-9;
var diagram = expandableSankeyDiagram()
    .scale(SCALE)
    .on('clickNode', setDetails);

console.log('loading data...');

json("data/sankey_data.json")
  .then(function(data) {
    console.log('got data!');
    console.log(data);
    diagram(select('svg').datum(data));
  })
  .catch(function(error) {
    throw(error);
  });

var numberFormat0 = d3.format('.1f');

function numberFormat(x) {
  return numberFormat0(x / 1e9) + ' Gt';
}

function setDetails(d) {
  var details = d3.select('#details');
  details.select('h1').text(d.title)
    .append('small').text(numberFormat(d.value));
  details.select('p').text(d.description);

  details.select('tbody')
    .selectAll('tr')
    .remove();

  var rows = details.select('tbody')
      .selectAll('tr')
      .data(d.subdivisions)
      .enter()
      .append('tr');

  rows.append('td').text(function(d) { return d.label; });
  rows.append('td').text(function(d) { return numberFormat(d.value); });
  rows.append('td').text(function(d) { return d.description; });
}
