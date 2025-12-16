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

@Injectable({ providedIn: 'root' })
export class FormsApiService {
  private http = inject(HttpClient);
  private baseUrl = '/api/forms'; // goes via proxy to http://localhost:5077/api/forms

  createForm(payload: CreateFormRequest): Observable<Form> {
    return this.http.post<Form>(this.baseUrl, payload);
  }

  getForm(id: number): Observable<Form> {
    return this.http.get<Form>(`${this.baseUrl}/${id}`);
  }
}
