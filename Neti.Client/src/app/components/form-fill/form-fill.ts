import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsApiService, Form, FormField } from '../../services/forms-api';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-fill',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-fill.html',
  styleUrl: './form-fill.css',
})
export class FormFill implements OnInit {
  private route = inject(ActivatedRoute);
  private formsService = inject(FormsApiService);
  private fb = inject(FormBuilder);

  form$!: Observable<Form>; // Using ! because it's initialized in ngOnInit
  dynamicForm: FormGroup = this.fb.group({});

  ngOnInit() {
    this.form$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.formsService.getForm(id);
      }),
      tap((form) => this.buildForm(form.fields))
    );
  }

  buildForm(fields: FormField[]) {
    const group: any = {};
    fields.forEach((field) => {
      const validators = [];
      if (field.isRequired) {
        validators.push(Validators.required);
      }
      if (field.fieldType === 'email') {
        validators.push(Validators.email);
      }

      // Initialize value based on type
      let initialValue: any = '';
      if (
        field.fieldType === 'checkbox' &&
        (!field.options || this.getOptions(field).length === 0)
      ) {
        initialValue = false; // Single boolean checkbox
      }

      group[field.id] = [initialValue, validators];
    });
    this.dynamicForm = this.fb.group(group);
  }

  onSubmit() {
    if (this.dynamicForm.valid) {
      console.log('Form Submitted', this.dynamicForm.value);
      // TODO: Implement submission logic
    } else {
      this.dynamicForm.markAllAsTouched();
    }
  }

  getOptions(field: FormField): string[] {
    if (!field.options) return [];
    try {
      return JSON.parse(field.options);
    } catch (e) {
      console.error('Error parsing options for field', field.id, e);
      return [];
    }
  }
}
