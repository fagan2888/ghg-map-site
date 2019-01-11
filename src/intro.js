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
The diagram is structured in seven columns that are used to link <b>human
activities</b> (on the left) to ...`
    }, {
      element: findGroupElement('Emissions'),
      intro: `
... to <b>GHG emissions</b> (on the right). You can click on any marked node to
see mode details and learn more.

<p>To better understand how to read the diagram, let us guide you through a
short example that explores how commuting by car is linked to global emissions.

<p><b>Click "next" to continue with the example,</b>, or click "skip" to explore
yourself.`
    }, {
      intro: `
We have all heard that commuting by car is detrimental for climate change,
thanks to this diagram we can better understand and put into perspective its
effect.`
    }, {
      element: findNodeElement('FinalService^Mobility'),
      intro: `
First of all, commuting is part of the larger service that is “mobility” so see
specifically the emissions associated with commuting, we need to expand this
node.

<p><b>⟶ Click the "mobility" node to expand it</b>
`
    }, {
      element: findNodeElement('FinalService^Mobility'),
      intro: `
Here we can see that commuting accounts for xx% of the emissions associated with
mobility while most of the emissions are associated with the broader category of
personal travel. You can see that most of the emissions associated with
commuting flow into the transport sector category,
`
    }, {
      element: '#details',
      intro: `More details about the selected node are shown here.`
    }
  ]

  intro
    .setOptions({steps: intro1Steps})
    .onchange(onchange)
    .start()
}

let mobilityFirstTimeDone = false
let expandedMobility = false

function onchange (elem) {
  console.log('onchange', elem)
  const d = elem.__data__ || {}

  if (d.id === 'FinalService^Mobility') {
    if (!mobilityFirstTimeDone) {
      mobilityFirstTimeDone = true
    } else {
      if (d.ports.length === 1 && !expandedMobility) {
        console.log('trying to expand')
        const e = document.createEvent('UIEvents')
        e.initUIEvent('click', true, true, /* ... */)
        elem.dispatchEvent(e)
      }
      expandedMobility = true
    }
  }
}
