import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditBirthdayPage } from './edit-birthday';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    EditBirthdayPage,
  ],
  imports: [
    ReactiveFormsModule,
    IonicPageModule.forChild(EditBirthdayPage),
  ],
})
export class EditBirthdayPageModule { }
