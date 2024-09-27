# Chart

## Documentation and issues
Nivo provide some great [examples](https://nivo.rocks/) but for some cases, the documentation has not been updated or is false. Usualy, the false informations are for the canvas version of the chart.

e.g. if you check at the [swarm plot doc](https://nivo.rocks/scatterplot/canvas/), annotation should be supported. They are not. That why a MarkerLayer has been created.

So, if you have doubt, go directly to the source

* [Nivo's storybook repo](https://github.com/plouc/nivo/tree/master/storybook)

* [Nivo's package source](https://github.com/plouc/nivo/tree/master/packages)


## Canvas vs SVG
Nivo has two rendering mode, svg and canvas. Svg allow some nices animations and an better control when adding a layer but it has a performance threshold. If you needs to display more than 1500 items, you should use the canvas instead. Canvas use an html canvas, allows way better performance and can easily display 15k elements without any issue. But canvas doesn't allow animation and every layer must controlled thought the canvas's context.

## Layers

Nivo's layer system allow us to add some boxplot, selectbox, custom marker and etc. All the layer must be svg element.

### Svg
To add a new layer on a svg chart, you just need to add an inline function with the proper method signature

```typescript
export interface SwarmPlotCustomLayerProps<RawDatum, Scale extends ScaleLinear<number> | ScaleTime<string | Date> | ScaleOrdinal<string, number> = ScaleLinear<number>> {
    nodes: ComputedDatum<RawDatum>[];
    xScale: Scale;
    yScale: Scale;
    innerWidth: number;
    innerHeight: number;
    outerWidth: number;
    outerHeight: number;
    margin: Margin;
}
```


In this exemple, we add a boxplot that will be display between the axes and circles layer

```typescript
      layers={[
        'grid',
        'axes',
        ({ nodes }) => (
          <SwarmPlotBoxPlotSvgLayer
            nodes={nodes}
            active={data.length > 0 && data.length === nodes.length}
            groups={groups}
            theme={{
              [groups[0]]: {
                rect: styles.medianBoxT21,
                median: styles.medianBoxT21,
                limit: styles.limitLineT21,
              },
              [groups[1]]: {
                rect: styles.medianBoxControl,
                median: styles.medianBoxControl,
                limit: styles.limitLineControl,
              },
            }}
          />
        ),
        'circles',
        'annotations',
        'mesh',
      ]}
```


In the layer code, we simply render some svg element.
```
        {/* Box */}
        <rect className={theme.rect} height={rect.height} opacity={0.7} width={rect.width} x={rect.x} y={rect.y} />

        {/* Median */}
        <line className={theme.median} opacity={0.7} x1={median.x1} x2={median.x2} y1={median.y1} y2={median.y2} />

        {/* Limit */}
        <line className={theme.limit} opacity={0.7} x1={limit.x} x2={limit.x} y1={limit.y1} y2={limit.y2} />
        <line
            className={theme.limit}
            x1={limit.x - OUTER_LINE_SIZE}
            x2={limit.x + OUTER_LINE_SIZE}
            y1={limit.y2}
            y2={limit.y2}
        />
        <line
            className={theme.limit}
            x1={limit.x - OUTER_LINE_SIZE}
            x2={limit.x + OUTER_LINE_SIZE}
            y1={limit.y1}
            y2={limit.y1}
        />
```

#### How to make it responsive?
The props `nodes` pass a Vector2D (x, y). You can update your svg with those date to ensure the responsiveness of the layers.   

You can also add xScale, yScale, innerWidth, innerHeight, outerWidth, outerHeight and margin to the layer signature function to access to value.

```
 ({ nodes, xScale, yScale, innerWidth, innerHeight, outerWidth, outerHeight, margin }) => (
          <MyCustomLayer 
          	nodes={nodes} 
          	xScale={xScale} 
          	yScale={yScale} 
          	innerWidth={innerWidth}
          	innerHeight={innerHeight}
          	outerWidth={outerWidth}
          	outerHeight={outerHeight}
          	margin={margin}
          />
        ),
```


### Canvas
Canvas's layer system is slightly different from svg. Two props are passed in the layer signature function

```typescript
export type ScatterPlotCustomCanvasLayer<RawDatum extends ScatterPlotDatum> = (ctx: CanvasRenderingContext2D, props: ScatterPlotLayerProps<RawDatum>) => void;
```

* `ctx` CanvasRenderingContext2D, the context of the rendered canvas
* `props` like svg, it contains nodes, xScale, yScale, innerWidth, innerHeight, outerWidth, outerHeight, margin


```typescript
      (ctx, props) => {
        MarkerCanvasLayer({
          props,
          ctx,
          selectedNodeId: selectedNodesId[0],
          text:
            (
              (props.nodes ?? []).find(
                (n) =>
                  (n as ScatterPlotNodeData<TTranscriptomicsDatum>).data.ensembl_gene_id ===
                  selectedNodesId[0],
              ) as ScatterPlotNodeData<TTranscriptomicsDatum>
            )?.data?.gene_symbol ?? '',
          highlightColor: '#1c3863',
          radius: 12,
          font: '600 14px Serif',
        });
      },
    ]}

```


Everything rendered inside the canvas needs to use `ctx`. 

```typescript

    const target = props.nodes.find((node) => node.id === selectedNodeId);
    if (!target) return;

    const direction = target.y < DIRECTION_THRESHOLD ? -1 : 1;
    const textPosition = { x: target.x + 30, y: target.y - 30 * direction };
    const underlineOffset = { x: 7, y: 7 };
    const underlineLength = 45;
    ctx.beginPath();
    ctx.fillStyle = highlightColor;
    ctx.arc(target.x, target.y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = highlightColor;
    ctx.lineWidth = 2;
    ctx.fill();

    ctx.beginPath();
    ctx.font = font;
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#fff';
    ctx.strokeText(text, textPosition.x, textPosition.y);
    ctx.stroke();
```

There is some unknown side effects from using `ctx` like the canvas can refresh itself without any warning making `SelectBoxLayer` harder to code since we loose the mouse listener when the canvas refresh.

When adding a custom layer inside a canvas, take in account that can't render anything from outside the canvas. You should take in account every element that can be rendered at the limit of the chart. 

e.g. For the markerlayer, I need to add a padding of 12px to the chart. If not, the marker will be cut when selecting an element at the top of the chart.

#### How to make it responsive?
Just like the svg, using (x,y) from `nodes` is the best solution to make the layer responsive.


## React-spring issue
Nivo's using react-spring for all his svg animation. You can use the same system to create layer, make their behavior coherent with nivo's native system.

But, if you needs to use react-spring, it's better to create the layer in the client side instead of ferlab-ui. There is a know issue with react-spring that make it unasable when adding inside a sub-module, event if react-spring is added as a peer-dependency.

The issue is related to webpack and could be fixed by ejecting the projet and update the webpack config BUT ejecting a project can be time consuming and produce some unwanted side effects.


## SwarmPlot unwanted behavior (don't use SwarmPlot)
The swarm plot chart can place item at unwanted places. e.g. an item with an y value of 0.00 can be placed under the 0 y axis. The same can happen with an item with a value of 0.12 to be under a value of 0.

It seems to related to how the swarm plot manager his strength and iteration. Here an answer of [Nivo's main maintener](https://github.com/plouc/nivo/issues/2654#issuecomment-2379626072)

```
The swarmplot uses some forces to position the points, the initial position of the points (before the forces are applied) is accurate, but then they're moved according to the force, there's no way to change this with the current implementation, what you can try though is to modify the force strength/iterations, but there's no guarantee.
If you want something completely accurate, you might want to use another chart type, a scatterplot for example.
I'm closing this as it's not really a bug, just a limitation of this chart type.
```

So don't use an SwarmPlot when you needs accurate data. It can be usefull for a quick overview or with data that have a greater discrepancy. You should prioritise a SwarmPlot instead.

### Oh no! I used an SwarmPlot by I need a ScatterPlot instead. How to migrate it ?1

First of all don't panic, both chart are pretty similar. The main difference is taht a ScatterPlot need valid Vector2D to work (x and y)while the swarm plot only use one value. 

The first step to migrate would be to change the api. It should regroup the data with the `{id: 'group', data:[...]}` structure. It should also add X axis to the data. If it can't, we can manage those data in
the front end, but the result on the X axis will change.

Here an example where the API cannot be update. Example is taken from sampleGeneExp api

```typescript
{
    "data": [
        {
            "sample_id": "bs-jst2ps9n",
            "x": 1, // t21 group
            "y": 0.49654263520237263
        },
        {
            "sample_id": "bs-ejvr34hd",
            "x": 0,
            "y": 1.0559434634989615
        },
        ...
}
```


It will need to be changed for (see diffGeneExp)

```typescript
[
  {
    id: 't21',
    data: [{
      "sample_id": "bs-jst2ps9n",
      x: 1.2,
      "y": 0.49654263520237263
    }]
  },
  {
    id: 'control',
    data: [{
      "sample_id": "bs-ejvr34hd",
      "x": 1.8,
      "y": 1.0559434634989615
    }]
  }
]
```

### Does Swarm's Layer works with Scatter plot ?
It should works since layers are pretty agnostic about their owner. The only change should be about how the data is readed by the layer. A middleware could be create to change the data and add a generic svg component (SelectBox, BoxPlot etc.).


### Any warning?
At the time, we needs to investigate about how to make the scatter plot categorical. This doc should be updated when done. 

Possible solution: Since legend are just common svg data, you could compute the median on the X axis of all group and create the legend based on this data.