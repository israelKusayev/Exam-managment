import { EditTestComponent } from './../components/admin/edit-test/edit-test.component';
import { AddTestComponent } from './../components/admin/add-test/add-test.component';
import { AdminLoginComponent } from '../components/admin/admin-login/admin-login.component';
import { AdminRegisterComponent } from '../components/admin/admin-register/admin-register.component';
import { AdminResetPasswordComponent } from '../components/admin/admin-reset-password/admin-reset-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageQuestionsComponent } from '../components/admin/manage-questions/manage-questions.component';
import { ManageTestsComponent } from '../components/admin/manage-tests/manage-tests.component';
import { ReportsComponent } from '../components/admin/reports/reports.component';
import { CreateTestComponent } from '../components/admin/create-test/create-test.component';
import { UserLoginComponent } from '../components/user/user-login/user-login.component';
import { UserSignupComponent } from '../components/user/user-signup/user-signup.component';

import { AdminAuthGuardService as AdminAuthGuard } from '../services/auth-guard.service';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { OrganizationComponent } from '../components/admin/organization/organization.component';

const routes: Routes = [
  { path: 'user-signup', component: UserSignupComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'login', component: AdminLoginComponent },
  { path: 'admin-register', component: AdminRegisterComponent },
  {
    path: 'admin-reset-password/:token',
    component: AdminResetPasswordComponent
  },
  {
    path: 'manage-questions',
    component: ManageQuestionsComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'manage-tests/create',
    component: CreateTestComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'manage-tests',
    component: ManageTestsComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'manage-questions',
    component: ManageQuestionsComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'manage-tests/edit/:id',
    component: EditTestComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'manage-tests/add',
    component: AddTestComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'manage-tests',
    component: ManageTestsComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AdminAuthGuard]
  },
  { path: '', pathMatch: 'prefix', component: OrganizationComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
