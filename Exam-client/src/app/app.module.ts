import { MatComponentsModule } from './modules/mat-components.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './modules/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ManageQuestionsComponent } from './components/admin/manage-questions/manage-questions.component';
import { ManageTestsComponent } from './components/admin/manage-tests/manage-tests.component';
import { ReportsComponent } from './components/admin/reports/reports.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppErrorHandler } from './helpers/app-error-handler';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    ManageQuestionsComponent,
    ManageTestsComponent,
    ReportsComponent,
    AdminLoginComponent,
    UserLoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatComponentsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: ErrorHandler, useClass: AppErrorHandler },
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
