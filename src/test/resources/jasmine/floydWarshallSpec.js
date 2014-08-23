describe('Floyd-Warshall all paths shortest distance algorithm', function() {
    it('Calculate an all paths shortest matrix', function() {
        var vertices = ['A', 'B', 'C', 'D']
        var edges = [
            {source: 'A', target: 'B'},
            {source: 'A', target: 'C'},
            {source: 'B', target: 'C'},
            {source: 'C', target: 'D'}
        ]

        var distMatrix = floydWarshall(vertices, edges)
        console.log(distMatrix)

        expect(distMatrix[['A','B']]).toBe(1);
        expect(distMatrix[['A','C']]).toBe(1);
        expect(distMatrix[['A','D']]).toBe(2);
        expect(distMatrix[['B','A']]).toBe(Infinity);
    })
})