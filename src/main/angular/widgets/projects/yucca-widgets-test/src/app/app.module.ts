import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { YuccaDatasetDiscretebarChartTestComponent } from './components/datasets/yucca-dataset-discretebar-chart-test/yucca-dataset-discretebar-chart-test.component';
import { YuccaDatasetPieChartTestComponent } from './components/datasets/yucca-dataset-pie-chart-test/yucca-dataset-pie-chart-test.component';
import { YuccaDatasetTreemapChartTestComponent } from './components/datasets/yucca-dataset-treemap-chart-test/yucca-dataset-treemap-chart-test.component';
import { YuccaDatasetExploredataTableTestComponent } from './components/datasets/yucca-dataset-exploredata-table-test/yucca-dataset-exploredata-table-test.component';
import { HomeComponent } from './components/common/home/home.component';
import { YuccaWidgetsModule } from '../../../yucca-widgets/src/lib/yucca-widgets.module';
import { HttpClientModule } from '@angular/common/http';

import 'c3';
import 'd3';

import { YuccaDatasetHorizontalMultiBarTestComponent } from './components/datasets/yucca-dataset-horizontalmultibar-chart-test/yucca-dataset-horizontalmultibar-chart-test.component';
import { YuccaDatasetLineChartTestComponent } from './components/datasets/yucca-dataset-line-chart-test/yucca-dataset-line-chart-test.component';
import { YuccaDatasetMultiChartTestComponent } from './components/datasets/yucca-dataset-multi-chart-test/yucca-dataset-multi-chart-test.component';
import { YuccaDatasetSankeyDiagramTestComponent } from './components/datasets/yucca-dataset-sankey-diagram-test/yucca-dataset-sankey-diagram-test.component';
import { YuccaDatasetChoroplethMapTestComponent } from './components/datasets/yucca-dataset-choropleth-map-test/yucca-dataset-choropleth-map-test.component';
import { YuccaDatasetDiscreteTableTestComponent } from './components/datasets/yucca-dataset-discrete-table-test/yucca-dataset-discrete-table-test.component';
import { YuccaInteractionsDiscreteTestComponent } from './components/interactions/yucca-interactions-discrete-test/yucca-interactions-discrete-test.component';
import { YuccaInteractionsControlsTestComponent } from './components/interactions/yucca-controls-test/yucca-controls-test.component';
import { YuccaDatasetSingleDataTestComponent } from './components/datasets/yucca-dataset-singledata-test/yucca-dataset-singledata-test.component';
import { YuccaEventsTestComponent } from './components/interactions/yucca-events-test/yucca-events-test.component';
import { YuccaInteractionsOdataDiscreteComponent } from './components/interactions/yucca-interactions-odata-discrete/yucca-interactions-odata-discrete.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'datasets/discretebar', component: YuccaDatasetDiscretebarChartTestComponent },
  { path: 'datasets/pie', component: YuccaDatasetPieChartTestComponent },
  { path: 'datasets/multichart', component: YuccaDatasetMultiChartTestComponent },
  { path: 'datasets/linechart', component: YuccaDatasetLineChartTestComponent },
  { path: 'datasets/horizontalmultibarchart', component: YuccaDatasetHorizontalMultiBarTestComponent },
  { path: 'datasets/treemap', component: YuccaDatasetTreemapChartTestComponent },
  { path: 'datasets/sankey', component: YuccaDatasetSankeyDiagramTestComponent },
  { path: 'datasets/choroplethmap', component: YuccaDatasetChoroplethMapTestComponent },
  { path: 'datasets/discretetable', component: YuccaDatasetDiscreteTableTestComponent },
  { path: 'interactions/discrete', component: YuccaInteractionsDiscreteTestComponent },
  { path: 'interactions/controls', component: YuccaInteractionsControlsTestComponent },
  { path: 'interactions/events_test', component: YuccaEventsTestComponent },
  { path: 'interactions/odatadiscrete', component: YuccaInteractionsOdataDiscreteComponent },
  { path: 'datasets/exploredatatable', component: YuccaDatasetExploredataTableTestComponent },
  { path: 'datasets/singledata', component: YuccaDatasetSingleDataTestComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    YuccaDatasetHorizontalMultiBarTestComponent,
    YuccaDatasetPieChartTestComponent,
    YuccaDatasetMultiChartTestComponent,
    YuccaDatasetLineChartTestComponent,
    YuccaDatasetTreemapChartTestComponent,
    YuccaDatasetDiscretebarChartTestComponent,
    YuccaDatasetSankeyDiagramTestComponent,
    YuccaDatasetChoroplethMapTestComponent,
    YuccaDatasetDiscreteTableTestComponent,
    YuccaInteractionsDiscreteTestComponent,
    YuccaInteractionsControlsTestComponent,
    YuccaDatasetExploredataTableTestComponent,
    YuccaDatasetSingleDataTestComponent,
    YuccaEventsTestComponent,
    YuccaInteractionsOdataDiscreteComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    YuccaWidgetsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
