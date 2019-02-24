import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ClipboardModule } from 'ngx-clipboard';
import { AppRoutingModule } from './modules/app-routing.module';
import { MatComponentsModule } from './modules/mat-components.module';

import { CertificatesService } from './services/certificates.service';
import { AnswerService } from './services/answer.service';
import { TestsService } from './services/tests.service';
import { AuthenticationService } from './services/authentication.service';
import { LanguageService } from './services/language.service';
import { QuestionsService } from './services/questions.service';

import { AppComponent } from './app.component';
import { ManageQuestionsComponent } from './components/admin/manage-questions/manage-questions.component';
import { ManageTestsComponent } from './components/admin/manage-tests/manage-tests.component';
import { ReportsComponent } from './components/admin/reports/reports.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminRegisterComponent } from './components/admin/admin-register/admin-register.component';
import { AdminResetPasswordComponent } from './components/admin/admin-reset-password/admin-reset-password.component';
import { UserSignupComponent } from './components/user/user-signup/user-signup.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateTestComponent } from './components/admin/create-test/create-test.component';
import { QuestionTableComponent } from './components/admin/create-test/question-table/question-table.component';
import { AddTestComponent } from './components/admin/add-test/add-test.component';
import { ShowQuestionComponent } from './components/admin/show-question/show-question.component';
import { TestsTableComponent } from './components/admin/tests-table/tests-table.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditTestComponent } from './components/admin/edit-test/edit-test.component';

import { AppErrorHandler } from './helpers/app-error-handler';
import { TagsPipe } from './helpers/tags.pipe';
import { AddQuestionComponent } from './components/admin/add-question/add-question.component';
import { PossibleAnswerComponent } from './components/admin/add-question/possible-answer/possible-answer.component';

@NgModule({
  declarations: [
    AppComponent,
    ManageQuestionsComponent,
    ManageTestsComponent,
    ReportsComponent,
    AdminLoginComponent,
    UserLoginComponent,
    NavbarComponent,
    CreateTestComponent,
    AdminRegisterComponent,
    AdminResetPasswordComponent,
    UserSignupComponent,
    QuestionTableComponent,
    TagsPipe,
    AddTestComponent,
    ShowQuestionComponent,
    TestsTableComponent,
    NotFoundComponent,
    EditTestComponent,
    AddQuestionComponent,
    PossibleAnswerComponent
  ],
  entryComponents: [ShowQuestionComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatComponentsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ClipboardModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    LanguageService,
    TestsService,
    AuthenticationService,
    QuestionsService,
    AnswerService,
    CertificatesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
