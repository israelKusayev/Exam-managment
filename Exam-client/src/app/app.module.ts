import { MatComponentsModule } from './modules/mat-components.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './modules/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ManageQuestionsComponent } from './components/admin/manage-questions/manage-questions.component';
import { ManageTestsComponent } from './components/admin/manage-tests/manage-tests.component';
import { ReportsComponent } from './components/admin/reports/reports.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppErrorHandler } from './helpers/app-error-handler';
import { CreateTestComponent } from './components/admin/create-test/create-test.component';

@NgModule({
  declarations: [
    AppComponent,
    ManageQuestionsComponent,
    ManageTestsComponent,
    ReportsComponent,
    AdminLoginComponent,
    UserLoginComponent,
    NavbarComponent,
    CreateTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatComponentsModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [{ provide: ErrorHandler, useClass: AppErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule {}
