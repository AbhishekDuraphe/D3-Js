import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

const MARGIN = { TOP: 10, BOTTOM: 100, RIGHT: 10, LEFT: 100 };
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

@Component({
  selector: 'app-starbucks-coffee-project',
  templateUrl: './starbucks-coffee-project.component.html',
  styleUrls: ['./starbucks-coffee-project.component.css']
})
export class StarbucksCoffeeProjectComponent implements OnInit {
  constructor() {}
  data = [
    {
      month: 'January',
      revenue: 13432,
      profit: 8342
    },
    {
      month: 'February',
      revenue: 19342,
      profit: 10342
    },
    {
      month: 'March',
      revenue: 17443,
      profit: 15423
    },
    {
      month: 'April',
      revenue: 26342,
      profit: 18432
    },
    {
      month: 'May',
      revenue: 34213,
      profit: 29434
    },
    {
      month: 'June',
      revenue: 50321,
      profit: 45343
    },
    {
      month: 'July',
      revenue: 54273,
      profit: 47452
    },
    {
      month: 'August',
      revenue: 94273,
      profit: 17452
    },
    {
      month: 'Sept',
      revenue: 34273,
      profit: 67452
    },
    {
      month: 'Oct',
      revenue: 74273,
      profit: 452
    },
    {
      month: 'Nov',
      revenue: 84273,
      profit: 27452
    },
    {
      month: 'Dec',
      revenue: 34273,
      profit: 97452
    }
  ];
  x: any;
  y: any;
  group: any;

  ngOnInit() {
    this.initSVG();
  }
  initSVG() {
    const svg = d3
      .select('#chart-area2')
      .append('svg')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .style('outline', '1px solid #cdcdcd');

    this.group = svg
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);
    this.initLabels();
  }

  initLabels() {
    // X label
    this.group
      .append('text')
      .attr('class', 'x axis-label')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 80)
      .attr('font-size', '20px')
      .attr('text-anchor', 'middle')
      .text('Month');

    // Y label
    this.group
      .append('text')
      .attr('class', 'y axis-label')
      .attr('x', -(HEIGHT / 2))
      .attr('y', -60)
      .attr('font-size', '20px')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text('Revenue ($)');
    this.initScales();
  }

  initScales() {
    this.x = d3
      .scaleBand()
      .domain(this.data.map(a => a.month))
      .range([0, WIDTH])
      .paddingInner(0.4)
      .paddingOuter(0.2);

    this.y = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, d => d.revenue)])
      .range([HEIGHT, 0]);
    this.setAxes();
  }

  setAxes() {
    const xAxisCall = d3.axisBottom(this.x);
    this.group
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${HEIGHT})`)
      .call(xAxisCall)
      .selectAll('text')
      .attr('text-anchor', 'end')
      .attr('y', '10')
      .attr('x', '-5')
      .attr('transform', 'rotate(-40)');

    const yAxisCall = d3
      .axisLeft(this.y)
      .ticks(5)
      .tickFormat(d => '$' + d);
    this.group
      .append('g')
      .attr('class', 'y axis')
      .call(yAxisCall);
    this.drawGrid();
    this.drawChart();
  }
  drawGrid() {
    const xAxisGrid = d3
      .axisBottom(this.x)
      .tickSize(-HEIGHT)
      .tickFormat('')
      .ticks(5);
    const yAxisGrid = d3
      .axisLeft(this.y)
      .tickSize(-WIDTH)
      .tickFormat('')
      .ticks(5);
    this.group
      .append('g')
      .attr('class', 'x axis-grid')
      .attr('transform', 'translate(0,' + HEIGHT + ')')
      .call(xAxisGrid)
      .style('color', '#e0e0e0');
    this.group
      .append('g')
      .attr('class', 'y axis-grid')
      .call(yAxisGrid)
      .style('color', '#e0e0e0');
    // Create axes.
    this.group
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + HEIGHT + ')')
      .call(this.x);
    this.group
      .append('g')
      .attr('class', 'y axis')
      .call(this.y);
  }

  drawChart() {
    const rects = this.group.selectAll('rect').data(this.data);
    rects
      .enter()
      .append('rect')
      .attr('y', d => this.y(d.revenue))
      .attr('x', (d, i) => this.x(d.month))
      .attr('width', this.x.bandwidth)
      .attr('height', d => HEIGHT - this.y(d.revenue))
      .attr('fill', 'grey');
  }
}
