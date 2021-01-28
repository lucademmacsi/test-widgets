import { Injectable } from '@angular/core';

import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class RenderService {

  constructor() { }

  public safeColors(mainColor: string, inputColors: string[], numOfColors: number) {
    let colors = new Array();
    if (inputColors && inputColors != null && inputColors.length > 0) {
      let sIndex = 0;
      for (let k = 0; k < numOfColors; k++) {
        colors.push(inputColors[sIndex]);
        sIndex++;
        if (sIndex == inputColors.length)
          sIndex = 0;
      }
    }
    else if (mainColor) {
      let startColor = d3.rgb(mainColor).brighter(1.6).toString();
      let endColor = d3.rgb(mainColor).darker(1.6).toString();
      //var startColor = this.colorLuminance(mainColor, -0.6);
      //var endColor = this.colorLuminance(mainColor, 0.6);
      const scale = d3.scaleLinear<string>().range([startColor, endColor]).domain([0, numOfColors]);//.interpolate(d3.interpolateRgb.gamma(1.9));
      colors = d3.range(numOfColors).map(function (d) { return scale(d) });

    }
    return colors;
  }

  public guessForegroundColorHex(color: string) {
    const rgb = parseInt(color.replace('#', ''), 16);   // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff;  // extract red
    const g = (rgb >> 8) & 0xff;  // extract green
    const b = (rgb >> 0) & 0xff;  // extract blue
    return this.guessForegroundColorRgb(r, g, b);
  }

  public guessForegroundColorRgb(r: number, g: number, b: number) {
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    return luma > 164 ? "#000" : "#fff";
  }

  public getColorRange(color: string) {
    var mainRangeColor = d3.scaleLinear<string, number>().domain([1, 10]).range(["white", color, "black"]);
    return [mainRangeColor(3), mainRangeColor(7)];
  }

  public ColorLuminance(hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ("00" + c).substr(c.length);
    }

    return rgb;
  }
}