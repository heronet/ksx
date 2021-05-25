import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreComponent } from './core/core.component';
import { ToolbarComponent } from './core/toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AllTestsComponent } from './core/all-tests/all-tests.component';
import { TestBoardComponent } from './core/all-tests/test-board/test-board.component';
import { CreateTestComponent } from './core/all-tests/create-test/create-test.component';
import { TokenInterceptor } from './utils/token.interceptor';
import { MathJaxModule } from 'ngx-mathjax';
import { NgxPrintModule } from 'ngx-print';
import { PromptComponent } from './core/prompt/prompt.component';
import { EditComponent } from './core/all-tests/edit/edit.component';
import { ExamManagementComponent } from './core/all-tests/exam-management/exam-management.component';
import { ExamDetailComponent } from './core/all-tests/exam-management/exam-detail/exam-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CoreComponent,
    ToolbarComponent,
    DashboardComponent,
    SidenavComponent,
    LoginComponent,
    RegisterComponent,
    AllTestsComponent,
    TestBoardComponent,
    CreateTestComponent,
    PromptComponent,
    EditComponent,
    ExamManagementComponent,
    ExamDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    NgxPrintModule,
    MathJaxModule.forRoot({
      version: '2.7.5',
      config: 'TeX-MML-AM_CHTML',
      hostname: 'cdnjs.cloudflare.com',
    })
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
