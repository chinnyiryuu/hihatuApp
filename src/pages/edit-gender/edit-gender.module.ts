import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditGenderPage } from './edit-gender';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    EditGenderPage,
  ],
  imports: [
    ReactiveFormsModule,
    IonicPageModule.forChild(EditGenderPage),
  ],
})
export class EditGenderPageModule { }
