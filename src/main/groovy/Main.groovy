class Main {
    static void main(String[] args) {
        println new DependencyHierarchyWriter().printHierarchy(new File('graph.txt'))
    }
}
