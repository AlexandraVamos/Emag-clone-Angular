import { NgModule } from "@angular/core";

import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";



@NgModule ({
    imports: [
        MatIconModule,
        MatFormFieldModule,
       
    ],
    exports: [
        MatIconModule,
        MatFormFieldModule,
    ]
})
 
export class MaterialModule {};