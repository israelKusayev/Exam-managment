import { AdminLoginComponent } from '../components/admin/admin-login/admin-login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageQuestionsComponent } from '../components/admin/manage-questions/manage-questions.component';
import { ManageTestsComponent } from '../components/admin/manage-tests/manage-tests.component';
import { ReportsComponent } from '../components/admin/reports/reports.component';
import { CreateTestComponent } from '../components/admin/create-test/create-test.component';

const routes: Routes = [
  { path: 'login', component: AdminLoginComponent },
  { path: 'manage-questions', component: ManageQuestionsComponent },
  { path: 'manage-tests/create', component: CreateTestComponent },
  { path: 'manage-tests', component: ManageTestsComponent },
  { path: 'reports', component: ReportsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
