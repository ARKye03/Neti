import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateFormRequest, FormsApiService } from '../../services/forms-api';

export interface FieldType {
  type: string;
  icon: string;
  label: string;
  desc: string;
}

export interface FormField {
  tempId: number;
  label: string;
  fieldType: string;
  isRequired: boolean;
  placeholder?: string;
  options?: string;
  order: number;
}

@Component({
  selector: 'app-form-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-create.html',
  styleUrl: './form-create.css',
})
export class FormCreate {
  constructor(private formsApi: FormsApiService) { }

  formTitle = '';
  formDescription = '';

  fields: FormField[] = [
    {
      tempId: 1,
      label: 'Untitled Question',
      fieldType: 'text',
      isRequired: false,
      placeholder: '',
      order: 0,
    },
  ];

  isSelectorOpen = false;

  fieldTypes: FieldType[] = [
    { type: 'text', icon: 'short_text', label: 'Short Text', desc: 'Single line text input' },
    { type: 'textarea', icon: 'notes', label: 'Long Text', desc: 'Multi-line text area' },
    { type: 'email', icon: 'mail', label: 'Email', desc: 'Validates email format' },
    {
      type: 'select',
      icon: 'arrow_drop_down_circle',
      label: 'Dropdown',
      desc: 'Select one from a list',
    },
    {
      type: 'radio',
      icon: 'radio_button_checked',
      label: 'Single Choice',
      desc: 'Radio buttons group',
    },
    { type: 'checkbox', icon: 'check_box', label: 'Multiple Choice', desc: 'Checkboxes group' },
    { type: 'date', icon: 'calendar_today', label: 'Date', desc: 'Date picker input' },
  ];

  addField(type: string) {
    const newField: FormField = {
      tempId: Date.now(),
      label: '',
      fieldType: type,
      isRequired: false,
      order: this.fields.length,
      placeholder: '',
      options: ['select', 'radio', 'checkbox'].includes(type) ? 'Option 1, Option 2' : undefined,
    };

    if (type === 'text') newField.placeholder = 'Short answer text';

    this.fields.push(newField);
    this.isSelectorOpen = false;
  }

  removeField(index: number) {
    this.fields.splice(index, 1);
  }

  toggleSelector() {
    this.isSelectorOpen = !this.isSelectorOpen;
  }

  getIconForType(type: string): string {
    const found = this.fieldTypes.find((t) => t.type === type);
    return found ? found.icon : 'short_text';
  }

  saveForm() {
    const payload: CreateFormRequest = {
      title: this.formTitle,
      description: this.formDescription,
      isActive: true,
      fields: this.fields.map((f, index) => ({
        label: f.label || 'Untitled Question',
        fieldType: f.fieldType,
        isRequired: f.isRequired,
        placeholder: f.placeholder || undefined,
        // if you want to store JSON in Options:
        options: f.options
          ? JSON.stringify(
            f.options.split(',').map((o) => o.trim()).filter(Boolean)
          )
          : null,
        order: index
      }))
    };

    this.formsApi.createForm(payload).subscribe({
      next: (created) => {
        // e.g. navigate to /forms or show toast
        console.log('Form created:', created);
      },
      error: (err) => {
        console.error('Failed to create form', err);
      },
    });
  }
}
