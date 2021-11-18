import { useEffect } from 'react'
import * as d3 from 'd3'
import lobbyData from '../../data/oilgas_lobbying_totals_98-21.csv'

// const yMinValue = d3.min(lobbyData, (d: any) => d.year)
// const yMaxValue = d3.max(lobbyData, (d: any) => d.year)
// const xMinValue = d3.min(lobbyData, (d: any) => d.year)
// const xMaxValue = d3.max(lobbyData, (d: any) => d.year)

const MARGIN = 50

const yMinValue = 0
const yMaxValue = 30_000_000
const xMinValue = 1998
const xMaxValue = 2021

const width = 500
const height = 400

function LobbyingGraph({}) {
  useEffect(() => {
    drawChart()
  }, [])

  const drawChart = () => {
    const svg = d3
      .select('#lobbying-totals-graph-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
    // .attr('transform', `translate(${margin.left},${margin.top})`)

    const xScale = d3
      .scaleLinear()
      .domain([xMinValue, xMaxValue])
      .range([0, width])
    const yScale = d3.scaleLinear().range([height, 0]).domain([0, yMaxValue])
    const line = d3
      .line()
      .x((d: any) => xScale(d.year))
      .y((d: any) => yScale(d.exxon))
      .curve(d3.curveMonotoneX)

    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(-height)
          .tickFormat('' as any)
      )
    svg
      .append('g')
      .attr('class', 'grid')
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-width)
          .tickFormat('' as any)
      )
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).scale(xScale).tickSize(15))
    svg.append('g').attr('class', 'y-axis').call(d3.axisLeft(yScale))
    svg
      .append('path')
      .datum(lobbyData)
      .attr('fill', 'none')
      .attr('stroke', '#f6c3d0')
      .attr('stroke-width', 4)
      .attr('class', 'line')
      .attr('d', line)

    const focus = svg
      .append('g')
      .attr('class', 'focus')
      .style('display', 'none')
    focus.append('circle').attr('r', 5).attr('class', 'circle')
    const tooltip = d3
      .select('#lobbying-totals-graph-container')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)

    svg
      .append('rect')
      .attr('class', 'overlay')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('opacity', 0)
      .on('mouseover', () => {
        focus.style('display', null)
      })
      .on('mouseout', () => {
        tooltip.transition().duration(300).style('opacity', 0)
      })
      .on('mousemove', mousemove)

    function mousemove(event) {
      const bisect = d3.bisector((d: any) => d.year).left
      const xPos = d3.pointer(event)[0]
      const x0 = bisect(lobbyData, xScale.invert(xPos))
      const d0 = lobbyData[x0]
      focus.attr(
        'transform',
        `translate(${xScale(d0.year)},${yScale(d0.exxon)})`
      )
      tooltip.transition().duration(300).style('opacity', 0.9)
      tooltip
        .html(d0.tooltipContent || d0.label)
        .style(
          'transform',
          `translate(${xScale(d0.label) + 30}px,${yScale(d0.value) - 30}px)`
        )
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center"
      id="lobbying-totals"
    >
      <p className="font-bold text-lg">
        These, and other oil and gas corporations, spend hundreds of millions lobbying congress every year.
      </p>
      <div id="lobbying-totals-graph-container" className='my-5' />
      <p className="text-left text-xs">
        Amounts spent lobbying as disclosed by select companies - released by Senate Office of Public Records January 2021 - source: OpenSecrets
      </p>
    </div>
  )
}

export default LobbyingGraph
