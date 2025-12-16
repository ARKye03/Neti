import { Routes } from '@angular/router';
import { Layout } from './components/layout/layout';
import { FormsList } from './components/forms-list/forms-list';
import { FormFill } from './components/form-fill/form-fill';
import { FormEdit } from './components/form-edit/form-edit';
import { FormCreate } from './components/form-create/form-create';
import { Submissions } from './components/submissions/submissions';
import { Home } from './components/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Home, data: { title: undefined } }, // Home page doesn't need a title
      { path: 'forms', component: FormsList, data: { title: 'Forms' } },
      { path: 'forms/create', component: FormCreate, data: { title: 'Create Form' } },
      { path: 'forms/:id/edit', component: FormEdit, data: { title: 'Edit Form' } },
      { path: 'forms/:id', component: FormFill, data: { title: 'Fill Form' } },
      { path: 'submissions', component: Submissions, data: { title: 'Submissions' } }
    ]
  }
];
