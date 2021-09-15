import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidator {
    static alreadyExists(formGroup: FormGroup): ValidatorFn {
        return (abstractControl: AbstractControl): ValidationErrors | null => {
            return { alreadyExists: true }
        }
    }
}