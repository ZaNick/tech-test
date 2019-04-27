import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { TimeDiffPipe } from 'src/app/pipes/time-diff.pipe';
import { UserStatusPipe } from 'src/app/pipes/user-status.pipe';

@NgModule({
  declarations: [
    TimeDiffPipe,
    UserStatusPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TimeDiffPipe,
    UserStatusPipe
  ]
})
export class SharedModule { }
