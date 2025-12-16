import { Routes } from '@angular/router';
import { FormsList } from './components/forms-list/forms-list';
import { FormFill } from './components/form-fill/form-fill';
import { FormEdit } from './components/form-edit/form-edit';
import { FormCreate } from './components/form-create/form-create';
import { Submissions } from './components/submissions/submissions';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'forms', component: FormsList },
  { path: 'form/:id', component: FormFill },
  { path: 'form/:id/edit', component: FormEdit },
  { path: 'form/create', component: FormCreate },
  { path: 'submissions', component: Submissions },
];
