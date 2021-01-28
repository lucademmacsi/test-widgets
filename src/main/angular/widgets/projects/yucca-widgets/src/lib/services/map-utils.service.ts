import { Injectable } from '@angular/core';

import * as d3Geo from 'd3-geo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapUtilsService {

  constructor(private httpClient: HttpClient) { }

  public loadGeojson(url) {
    return this.httpClient.get<any>(url);
  };


  public initGeojson(g: any) {
    if (!g.url)
      g.url = "lib/yucca-angular-widgets/dist/data/piemonte_province_geojson.json";
    if (!g.key)
      g.key = "code";
    if (!g.render)
      g.render = {};
    if (!g.render.line)
      g.render.line = {}
    if (!g.render.line.weight)
      g.render.line.weight = 1;
    if (!g.render.line.opacity)
      g.render.line.opacity = 1;
    if (!g.render.line.dashcolor)
      g.render.line.dashcolor = '#0e232e';
    if (!g.render.line.dasharray)
      g.render.line.dasharray = 1;
    if (!g.render.areas)
      g.render.areas = {}
    if (!g.render.areas.fillopacity)
      g.render.areas.fillopacity = .7;
    return g;
  }

  public fitGeojson(geojson: any, width: number, height: number, geoprojection: string) {
    const c = d3Geo.geoCentroid(geojson);
    const projection = this.getProjection(1, c, [0, 0], geoprojection);
    // Create a path generator.
    let path = d3Geo.geoPath().projection(projection);
    // Compute the bounds of a feature of interest, then derive scale & translate.
    //  x-min=bounds[0][0] x-max=bounds[1][0]       
    //	y-min=bounds[0][1] y-max=bounds[1][1]    
    const b = path.bounds(geojson);
    if (!height || height < 1) {
      height = ((b[1][1] - b[0][1]) * width / (b[1][0] - b[0][0]));
    }
    const s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
      t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
    console.debug("MapUtilsService fitGeojson - bounds", b);

    // Update the projection to use computed scale & translate.
    console.debug("MapUtilsService fitGeojson - offset s c t ", s, c, t);
    return {
      path: d3Geo.geoPath().projection(this.getProjection(s, c, t, geoprojection)),
      projectionScale: s,
      projectionCenter: c,
      projectionTranslate: t,
      height: height
    };

  };

  public pointProjection(coordinates, s, c, t, geoprojection) {
    const projection = this.getProjection(s, c, t, geoprojection);
    return projection(coordinates);
  };


  public getProjection(scale, center, offset, geoprojection) {
    if (!geoprojection)
      return d3Geo.geoMercator().scale(scale).center(center).translate(offset);
    else if (geoprojection == 'azimuthalEqualArea')
      return d3Geo.geoAzimuthalEqualArea().scale(scale).center(center).translate(offset);
    else if (geoprojection == 'azimuthalEquidistant')
      return d3Geo.geoAzimuthalEquidistant().scale(scale).center(center).translate(offset);
    else if (geoprojection == 'conicConformal')
      return d3Geo.geoConicConformal().scale(scale).center(center).translate(offset);
    else if (geoprojection == 'conicEqualArea')
      return d3Geo.geoConicEqualArea().scale(scale).center(center).translate(offset);
    else if (geoprojection == 'conicEquidistant')
      return d3Geo.geoConicEquidistant().scale(scale).center(center).translate(offset);
    else if (geoprojection == 'equirectangular')
      return d3Geo.geoEquirectangular().scale(scale).center(center).translate(offset);
    else if (geoprojection == 'gnomonic')
      return d3Geo.geoGnomonic().scale(scale).center(center).translate(offset);
    else if (geoprojection == 'orthographic')
      return d3Geo.geoOrthographic().scale(scale).center(center).translate(offset);
    else if (geoprojection == 'stereographic')
      return d3Geo.geoStereographic().scale(scale).center(center).translate(offset);
    else
      return d3Geo.geoMercator().scale(scale).center(center).translate(offset);

  };

}
