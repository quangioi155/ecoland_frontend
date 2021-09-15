import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxFieldComponent } from './component.common/checkbox-field/checkbox-field.component';
import { DateCommonComponent } from './component.common/date-common/date-common.component';
import { DropdownFieldComponent } from './component.common/dropdown-field/dropdown-field.component';
import { HorizoltalViewComponent } from './component.common/horizoltal-view/horizoltal-view.component';
import { TextboxFieldComponent } from './component.common/textbox-field/textbox-field.component';
import { ReportPageComponent } from './component.common/report-page.component';
import { TitleComponent } from './component.common/title-component';
import { DividerModule } from 'primeng/divider';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ContainerDirective } from './directive/container.directive';
import { NumberDirective } from './directive/numbers-only.directive';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AutocompleteFieldComponent } from './autocomplete-field/autocomplete-field.component';
import { AutoCompleteModule } from 'primeng/autocomplete';



@NgModule({
  declarations: [
    CheckboxFieldComponent,
    DateCommonComponent,
    DropdownFieldComponent,
    HorizoltalViewComponent,
    TextboxFieldComponent,
    ReportPageComponent,
    TitleComponent,
    ContainerDirective,
    NumberDirective,
    AutocompleteFieldComponent
  ],
  imports: [
    CommonModule,
    DividerModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    CheckboxModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ToastModule,
    FormsModule,
    PaginatorModule,
    TableModule,
    RadioButtonModule,
    AutoCompleteModule
  ],
  exports: [
    CheckboxFieldComponent,
    DateCommonComponent,
    DropdownFieldComponent,
    HorizoltalViewComponent,
    TextboxFieldComponent,
    ReportPageComponent,
    TitleComponent,
    CommonModule,
    DividerModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    CheckboxModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ToastModule,
    FormsModule,
    PaginatorModule,
    TableModule,
    ContainerDirective,
    NumberDirective,
    RadioButtonModule,
    AutoCompleteModule,
    AutocompleteFieldComponent
  ]
})
export class EclCommonModule { }
