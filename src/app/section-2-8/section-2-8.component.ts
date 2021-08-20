import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 };
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

@Component({
  selector: 'app-section-2-8',
  templateUrl: './section-2-8.component.html',
  styleUrls: ['./section-2-8.component.css']
})
export class Section28Component implements OnInit {
  data = [
    {
      name: 'b1',
      height: '800'
    },
    {
      name: 'b2',
      height: '200'
    },
    {
      name: 'b3',
      height: '254.04'
    },
    {
      name: 'b4',
      height: '850'
    },
    {
      name: 'b5',
      height: '900'
    },
    {
      name: 'b6',
      height: '350'
    },
    {
      name: 'b7',
      height: '700'
    },
    {
      name: 'b8',
      height: '450'
    },
    {
      name: 'b9',
      height: '200'
    },
    {
      name: 'b10',
      height: '650'
    },
    {
      name: 'b11',
      height: '600'
    },
    {
      name: 'b12',
      height: '450'
    },
    {
      name: 'b13',
      height: '200'
    },
    {
      name: 'b14',
      height: '650'
    },
    {
      name: 'b15',
      height: '600'
    }
  ];
  constructor() {}

  ngOnInit() {
    const svg = d3
      .select('#chart-area')
      .append('svg')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .style('outline', '1px solid #cdcdcd');

    const g = svg
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    // X label
    g.append('text')
      .attr('class', 'x axis-label')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 80)
      .attr('font-size', '20px')
      .attr('text-anchor', 'middle')
      .text("The word's tallest buildings");

    // Y label
    g.append('text')
      .attr('class', 'y axis-label')
      .attr('x', -(HEIGHT / 2))
      .attr('y', -60)
      .attr('font-size', '20px')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text('Height (m)');

    const x = d3
      .scaleBand()
      .domain(this.data.map(a => a.name))
      .range([0, WIDTH])
      .paddingInner(0.2)
      .paddingOuter(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, d => d.height)])
      .range([HEIGHT, 0]);

    const xAxisCall = d3.axisBottom(x);
    g.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${HEIGHT})`)
      .call(xAxisCall)
      .selectAll('text')
      .attr('text-anchor', 'end')
      .attr('y', '10')
      .attr('x', '-5')
      .attr('transform', 'rotate(-40)');

    const yAxisCall = d3.axisLeft(y).ticks(5);
    g.append('g')
      .attr('class', 'y axis')
      .call(yAxisCall);

    const rects = g.selectAll('rect').data(this.data);
    rects
      .enter()
      .append('rect')
      .attr('y', d => y(d.height))
      .attr('x', (d, i) => x(d.name))
      .attr('width', x.bandwidth)
      .attr('height', d => HEIGHT - y(d.height))
      .attr('fill', 'grey');
  }
}
