import { select } from 'd3'

import Shepherd from 'shepherd.js'
import 'shepherd.js/dist/css/shepherd-theme-default.css'

export function setupIntro () {
  const tour = new Shepherd.Tour({
    defaultStepOptions: {
      classes: 'shadow-md bg-purple-dark',
      scrollTo: true,
      showCancelLink: true
    },
    useModalOverlay: true
  })

  const cancelNextButtons = [
    {
      action: tour.cancel,
      classes: 'shepherd-button-secondary',
      text: 'Exit'
    }, {
      action: tour.next,
      text: 'Next'
    }
  ]

  function backNextButtons (nextAction) {
    return [
      {
        action: tour.back,
        classes: 'shepherd-button-secondary',
        text: 'Back'
      }, {
        action: nextAction || tour.next,
        text: 'Next'
      }
    ]
  }

  tour.addStep({
    attachTo: null,
    title: 'Welcome!',
    buttons: cancelNextButtons,
    text: `
Welcome to the Green House Gas (GHG) Map!

<p>This map shows the links between global GHG emissions and the human
activities that drive them. It is a “Sankey diagram”: the thickness of the lines
represents the amount of emissions that can be attributed to a given activity.

<p>We'll quickly show you how the diagram works, then you can either continue
with a guided tour of some stories, or explore on your own.
`
  })

  tour.addStep({
    attachTo: '[data-group-title="Service"] right',
    buttons: backNextButtons(),
    text: `
The diagram is structured in seven columns that are used to link <b>human
activities</b> (on the left) to ...`
  })

  tour.addStep({
    attachTo: '[data-group-title="Emissions"] left',
    buttons: backNextButtons(),
    text: `
... to <b>GHG emissions</b> (on the right).`
  })

  let mobilityFirstTimeDone = false
  let expandedMobility = false
  tour.addStep({
    title: 'Seeing more details',
    attachTo: '[data-node-id="FinalService^Mobility"] bottom',
    buttons: backNextButtons(function () {
      ensureNodeIsExpanded(document.querySelector('[data-node-id="FinalService^Mobility"] .node-click-target'))
      tour.next()
    }),
    advanceOn: { selector: '[data-node-id="FinalService^Mobility"] .node-click-target', event: 'click' },
    text: `
You can click on any marked node to see mode details and learn more.

<p><b>Click the "Mobility" node to expand it...</b>`
  })

  tour.addStep({
    title: 'Seeing more details',
    attachTo: '[data-node-id="FinalService^Mobility"] bottom',
    buttons: backNextButtons(),
    text: `
When you click the node, more detailed categories are shown, along with the
links to adjacent nodes. (You can click again to collapse the node again).`
  })

  tour.addStep({
    title: 'Seeing more details',
    attachTo: '#details left',
    buttons: backNextButtons(),
    text: `
More details are shown here when a node is selected.`
  })

  tour.addStep({
    title: "That's the basics!",
    attachTo: null,
    buttons: [
      {
        action: tour.cancel,
        classes: 'shepherd-button-secondary',
        text: 'Exit & explore'
      }, {
        action: tour.next,
        text: 'Continue the tour'
      }
    ],
    text: `
That's the basics of how to use the diagram, but there's a lot more we could
show you. Would you like to continue with the tour exploring the emissions
associated with commuting by car?`
  })

  tour.addStep({
    attachTo: '#group-mobility-to-transport right',
    buttons: backNextButtons(function () {
      setTimeout(function () {
        ensureNodeIsExpanded(document.querySelector('[data-node-id="FinalService^Mobility"] .node-click-target'))
      }, 0)
      tour.next()
    }),
    advanceOn: { selector: '[data-node-id="FinalService^Mobility"] .node-click-target', event: 'click' },
    text: `
We have all heard that commuting by car is detrimental for climate change,
thanks to this diagram we can better understand and put into perspective its
effect.

<p>First of all, commuting is part of the larger service that is “mobility” so
to see specifically the emissions associated with commuting, we need to expand
this node.

<p><b>⟶ Click the "mobility" node to expand it</b> `
  })

  tour.addStep({
    id: 'commuting-links',
    attachTo: '#group-mobility-to-transport right',
    buttons: backNextButtons(function () {
      setTimeout(function () {
        ensureNodeIsExpanded(document.querySelector('[data-node-id="Sector^Transport"] .node-click-target'))
      }, 0)
      tour.next()
    }),
    advanceOn: { selector: '[data-node-id="Sector^Transport"] .node-click-target', event: 'click' },
    text: `
Here we can see that commuting accounts for 27% of the emissions associated with
mobility while most of the emissions are associated with the broader category of
personal travel.

<p>You can see that most of the emissions associated with commuting flow into
the transport sector category, but a few are associated with industry — these
are the emissions that are emitted in the factories where transport equipment
(cars, trains and buses) is manufactured.

<p><b>⟶ Click the "Transport" node to expand it</b>
`
  })

  tour.addStep({
    attachTo: '#group-transport right',
    buttons: backNextButtons(),
    // buttons: backNextButtons(function () {
    //   setTimeout(function () {
    //     ensureNodeIsExpanded(document.querySelector('[data-node-id="Sector^Transport"] .node-click-target'))
    //   }, 0)
    //   tour.next()
    // }),
    // advanceOn: { selector: '[data-node-id="Sector^Transport"] .node-click-target', event: 'click' },
    text: `
We see that emissions associated with the transport sector are mostly equally
distributed between passenger transport and freight. We actually emit two and a
half times more by moving merchandise around the world on ships and trucks
compared to how much we emit by commuting to work!

<p>It’s not a surprise to see that the emissions for passenger transport are
mostly emitted from cars, as we can see in the equipment column, but about 10%
also comes from aeroplanes (see if you can find this within the "other"
category). `
  })

  tour.addStep({
    id: 'motor-finalenergy',
    attachTo: '#group-equipment-to-device bottom',
    buttons: backNextButtons(),
    // buttons: backNextButtons(function () {
    //   setTimeout(function () {
    //     ensureNodeIsExpanded(document.querySelector('[data-node-id="Sector^Transport"] .node-click-target'))
    //   }, 0)
    //   tour.next()
    // }),
    when: {
      show: function () {
        setTimeout(function () {
          ensureNodeIsExpanded(document.querySelector('[data-node-id="Device^Engines & motors"] .node-click-target'))
        }, 1000)
      }
    },
    // advanceOn: { selector: '[data-node-id="Sector^Transport"] .node-click-target', event: 'click' },

    text: `
All of the emissions from cars, planes, trucks and ship all flow into the
category of Engine and Motors in the Conversion Device column.

<p>By expanding that node we can see the split of technologies used to move
things around. It’s interesting to see that Petrol Engines are responsible for
roughly the same emissions as electric motors, the main difference being that
Petrol Engines emit CO2 directly, while Electric motors are responsible for
emissions in power plants.

`
  })

  tour.addStep({
    attachTo: null,
    buttons: [
      {
        action: tour.next,
        text: 'Done'
      }
    ],
    text: `

That's the end of the tour! This was just one example of the large amount of information found in this map. We hope you enjoy exploring it further.

<p>For more information about the data shown here see <a href="">the report</a>.
`
  })

  tour.on('complete', function () {
    // It doesn't seem to clear it the way it should
    document.body.dataset.shepherdStep = null
  })

  tour.start()
  return tour
}

function ensureNodeIsExpanded (elem) {
  // console.log('ensuring is expanded', elem)
  const d = elem.__data__ || {}
  if (!d.expanded) {
    // console.log('...trying to expand')
    const e = document.createEvent('UIEvents')
    e.initUIEvent('click', true, true, /* ... */)
    elem.dispatchEvent(e)
  } else {
    // console.log('...already expanded')
    // already expanded
  }
}
