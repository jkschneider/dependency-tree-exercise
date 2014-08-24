function floydWarshall(vertices, edges, accessor) {
    accessor = typeof accessor !== 'undefined' ? accessor : function(d) { return d }

    var dm = new function() { // the all pairs shortest path distance matrix
        var self = this
        this.matrix = []
        this.max = 0

        this.dist = function(v1, v2) {
            return self.matrix[[accessor(v1),accessor(v2)]]
        }

        this.set = function(v1, v2, val) {
            if(val > self.max && val != Infinity)
                self.max = val
            self.matrix[[accessor(v1), accessor(v2)]] = val
        }
    }()

    var dist = function(i,j) { return dm.dist(vertices[i], vertices[j]) }

    for(var i = 0; i < vertices.length; i++) {
        var v1 = vertices[i]
        for(var j = 0; j < vertices.length; j++) {
            var v2 = vertices[j]
            if(v1 != v2) {
                dm.set(v1, v2, Infinity)
                dm.set(v2, v1, Infinity)
            }
        }
        dm.set(v1, v1, 0)
    }

    for(var i = 0; i < edges.length; i++)
        dm.set(edges[i].source, edges[i].target, 1)

    for(var k = 0; k < vertices.length; k++) {
        for(var i = 0; i < vertices.length; i++) {
            for(var j = 0; j < vertices.length; j++) {
                if(dist(i,j) > dist(i,k) + dist(k,j))
                    dm.set(vertices[i], vertices[j], dist(i,k) + dist(k,j))
            }
        }
    }

    return dm
}