import { Component, OnInit } from '@angular/core';
import { AbstractParamTypeComponent } from '../abstract-param-type/abstract-param-type.component';
import * as d3 from 'd3';

@Component({
  selector: 'yucca-input-colors',
  templateUrl: './input-colors.component.html',
  styleUrls: ['./input-colors.component.sass']
})
export class InputColorsComponent extends AbstractParamTypeComponent implements OnInit {




  currentTab = "mainColor";

  mainChartColor: string;
  chartColors: Array<string> = new Array<string>();

  previewColors: Array<string> = [];
  tmpColor: string = "#000000"; // Temp variable

  constructor() { super(); }
  ngOnInit() {
    super.ngOnInit();
    if (this.p.value.demo) { // If we want to edit existing configuration (it means that already exists a this.p.demo with value)
      var demo = JSON.parse(this.p.value.demo);
      if (demo.mainChartColor) {
        this.currentTab = "mainColor";
        this.mainChartColor = demo.mainChartColor;
        this.createPreview();
        this.apply();
      } else if (demo.chartColors) {
        this.currentTab = "chartColors";
        this.chartColors = demo.chartColors;
        this.apply();
      }
    }
  }

  getValue() {
    var chartColor: any = {};
    if (this.currentTab == "mainColor") {
      chartColor = {
        mainChartColor: this.mainChartColor
      }
      this.createPreview();
    } else if (this.currentTab == "chartColors") {
      chartColor = {
        chartColors: this.chartColors
      }
    }

    this.value = JSON.stringify(chartColor);

    //super.apply();
  }

  pushColor(): void {
    this.chartColors.push(this.tmpColor);
    this.tmpColor = "#000000";
    this.previewColors = this.chartColors;
    this.apply();
  }

  removeColor(colorIndex: number): void {
    this.chartColors.splice(colorIndex, 1);
    this.previewColors = this.chartColors;
    this.apply();
  }

  createPreview() {
    if (this.mainChartColor) {
      const numOfColors = 10;
      let startColor = d3.rgb(this.mainChartColor).brighter(1.6).toString();
      let endColor = d3.rgb(this.mainChartColor).darker(1.6).toString();
      const scale = d3.scaleLinear<string>().range([startColor, endColor]).domain([0, numOfColors]);//.interpolate(d3.interpolateRgb.gamma(1.9));
      this.previewColors = d3.range(numOfColors).map(function (d) { return scale(d) });

    }

  }

}
