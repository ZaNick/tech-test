import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../shared/shared.module';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';

@NgModule({
  declarations: [
    UsersComponent,
    EditUserDialogComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  entryComponents: [
    EditUserDialogComponent
  ]
})
export class UsersModule { }
