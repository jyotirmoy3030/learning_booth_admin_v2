import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class ScatterChart extends Component {
    constructor() {
        super();
        CanvasJS.addColorSet("greenShades",
            [
                "#40986f",
                "#40986f",
                "#40986f",
                "#40986f",
                "#40986f",
            ]);
    }
    render() {
        const options = {
            // theme: "dark2",
            animationEnabled: true,
            zoomEnabled: true,
            backgroundColor: "#1E2027",
            colorSet: "greenShades",
            height: 410,
            tickLength: 0,
            axisX: {
                title: "Cultural Fitment",
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
            },
            axisY: {
                title: "Role ALignment",
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
            },
            legend: {
                horizontalAlign: "left", // "center" , "right"
                verticalAlign: "top",  // "top" , "bottom"
                fontSize: 15,
                fontColor: "#8f9094",
            },
            data: [{
                type: "scatter",
                markerSize: 15,
                showInLegend: true,
                name: "Server 1",
                toolTipContent: "<div style='\"'background-color: white;padding:5px;box-sizing:border-box;'\"'><div style='\"'flex-direction: row;display: flex;gap: 4px;align-items:center;border-bottom:1px solid grey;padding-bottom:5px;margin-bottom:5px;'\"' ><div style='\"'border-radius: 5px;width:40px;height:40px;overflow:hidden;'\"'><img src='\"'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1720161068~exp=1720164668~hmac=fad320a8bedbb3ba7941a8ae5dddfffd47ead0fb38bf54dafd46a01b2d80585b&w=900'\"'  style='\"'object-fit:cover;width: 100%;height: 100%;border-radius:8px;overflow:hidden;'\"' ></div><div><span style='\"'font-size: 15px;color: black;font-weight: bold;'\"'>Mukesh Kumar</span><br><span style='\"'margin-bottom: 0px;margin-top: 0px;color: grey;font-size: 12px;'\"'>Front End Dev</span></div></div><div style='\"'display: flex;'\"'><strong style='\"'font-size: 12px;color: gray;font-weight: bold;'\"'>Role Alignment : </strong><strong style='\"'font-size: 12px;color: black;font-weight: bold;'\"'>20</strong></div><div style='\"'display: flex;'\"'><strong style='\"'font-size: 12px;color: gray;font-weight: bold;'\"'>Cultrul Fitment : </strong><strong style='\"'font-size: 12px;color: black;font-weight: bold;'\"'>20</strong></div><button style='\"'margin-top: 10px;background-color: black;color: white;font-size: 12px;height: 28px;width:100%;   display: flex;justify-content: center;align-items: center;border-radius: 8px;'\"'>View Profile</button></div ></div > ",

                dataPoints: [
                    { x: 14.2, y: 215 },
                    { x: 12.9, y: 175 },
                    { x: 16.4, y: 325 },
                    { x: 26.9, y: 635 },
                    { x: 32.5, y: 464 },
                    { x: 22.1, y: 522 },
                    { x: 19.4, y: 412 },
                    { x: 25.1, y: 614 },
                    { x: 34.9, y: 374 },
                    { x: 28.7, y: 625 },
                    { x: 23.4, y: 544 },
                    { x: 31.4, y: 502 },
                    { x: 40.8, y: 262 },
                    { x: 37.4, y: 312 },
                    { x: 42.3, y: 202 },
                    { x: 39.1, y: 302 },
                    { x: 17.2, y: 408 }
                ]
            }]
        }
        return (
            <div className='px-4'>
                <CanvasJSChart options={options} />
            </div>
        );
    }
}
export default ScatterChart;    