import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nonEmptyStringValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && control.value.trim().length === 0) {
      return { notEmpty: true };
    }
    return null;
  };
}
