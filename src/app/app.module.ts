import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import { PanelComponent } from './componentes/panel/panel.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';


import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormularioActualComponent } from './componentes/forms/formulario-actual/formulario-actual.component';
import { ComedorComponent } from './componentes/forms/comedor/comedor.component';
import { GruasComponent } from './componentes/forms/gruas/gruas.component';
import { ProcesoCNCComponent } from './componentes/forms/proceso-cnc/proceso-cnc.component';
import { TornoManualComponent } from './componentes/forms/torno-manual/torno-manual.component';
import { AlmacenComponent } from './componentes/forms/almacen/almacen.component';
import { AreaDeCorteComponent } from './componentes/forms/area-de-corte/area-de-corte.component';
import { StampingComponent } from './componentes/forms/stamping/stamping.component';
import { RubberMoldingComponent } from './componentes/forms/rubber-molding/rubber-molding.component';
import { LapeadoComponent } from './componentes/forms/lapeado/lapeado.component';
import { IscComponent } from './componentes/forms/isc/isc.component';
import { SoldaduraComponent } from './componentes/forms/soldadura/soldadura.component';
import { EnsambleP72Component } from './componentes/forms/ensamble-p72/ensamble-p72.component';
import { EnsambleP62Component } from './componentes/forms/ensamble-p62/ensamble-p62.component';
import { GraphicsComponent } from './componentes/graphics/graphics.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AgendaComponent } from './componentes/agenda/agenda.component';
import { EmpleadosComponent } from './componentes/empleados/empleados.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { AuthComponent } from './componentes/auth/auth.component';
import { JwtInterceptorInterceptor } from './componentes/auth/jwt-interceptor.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { LoginComponent } from './componentes/auth/login/login.component';
import { SettingsComponent } from './componentes/ajustes/settings.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    FormularioActualComponent,
    ComedorComponent,
    GruasComponent,
    ProcesoCNCComponent,
    TornoManualComponent,
    AlmacenComponent,
    AreaDeCorteComponent,
    StampingComponent,
    RubberMoldingComponent,
    LapeadoComponent,
    IscComponent,
    SoldaduraComponent,
    EnsambleP72Component,
    EnsambleP62Component,
    GraphicsComponent,
    AgendaComponent,
    EmpleadosComponent,
    AuthComponent,
    SpinnerComponent,
    LoginComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule,
    NgxQRCodeModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
