function floydWarshall(vertices, edges) {
    var allPathsShortest = []

    var dist = function(i, j) { return allPathsShortest[[vertices[i],vertices[j]]] }

    for(var i = 0; i < vertices.length; i++) {
        var v1 = vertices[i]
        for(var j = 0; j < vertices.length; j++) {
            var v2 = vertices[j]
            if(v1 != v2) {
                allPathsShortest[[v1,v2]] = Infinity
                allPathsShortest[[v2,v1]] = Infinity
            }
        }

        allPathsShortest[[v1,v1]] = 0
    }

    for(var i = 0; i < edges.length; i++)
        allPathsShortest[[edges[i].source,edges[i].target]] = 1

    for(var k = 0; k < vertices.length; k++) {
        for(var i = 0; i < vertices.length; i++) {
            for(var j = 0; j < vertices.length; j++) {
                if(dist(i,j) > dist(i,k) + dist(k,j))
                    allPathsShortest[[vertices[i],vertices[j]]] = dist(i,k) + dist(k,j)
            }
        }
    }

    return allPathsShortest
}