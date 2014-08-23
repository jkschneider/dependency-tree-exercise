

import DependencyHierarchyWriter
import spock.lang.Specification

class DependencyHierarchySpec extends Specification {
    def writer = new DependencyHierarchyWriter()

    void "Print a simple dependency hierarchy"() { expect:
        writer.printHierarchy('A->B','A->C','B->C','B->D').split('\n') == [
            /A/,
            /|_ B/,
            /|  |_ C/,
            /|  \_ D/,
            /|_ C/
        ]
    }

    void "Don't display leading indentations for last subtrees"() { expect:
        writer.printHierarchy('A->B','B->C','B->D','C->E','D->G','E->F').split('\n') == [
                /A/,
                /|_ B/,
                /   |_ C/,
                /   |  \_ E/,
                /   |     \_ F/,
                /   \_ D/,
                /      \_ G/
        ]
    }

    void "Cope with dependency cycles"() { expect:
        writer.printHierarchy('A->B','B->A').split('\n') == [
            /A/,
            /|_ B/,
            /   \_ A (cycle)/
        ]
    }

    void "An empty list of dependencies results in an empty result"() { expect:
        writer.printHierarchy() == ''
    }
}
