# Chart

## Documentation and issues
Nivo provide some great [examples](https://nivo.rocks/) but for some case, the documentation has not been updated or is false. Usualy, the false informations are for the canvas version of the chart.

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

There is some unknow side effects from using `ctx` like the canvas can refresh itself without any warning making `SelectBoxLayer` harder to code since we loose the mouse listener when the canvas refresh.

When adding a custom layer inside a canvas, take in account that can't render anything from outside the canvas. You should take in account every element that can be rendered at the limit of the chart. 

e.g. For the markerlayer, I need to add a padding of 12px to the chart. If not, the marker will be cut when selecting an element at the top of the chart.

#### How to make it responsive?
Just like the svg, using (x,y) from `nodes` is the best solution to make the layer responsive.


## React-spring issue
Nivo's using react-spring for all his svg animation. You can use the same system to create layer, make their behavior coherent with nivo's native system.

But, if you needs to use react-spring, it's better to create the layer in the client side instead of ferlab-ui. There is a know issue with react-spring that make it unasable when adding inside a sub-module, event if react-spring is added as a peer-dependency.

The issue is related to webpack and could be fixed by ejecting the projet and update the webpack config BUT ejecting a project can be time consuming and produce some unwanted side effects.


## SwarmPlot unwanted behavior
The swarm plot chart can place item at unwanted place. e.g. an item with an y value of 0.00 can be placed under the 0 y axis. If an explanation is found for this issue, you should document it right here.

That why we use nivo's y value for the box plot layer and not data.y value. It ensure the node are not in the same line.