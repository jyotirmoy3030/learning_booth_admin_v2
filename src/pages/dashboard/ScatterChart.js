import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ScatterChart extends Component {
  constructor(props) {
    super(props);
    CanvasJS.addColorSet("greenShades", [
      "#40986f",
      "#40986f",
      "#40986f",
      "#40986f",
      "#40986f",
    ]);
  }

  generateToolTipContent(data) {
    return `<div style='\"'background-color: white;padding:5px;box-sizing:border-box;'\"'><div style='\"'flex-direction: row;display: flex;gap: 4px;align-items:center;border-bottom:1px solid grey;padding-bottom:5px;margin-bottom:5px;'\"' ><div style='\"'border-radius: 5px;width:40px;height:40px;overflow:hidden;'\"'><img src='\"'${data?.tooltip?.image}'\"'  style='\"'object-fit:cover;width: 100%;height: 100%;border-radius:8px;overflow:hidden;'\"' ></div><div><span style='\"'font-size: 15px;color: black;font-weight: bold;'\"'>${data?.tooltip?.name}</span><br><span style='\"'margin-bottom: 0px;margin-top: 0px;color: grey;font-size: 12px;'\"'>Front End Dev</span></div></div><div style='\"'display: flex;'\"'><strong style='\"'font-size: 12px;color: gray;font-weight: bold;'\"'>Functional Alignment : </strong><strong style='\"'font-size: 12px;color: black;font-weight: bold;'\"'>${data?.tooltip?.roleAlignment}</strong></div><div style='\"'display: flex;'\"'><strong style='\"'font-size: 12px;color: gray;font-weight: bold;'\"'>Cultrul Fitment : </strong><strong style='\"'font-size: 12px;color: black;font-weight: bold;'\"'>${data?.tooltip?.culturalFitment}</strong></div><button style='\"'margin-top: 10px;background-color: black;color: white;font-size: 12px;height: 28px;width:100%;   display: flex;justify-content: center;align-items: center;border-radius: 8px;'\"'>View Profile</button></div ></div > `
  }

  render() {
    const { data, titleX, titleY, legendName } = this.props;
    const dataWithToolTips = data.map(point => ({
      ...point,
      toolTipContent: this.generateToolTipContent(point)
    }));

    const options = {
      animationEnabled: true,
      zoomEnabled: true,
      backgroundColor: "#1E2027",
      colorSet: "greenShades",
      height: 410,
      tickLength: 0,
      creditText: "", // Removes the CanvasJS watermark
      creditHref: "",
      axisX: {
        title: titleX || "Cultural Fitment",
        suffix: "",
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        },
        labelFontSize: 14,
        titleFontColor: "white",
        titleFontSize: 18,
        lineColor: "#8f9094",
        labelFontColor: "#8f9094",
        lineThickness: 2,
        tickLength: 0,
        maximum: 110
      },
      axisY: {
        title: titleY || "Functional Alignment",
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        },
        labelFontSize: 14,
        gridColor: "#8f9094",
        gridThickness: 0.5,
        titleFontColor: "white",
        titleFontSize: 18,
        lineColor: "#8f9094",
        labelFontColor: "#8f9094",
        lineThickness: 2,
        tickLength: 0,
        maximum: 110
      },
      legend: {
        horizontalAlign: "left",
        verticalAlign: "top",
        fontSize: 15,
        fontColor: "#8f9094",
      },
      data: [{
        type: "scatter",
        markerSize: 15,
        showInLegend: true,
        name: legendName || "Server 1",
        dataPoints: dataWithToolTips
      }]
    };

    return (
      <div className="px-4">
        <CanvasJSChart options={options} />
      </div>
    );
  }
}

export default ScatterChart;
