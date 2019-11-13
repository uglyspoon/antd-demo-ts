import React from "react";
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
  Util
} from "bizcharts";

let chartIns: any = null;

export default class Doubleaxes extends React.Component<any> {
  render() {
    const { data, height } = this.props
    const scale = {
      '班级平均值': {
        type: "linear",
        range: [0, 1],
        min: 0,
      },
      '我的成绩': {
        type: "linear",
        range: [0, 1],
        min: 0,
      }
    };

    const YLabelConfig = {
      offset: 40, //与轴线的距离
      textStyle: {
        fill: '#979797', // 文本的颜色
        fontSize: '12', // 文本大小
        fontWeight: 'bold', // 文本粗细
      }
    }
    // const itemTpl = '<li data-index={index}>' + '{name}: {value}' + '</li>'
    return (
      <div>
        <Chart
          height={height}
          scale={scale}
          padding={'auto'}
          forceFit
          data={data}
          onGetG2Instance={chart => {
            chartIns = chart;
          }}
        >
          <Legend
            custom={true}
            allowAllCanceled={true}
            items={[
              {
                value: "我的成绩",
                marker: {
                  symbol: "square",
                  fill: "#3182bd",
                  radius: 5
                }
              },
              {
                value: "班级平均值",
                marker: {
                  symbol: "hyphen",
                  stroke: "#ffae6b",
                  radius: 5,
                  lineWidth: 3
                }
              }
            ]}
            onClick={(ev: any) => {
              const item = ev.item;
              const value = item.value;
              const checked = ev.checked;
              const geoms = chartIns.getAllGeoms();

              for (let i = 0; i < geoms.length; i++) {
                const geom = geoms[i];

                if (geom.getYScale().field === value) {
                  if (checked) {
                    geom.show();
                  } else {
                    geom.hide();
                  }
                }
              }
            }}
          />
          <Axis
            position="left"
            label={YLabelConfig}
            name="我的成绩"
            grid={null}

          />
          <Axis name="班级平均值" visible={false} />
          <Tooltip />
          <Geom type="interval" position="time*我的成绩" color="#3182bd" />
          <Geom
            type="line"
            position="time*班级平均值"
            color="#fdae6b"
            size={3}
            shape="smooth"
          />
          <Geom
            type="point"
            position="time*班级平均值"
            color="#fdae6b"
            size={3}
            shape="circle"
          />
        </Chart>
      </div>
    );
  }
}

