import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AllTestsComponent } from './core/all-tests/all-tests.component';
import { TestBoardComponent } from './core/all-tests/test-board/test-board.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { CreateTestComponent } from './core/all-tests/create-test/create-test.component';
import { SecurityGuard } from './guards/security.guard';
import { EditComponent } from './core/all-tests/edit/edit.component';
import { ExamManagementComponent } from './core/all-tests/exam-management/exam-management.component';
import { ExamDetailComponent } from './core/all-tests/exam-management/exam-detail/exam-detail.component';

const routes: Routes = [
  {path: "", component: DashboardComponent, pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "all-tests", component: AllTestsComponent},
  {path: "all-tests/create", component: CreateTestComponent, canActivate: [SecurityGuard]},
  {path: "all-tests/manage", component: ExamManagementComponent, canActivate: [SecurityGuard]},
  {path: "all-tests/manage/:id", component: ExamDetailComponent, canActivate: [SecurityGuard]},
  {path: "all-tests/edit/:id", component: EditComponent},
  {path: "all-tests/:id", component: TestBoardComponent},
  {path: '*', component: AllTestsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SecurityGuard]
})
export class AppRoutingModule { }
