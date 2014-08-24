describe('Floyd-Warshall all pairs shortest path algorithm', function() {
    it('Calculate an all pairs shortest matrix', function() {
        testGraph('A', 'B', 'C', 'D', function(d) { return d })
    })

    it('Calculate an all pairs shortest matrix against a nested property', function() {
        testGraph({name: 'A'}, {name: 'B'}, {name: 'C'}, {name: 'D'}, function(d) { return d.name })
    })

    function testGraph(A, B, C, D, accessor) {
        var vertices = [A,B,C,D]
        var edges = [
            {source: A, target: B},
            {source: A, target: C},
            {source: B, target: C},
            {source: C, target: D}
        ]

        var distMatrix = floydWarshall(vertices, edges, accessor)

        expect(distMatrix.dist(A,B)).toBe(1)
        expect(distMatrix.dist(A,C)).toBe(1)
        expect(distMatrix.dist(A,D)).toBe(2)
        expect(distMatrix.dist(B,A)).toBe(Infinity)
    }
})
