var width = 1024, height = 1024

var force = cola.d3adaptor()
    .linkDistance(100)
    .size([width, height])
    .flowLayout('y',75)

var svg = d3.select("#graph").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("pointer-events", "all")

svg.append('rect')
    .attr('class', 'background')
    .attr('width', '100%')
    .attr('height', '100%')
    .call(d3.behavior.zoom().on("zoom", function () {
        viewport.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")")
    }))

var viewport = svg.append('g')

var focusedNode = null

svg.append('svg:defs').append('svg:marker')
    .attr('id', 'end-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
  .append('svg:path')
    .attr("d", "M0,-5L10,0L0,5")
    .attr('stroke-width', '0px')
    .attr('fill', '#666')

var lineFunction = d3.svg.line()
    .x(function (d) { return d.x })
    .y(function (d) { return d.y })
    .interpolate("linear")

d3.dsv("->",'text/plain')('graph.txt')
    .row(function(d) {
        // d3 does not parse multiple character delimiters well, but we can cope...
        var parent = d['parent'], child = d['>child'].substring(1)
        return { nodes: [parent, child], link: { source: parent, target: child }  }
    })
    .get(function(err, rows) {
        var nodes = rows
            .reduce(function(acc, row) {
                acc.add(row.nodes[0])
                acc.add(row.nodes[1])
                return acc
            }, d3.set([]))
            .values()
            .map(function(node) { return { name: node } })

        var links = rows.map(function(row) {
            var sourceNode = nodes.filter(function(n) { return n.name == row.link.source })[0]
            var targetNode = nodes.filter(function(n) { return n.name == row.link.target })[0]
            return { source: sourceNode, target: targetNode }
        })

        var distMatrix = floydWarshall(nodes, links, function(d) { return d.name })

        force
          .nodes(nodes)
          .links(links)
          .start(10,30,100)

        var link = viewport.selectAll(".link")
          .data(links)

        link.enter().append("svg:path")
            .attr("class", "link")
            .attr("id", function(d) { return d.source.index + "_" + d.target.index })

        var edgeLabelText = viewport.selectAll(".edgeLabel")
            .data(links)
          .enter().append("svg:text")
            .attr("class", "edgeLabel")

        var edgeLabelPath = edgeLabelText.append("svg:textPath")
            .attr("text-anchor", "middle")
            .attr("xlink:href", function(d) { return "#" + d.source.index + "_" + d.target.index })
            .attr("startOffset", "60%")

        var node = viewport.selectAll(".node")
            .data(nodes)

        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .call(force.drag)

        nodeEnter.append("circle")
            .attr("r", 16)
            .on("click", function(d) { focusOnNode(d, node,  edgeLabelPath, distMatrix) })
            .on("mouseover", function(d) { focusOnPath(d, link, distMatrix) })

        nodeEnter.append("text")
            .attr("text-anchor", "right")
            .attr("dx", "-2em")
            .attr("dy", ".35em")
            .text(function(d) { return d.name })
            .on("click", function(d) { focusOnNode(d, node,  edgeLabelPath, distMatrix) })

        // TODO hardcoded the root here... a more sophisticated solution would determine the root(s)
        focusOnNode({ name: 'A' }, node, edgeLabelPath, distMatrix)

        force.on("tick", function() {
            link.attr("d", function (d) {
                cola.vpsc.makeEdgeBetween(d, d.source.bounds, d.target.bounds, 28)
                var lineData = [{ x: d.sourceIntersection.x, y: d.sourceIntersection.y }, { x: d.arrowStart.x, y: d.arrowStart.y }]
                return lineFunction(lineData)
            })

            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")" })
        })
    })

var colorByDistance = d3.scale.ordinal().domain([0,5]).range(colorbrewer.RdBu[6])

function focusOnPath(focusDep, link, distMatrix) {
    var shortestPath = distMatrix.path(focusedNode, focusDep)

    var inPath = function(d) {
        var intersection = shortestPath.filter(function(seg) {
           return seg.source.name == d.source.name && seg.target.name ==  d.target.name
        })
        return intersection.length > 0
    }

    link
      .style("stroke", function(d) { return inPath(d) ? 'magenta' : '#999' })
      .style("stroke-opacity", function(d) { return inPath(d) ? 1 : 0.6 })
}

function focusOnNode(focus, node, edgeLabelPath, distMatrix) {
    focusedNode = focus

    var nodeColor = function(node) {
        var dist = distMatrix.dist(focus, node)
        return d3.rgb(dist == Infinity ? '#666' : colorByDistance(Math.min(dist, 4)))
    }

    node.selectAll("circle")
        .transition()
        .style("fill", nodeColor)
        .style("stroke", function(d) { return nodeColor(d).darker(2) })

    edgeLabelPath.text(function(d) {
        return distMatrix.dist(focus, d.source) + distMatrix.dist(d.source, d.target)
    })
}