import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';


export class CustomValidationService {

  constructor() { }
}
export function CellNumValidation(
  control: AbstractControl
): { [key: string]: any } | null {
  const text = new RegExp('^((\\+91-?)|0)?[0-9]{10}$');
  const valid = text.test(control.value);

  if (!valid) {
    return { cellNumNotValid: 'Mobile Number should be 10 digit  long' };
  } else {
    return null;
  }
}
export function panValidation(
  control: AbstractControl
): { [key: string]: any } | null {
  const text = new RegExp('^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$');
  const valid = text.test(control.value);

  if (!valid) {
    return { panValidation: 'please enter valid pan number' };
  } else {
    return null;
  }
}


