import { CertificatesService } from './services/certificates.service';
import { AnswerService } from './services/answer.service';
import { TestsService } from './services/tests.service';
import { HttpClientModule } from '@angular/common/http';
import { MatComponentsModule } from './modules/mat-components.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './modules/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';

import { AppComponent } from './app.component';
import { ManageQuestionsComponent } from './components/admin/manage-questions/manage-questions.component';
import { ManageTestsComponent } from './components/admin/manage-tests/manage-tests.component';
import { ReportsComponent } from './components/admin/reports/reports.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateTestComponent } from './components/admin/create-test/create-test.component';
import { QuestionTableComponent } from './components/admin/create-test/question-table/question-table.component';

import { AppErrorHandler } from './helpers/app-error-handler';

import { AuthenticationService } from './services/authentication.service';
import { LanguageService } from './services/language.service';
import { TagsPipe } from './helpers/tags.pipe';
import { QuestionsService } from './services/questions.service';
import { AddTestComponent } from './components/admin/add-test/add-test.component';
import { ShowQuestionComponent } from './components/admin/show-question/show-question.component';
import { TestsTableComponent } from './components/admin/tests-table/tests-table.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditTestComponent } from './components/admin/edit-test/edit-test.component';

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
    QuestionTableComponent,
    TagsPipe,
    AddTestComponent,
    ShowQuestionComponent,
    TestsTableComponent,
    NotFoundComponent,
    EditTestComponent
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
