// app.component.ts

import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Angular Form Validation Tutorial";
  angForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password1: ["", [Validators.required, Validators.minLength(8)]],
      password2: ["", [Validators.required, Validators.minLength(8)]]
    }, {validator: AppComponent.passwordMatchValidator});
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password1').value; // get password from our password form control
    const confirmPassword: string = control.get('password2').value; // get password from our confirmPassword form control
    // compare is the password match
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('password2').setErrors({ NoPassswordMatch: true });
    }
  }
}
