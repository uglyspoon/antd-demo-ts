import React from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';
import AutoHeight from '../AutoHeight';
const DataSet = require('@antv/data-set');

interface IProps {
  data?: any[];
  title?: string;
  titleUnit?: string;
  fontSize?: string;
  titleFontSize?: string;
  titleUnitFontSize?: '1em';
  height?: number;
  width?: number;
  padding?: any;
  showLabel?: boolean;
  showLegend?: boolean;
  showText?: boolean;

}
class Donut extends React.Component<IProps> {
  render() {
    const { DataView } = DataSet;
    const { Html } = Guide;
    const {
      data = [],
      title = '测试次数',
      titleFontSize = '1em',
      titleUnit = '次',
      fontSize = '0.9em',
      titleUnitFontSize = '1em',
    } = this.props;
    const totalNum = data.length ? data.map(el => el.count).reduce((a, b) => a + b) : 0;
    const { height = 300, width = 300, padding = [0, 0, 0, 0], showLabel = true, showLegend = false, showText = false } = this.props;

    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const cols = {
      percent: {
        formatter: (val: number) => {
          const newVal = (val * 100).toFixed(1) + '%';
          return newVal;
        },
      },
    };
    return (
      <div>
        <Chart height={height} width={width} data={dv} scale={cols} padding={padding as any} forceFit>
          <Coord type={'theta'} radius={0.9} innerRadius={0.8} />
          <Axis name="percent" />
          {showLegend ? <Legend
            position="right-center"
            // offsetY={-window.innerHeight / 2 + 120}
            // offsetX={0}
            itemMarginBottom={15}
            marker="square"
            itemFormatter={val => {
              const found = data.find(function (element) {
                return element.item == val;
              });

              if (found) {
                return (
                  val +
                  '  ' +
                  ((found.count / totalNum) * 100).toFixed(1) +
                  '%  ' +
                  found.count +
                  titleUnit
                );
              } else {
                return val;
              }
            }}
          // useHtml={true}
          /> : null}
          <Tooltip
            showTitle={false}
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />
          {/* 中间的文字 */}
          {
            showText ?
              <Guide>
                <Html
                  position={['50%', '50%']}
                  html={
                    "<div style='color:#8c8c8c;font-size:" + titleFontSize + ";text-align: center;width: 10em;white-space: nowrap;'>" +
                    title +
                    "<br><span style='color:#262626;font-size:" +
                    fontSize +
                    "'>" +
                    (totalNum ? Math.ceil(totalNum) : 0) +
                    '</span>' +
                    "<span style='font-size:" +
                    titleUnitFontSize +
                    "'>" +
                    titleUnit +
                    '</span></div>'
                  }
                  alignX="middle"
                  alignY="middle"
                />
              </Guide> : null
          }
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              'item*percent',
              (item, percent) => {
                percent = percent * 100 + '%';
                return {
                  name: item,
                  value: percent,
                };
              },
            ]}
            style={{
              lineWidth: 1,
              stroke: '#fff',
            }}
          >
            {/* 图表上的指示文字*/}
            {showLabel ? (
              <Label
                content="percent"
                formatter={(val, item) => {
                  // console.log(123)
                  return item.point.item + ':' + val;
                }}
              />
            ) : null}
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default AutoHeight()(Donut);
