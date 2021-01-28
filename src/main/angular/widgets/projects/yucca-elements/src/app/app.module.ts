import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  YuccaWidgetsModule, SankeyDiagramComponent, MultiChartComponent, YuccaWidgetsComponent, DiscretebarChartComponent,
  TreemapChartComponent, PieChartComponent, DiscreteTableComponent, ControlSelectComponent, LineChartComponent, ChoroplethMapComponent,
  HorizontalMultiBarChartComponent
} from './../../../yucca-widgets/src/public-api';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import 'c3';
import 'd3';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    YuccaWidgetsModule,
    HttpClientModule
  ],
  //providers: [DataService, MetadataService],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(private injector: Injector) {

    const yuccaWidgetsComponent = createCustomElement(YuccaWidgetsComponent, { injector: this.injector })
    const pieChartComponent = createCustomElement(PieChartComponent, { injector: this.injector })
    const discretebarChartComponent = createCustomElement(DiscretebarChartComponent, { injector: this.injector })
    const multiChartComponent = createCustomElement(MultiChartComponent, { injector: this.injector })
    const lineChartComponent = createCustomElement(LineChartComponent, { injector: this.injector })
    const treemapChartComponent = createCustomElement(TreemapChartComponent, { injector: this.injector })
    const sankeyDiagramComponent = createCustomElement(SankeyDiagramComponent, { injector: this.injector })
    const discreteTableComponent = createCustomElement(DiscreteTableComponent, { injector: this.injector })
    const choroplethMapComponent = createCustomElement(ChoroplethMapComponent, { injector: this.injector });
    const controlSelectComponent = createCustomElement(ControlSelectComponent, { injector: this.injector })
    const horizontalMultiBarChartComponent = createCustomElement(HorizontalMultiBarChartComponent, { injector: this.injector })

    if (!customElements.get('yucca-discretebar-chart')) { customElements.define("yucca-discretebar-chart", discretebarChartComponent); }
    if (!customElements.get('yucca-multi-chart')) { customElements.define("yucca-multi-chart", multiChartComponent); }
    if (!customElements.get('yucca-line-chart')) { customElements.define("yucca-line-chart", lineChartComponent); }
    if (!customElements.get('yucca-treemap-chart')) { customElements.define("yucca-treemap-chart", treemapChartComponent); }
    if (!customElements.get('yucca-choropleth-map')) { customElements.define("yucca-choropleth-map", choroplethMapComponent); }
    if (!customElements.get('yucca-pie-chart')) { customElements.define("yucca-pie-chart", pieChartComponent); }
    if (!customElements.get('lib-yucca-widgets')) { customElements.define("lib-yucca-widgets", yuccaWidgetsComponent); }
    if (!customElements.get('yucca-sankey-diagram')) { customElements.define("yucca-sankey-diagram", sankeyDiagramComponent); }
    if (!customElements.get('yucca-discrete-table')) { customElements.define("yucca-discrete-table", discreteTableComponent); }
    if (!customElements.get('yucca-control-selects')) { customElements.define("yucca-control-selects", controlSelectComponent); }
    if (!customElements.get('yucca-horizontalmultibar-chart')) { customElements.define("yucca-horizontalmultibar-chart", horizontalMultiBarChartComponent); }

  }

  ngDoBootstrap() {
  }
}
