import { LOCALE_ID, NgModule } from '@angular/core';
import { YuccaWidgetsComponent } from './yucca-widgets.component';
import { PieChartComponent } from './components/datasets/pie-chart/pie-chart.component';
import { DiscretebarChartComponent } from './components/datasets/discretebar-chart/discretebar-chart.component';
import { TreemapChartComponent } from './components/datasets/treemap-chart/treemap-chart.component';
import { SankeyComponent } from './components/library/sankey/sankey.component';
import { SafeNumberPipe } from './pipes/safe-number.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { SankeyDiagramComponent } from './components/datasets/sankey-diagram/sankey-diagram.component';
import { MultiChartComponent } from './components/datasets/multi-chart/multi-chart.component';
import { TreemapComponent } from './components/library/treemap/treemap.component';
import { ChoroplethMapComponent } from './components/datasets/choropleth-map/choropleth-map.component';
import { ControlSelectComponent } from './components/controls/control-select/control-select.component';
import { DiscreteTableComponent } from './components/datasets/discrete-table/discrete-table.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LineChartComponent } from './components/datasets/line-chart/line-chart.component';
import { HorizontalMultiBarChartComponent } from './components/datasets/horizontalmultibar-chart/horizontalmultibar-chart.component';
import { DataexplorerTableComponent } from './components/datasets/dataexplorer-table/dataexplorer-table.component';
import { OdataDateFormatPipe } from './pipes/odata-date-format.pipe';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { SingleDataComponent } from './components/datasets/singledata/singledata.component';
import { FilterDataSelectComponent } from './components/controls/filter-data-select/filter-data-select.component';
import { WidgetHeaderComponent } from './components/common/widget-header/widget-header.component';
import { WidgetFooterComponent } from './components/common/widget-footer/widget-footer.component';
import { BaseDatasetWidgetComponent } from './components/datasets/base-dataset-widget/base-dataset-widget.component';
registerLocaleData(localeIt, 'it');
@NgModule({
  declarations: [YuccaWidgetsComponent, DiscretebarChartComponent, PieChartComponent,
    SankeyComponent, SafeNumberPipe, SankeyDiagramComponent, MultiChartComponent, TreemapChartComponent,
    TreemapComponent, ChoroplethMapComponent, DiscreteTableComponent, ControlSelectComponent,
    LineChartComponent, HorizontalMultiBarChartComponent, DataexplorerTableComponent,
    OdataDateFormatPipe, SingleDataComponent, FilterDataSelectComponent, WidgetHeaderComponent, WidgetFooterComponent],
  imports: [BrowserModule, FormsModule, BrowserAnimationsModule],
  exports: [YuccaWidgetsComponent, DiscretebarChartComponent, PieChartComponent, SankeyDiagramComponent, MultiChartComponent,
    TreemapChartComponent, ChoroplethMapComponent, DiscreteTableComponent, ControlSelectComponent,
    LineChartComponent, HorizontalMultiBarChartComponent, DataexplorerTableComponent, SingleDataComponent, FilterDataSelectComponent],
  entryComponents: [],
  providers: [SafeNumberPipe, { provide: LOCALE_ID, useValue: "it-IT" },]
})
export class YuccaWidgetsModule { }
