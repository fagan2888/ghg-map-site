import { select } from 'd3'

import introJs from 'intro.js/intro.js'
import 'intro.js/introjs.css'

function findNodeElement (id) {
  return select('svg')
    .selectAll('.node')
    .filter(d => d.id === id)
    .node()
}

function findGroupElement (title) {
  return select('svg')
    .selectAll('.group')
    .filter(d => d.title === title)
    .node()
}

const intro = introJs()

export function setupIntro () {
  const intro1Steps = [
    {
      element: null,
      intro: `
Welcome to the Green House Gas Map. Here you will be able to understand the
links that exist between global GHG emissions and human activities.`
    }, {
      element: '#sankey',
      intro: `
The map is structured as a Sankey diagram where the thickness of lines
represents the amount of emissions that can be attributed to a given activity. `
    }, {
      element: findGroupElement('Service'),
      intro: `
The diagram is structured in seven columns that are used to link human activities (on the left)
to ...`
    }, {
      element: findGroupElement('Emissions'),
      intro: `
... to GHG emissions (on the right). You can click on any marked node to see
mode details and learn more.

To better understand how to read the diagram, let
us guide you through a short example that explores how commuting by car is
linked to global emissions.

***At this point have buttons to either (a) let me explore, or (b) show me an
***example.
`
    }, {
      element: findNodeElement('Sector^Transport'),
      intro: 'Hello! This is the Sankey diagram.'
    }
  ]

  intro.setOptions({steps: intro1Steps})
  intro.start()
}

