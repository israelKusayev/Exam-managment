import { EditTestComponent } from './../components/admin/edit-test/edit-test.component';
import { AddTestComponent } from './../components/admin/add-test/add-test.component';
import { AdminLoginComponent } from '../components/admin/admin-login/admin-login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageQuestionsComponent } from '../components/admin/manage-questions/manage-questions.component';
import { ManageTestsComponent } from '../components/admin/manage-tests/manage-tests.component';
import { ReportsComponent } from '../components/admin/reports/reports.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';

const routes: Routes = [
  { path: 'login', component: AdminLoginComponent },
  { path: 'manage-questions', component: ManageQuestionsComponent },
  { path: 'manage-tests/edit/:id', component: EditTestComponent },
  { path: 'manage-tests/add', component: AddTestComponent },
  { path: 'manage-tests', component: ManageTestsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
