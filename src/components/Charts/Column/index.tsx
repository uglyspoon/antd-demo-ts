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
const DataSet = require("@antv/data-set");

export default class Column extends React.Component<any> {
  render() {
    const { data, fields } = this.props;
    // const data = [
    //   {
    //     label: "Monday",
    //     series1: 2800,
    //     series2: 2260
    //   },
    //   {
    //     label: "Tuesday",
    //     series1: 1800,
    //     series2: 1300
    //   },
    //   {
    //     label: "Wednesday",
    //     series1: 950,
    //     series2: 900
    //   },
    //   {
    //     label: "Thursday",
    //     series1: 500,
    //     series2: 390
    //   },
    //   {
    //     label: "Friday",
    //     series1: 170,
    //     series2: 100
    //   }
    // ];
    console.log('data', data)
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields,
      // 展开字段集
      key: "type",
      // key字段
      value: "value" // value字段
    });
    return (
      <div>
        <Chart height={400} data={dv} forceFit>
          <Legend />
          <Coord transpose scale={[1, -1]} />
          <Axis
            name="label"
            label={{
              offset: 12
            }}
          />
          <Axis name="value" position={"right"} />
          <Tooltip />
          <Geom
            type="interval"
            position="label*value"
            color={["type", ['#F5BA43', '#EF923F']]}
            adjust={[
              {
                type: "dodge",
                marginRatio: 1 / 32
              }
            ]}
          />
        </Chart>
      </div>
    );
  }
}
