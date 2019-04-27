import { NgModule } from '@angular/core';
import { MatSnackBarModule, MatDialogModule, MatIconModule } from '@angular/material';

/**
 * NgModule that includes all Material modules.
*/
@NgModule({
  exports: [
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule
  ]
})
export class MaterialModule { }
