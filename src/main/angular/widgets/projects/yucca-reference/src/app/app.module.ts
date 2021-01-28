import { BrowserModule } from '@angular/platform-browser';
import { COMPILER_OPTIONS, CompilerFactory, Compiler, LOCALE_ID, NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AuthService } from './services/auth.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { InstallComponent } from './pages/install/install.component';
import { WidgetsComponent } from './pages/widgets/widgets.component';
import { WidgetComponent } from './pages/widget/widget.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { YuccaWidgetsModule } from '../../../yucca-widgets/src/lib/yucca-widgets.module';
import { CopyClipboardDirective } from './directives/copy-clipboard.directive';
import { OverviewComponent } from './components/widget-detail/overview/overview.component';
import { ParamsComponent } from './components/widget-detail/params/params.component';
import { ExampleComponent } from './components/widget-detail/example/example.component';
import { StylesComponent } from './components/widget-detail/styles/styles.component';
import { InstallAngularComponent } from './components/install/install-angular/install-angular.component';
import { InstallCustomComponent } from './components/install/install-custom/install-custom.component';
import { UseAngularComponent } from './components/install/use-angular/use-angular.component';
import { UseCustomComponent } from './components/install/use-custom/use-custom.component';
import { WidgetConfiguratorComponent } from './pages/tools/widget-configurator/widget-configurator.component';
import { WidgetTypeChooserComponent } from './components/configurator/widget-type-chooser/widget-type-chooser.component';
import { WidgetParamConfigComponent } from './components/configurator/widget-param-config/widget-param-config.component';
import { InputTextComponent } from './components/configurator/paramtypes/input-text/input-text.component';
import { FormsModule } from '@angular/forms';
import { InputBooleanComponent } from './components/configurator/paramtypes/input-boolean/input-boolean.component';
import { AbstractParamTypeComponent } from './components/configurator/paramtypes/abstract-param-type/abstract-param-type.component';
import { WidgetCodeExportComponent } from './components/configurator/widget-code-export/widget-code-export.component';
import { InputColorComponent } from './components/configurator/paramtypes/input-color/input-color.component';
import { InputColorsComponent } from './components/configurator/paramtypes/input-colors/input-colors.component';
import { InputTenantcodeComponent } from './components/configurator/paramtypes/input-tenantcode/input-tenantcode.component';
import { InputDatasetcodeComponent } from './components/configurator/paramtypes/input-datasetcode/input-datasetcode.component';
import { InputDatasetcolumnComponent } from './components/configurator/paramtypes/input-datasetcolumn/input-datasetcolumn.component';
import { InputDatasetcolumnsComponent } from './components/configurator/paramtypes/input-datasetcolumns/input-datasetcolumns.component'; import { WidgetAccessibilityComponent } from './pages/tools/widget-accessibility/widget-accessibility.component';

export function init_app(appAuthService: AuthService) {
  return () => appAuthService.loadUser();
}

export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'install', component: InstallComponent },
  { path: 'widgets', component: WidgetsComponent },
  { path: 'widgets/:widgetSectionKey/:widgetKey', component: WidgetComponent },
  { path: 'tools/widget/configurator', component: WidgetConfiguratorComponent },
  { path: 'tools/widget/accessibility', component: WidgetAccessibilityComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InstallComponent,
    WidgetsComponent,
    WidgetComponent,
    HeaderComponent,
    FooterComponent,
    CopyClipboardDirective,
    OverviewComponent,
    ParamsComponent,
    ExampleComponent,
    StylesComponent,
    InstallAngularComponent,
    InstallCustomComponent,
    UseAngularComponent,
    UseCustomComponent,
    WidgetConfiguratorComponent,
    WidgetTypeChooserComponent,
    WidgetParamConfigComponent,
    InputTextComponent,
    InputBooleanComponent,
    WidgetCodeExportComponent,
    InputColorComponent,
    InputColorsComponent,
    InputTenantcodeComponent,
    InputDatasetcodeComponent,
    InputDatasetcolumnComponent,
    InputDatasetcolumnsComponent,
    WidgetAccessibilityComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    YuccaWidgetsModule,
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled' }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [AuthService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AuthService], multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: 'it-IT' },
    { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
    { provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS] },
    { provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}
