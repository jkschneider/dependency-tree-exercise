Dependency Tree Exercise
========================

### Assumption

There is only one root and it appears first in the file as the parent of a dependency relationship.

### Graphical rendering

Visit http://bl.ocks.org/jkschneider/c7660044fe74ab9ee53e.

This representation uses the Floyd-Warshall algorithm to color the graph according to the all paths shortest distance from the selected dependency.

### Console-based rendering

Executing `gradle run` will compile, run tests, and run `DependencyHierarchyWriter` against `graph.txt`.  The output is as follows:


    A                    
    |_ B                 
    |  |_ C              
    |  |  \_ E           
    |  |     |_ H        
    |  |     |  \_ L     
    |  |     |     \_ I  
    |  |     |        |_ O
    |  |     |        |  \_ P
    |  |     |        |     \_ Q
    |  |     |        |_ P
    |  |     |        |  \_ Q
    |  |     |        \_ K
    |  |     |           |_ N
    |  |     |           \_ L (cycle)
    |  |     \_ M        
    |  |        |_ N     
    |  |        \_ H     
    |  |           \_ L  
    |  |              \_ I
    |  |                 |_ O
    |  |                 |  \_ P
    |  |                 |     \_ Q
    |  |                 |_ P
    |  |                 |  \_ Q
    |  |                 \_ K
    |  |                    |_ N
    |  |                    \_ L (cycle)
    |  \_ D              
    |     |_ F           
    |     |  \_ H        
    |     |     \_ L     
    |     |        \_ I  
    |     |           |_ O
    |     |           |  \_ P
    |     |           |     \_ Q
    |     |           |_ P
    |     |           |  \_ Q
    |     |           \_ K
    |     |              |_ N
    |     |              \_ L (cycle)
    |     |_ G           
    |     \_ J           
    |        |_ I        
    |        |  |_ O     
    |        |  |  \_ P  
    |        |  |     \_ Q
    |        |  |_ P     
    |        |  |  \_ Q  
    |        |  \_ K     
    |        |     |_ N  
    |        |     \_ L  
    |        |        \_ I (cycle)
    |        \_ Q        
    |_ J                 
       |_ I              
       |  |_ O           
       |  |  \_ P        
       |  |     \_ Q     
       |  |_ P           
       |  |  \_ Q        
       |  \_ K           
       |     |_ N        
       |     \_ L        
       |        \_ I (cycle)
       \_ Q
       
