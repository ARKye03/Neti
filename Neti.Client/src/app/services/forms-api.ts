import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { FormField } from '../components/form-create/form-create';

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

    createForm(payload: CreateFormRequest): Observable<any> {
        return this.http.post(this.baseUrl, payload);
    }
}