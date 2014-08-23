Dependency Tree Exercise
========================

Executing `gradle run` will compile, run tests, and run `DependencyHierarchyWriter` against `graph.txt`.

### Assumption

There is only one root and it appears first in the file as the parent of a dependency relationship.

### Output

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
