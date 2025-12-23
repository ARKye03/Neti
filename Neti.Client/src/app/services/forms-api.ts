import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// field interface from backend
export interface FormField {
  id: number;
  formId: number;
  label: string;
  fieldType: string; // text, email, textarea, select, radio, checkbox, date
  isRequired: boolean;
  placeholder?: string;
  options?: string; // JSON string for select/radio/checkbox options
  order: number;
}

// form interface from backend
export interface Form {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  fields: FormField[];
}

export interface CreateFormRequest {
  title: string;
  description: string;
  isActive: boolean;
  fields: {
    label: string;
    fieldType: string;
    isRequired: boolean;
    placeholder?: string;
    options?: string | null;
    order: number;
  }[];
}

export interface FormSubmission {
  formId: number;
  values: {
    formFieldId: number;
    value: string;
  }[];
}

@Injectable({ providedIn: 'root' })
export class FormsApiService {
  private http = inject(HttpClient);
  private formsUrl = '/api/forms';
  private submissionsUrl = '/api/submissions';

  createForm(payload: CreateFormRequest): Observable<Form> {
    return this.http.post<Form>(this.formsUrl, payload);
  }

  getForms(): Observable<Form[]> {
    return this.http.get<Form[]>(this.formsUrl);
  }

  getForm(id: number): Observable<Form> {
    return this.http.get<Form>(`${this.formsUrl}/${id}`);
  }

  submitForm(payload: FormSubmission): Observable<any> {
    return this.http.post(this.submissionsUrl, payload);
  }

  getSubmissions(formId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.submissionsUrl}/form/${formId}`);
  }
}
