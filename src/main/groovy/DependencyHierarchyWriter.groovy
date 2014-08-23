import com.google.common.collect.LinkedListMultimap
import com.google.common.collect.Multimap

class DependencyHierarchyWriter {
    String printHierarchy(Multimap<String, String> dependencies) {
        if(dependencies.isEmpty()) return ''
        printHierarchyRecurse('', dependencies.keySet().iterator().next(), dependencies, [:])
                .trim() // trim off the trailing \n
    }

    private String printHierarchyRecurse(String out, String dep, Multimap<String, String> dependencies,
                                            Map<String, Boolean> path) {
        def markers = []
        path.values().eachWithIndex { hasAnotherChild, i ->
            // check i == 0 here because of the different treatment of the last child of the root
            def lineMarker = (i < path.size()-1 || hasAnotherChild || i == 0) ? '|' : '\\'
            markers += hasAnotherChild || i == path.size()-1 ? lineMarker : ' '
        }

        out += markers.join('  ')
        if(!path.isEmpty()) out += '_ '
        out += dep

        if(path.containsKey(dep))
            return out + ' (cycle)\n'

        out += '\n'

        def children = dependencies.get(dep)
        children.eachWithIndex{ child, i ->
            out = printHierarchyRecurse(out, child, dependencies, path + [(dep): i < children.size()-1])
        }

        return out
    }

    String printHierarchy(String... depStrings) {
        printHierarchy(depStrings.inject(LinkedListMultimap.create()) { allDeps, line ->
            def dep = line.split('->') // split into [parent, child]
            if(dep.size() == 2)
                allDeps.put(dep[0], dep[1])
            return allDeps
        })
    }

    String printHierarchy(File file) {
        printHierarchy(file.text.split('\n'))
    }
}
