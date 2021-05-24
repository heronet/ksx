import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AllTestsComponent } from './core/all-tests/all-tests.component';
import { TestBoardComponent } from './core/all-tests/test-board/test-board.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { CreateTestComponent } from './core/all-tests/create-test/create-test.component';
import { SecurityGuard } from './guards/security.guard';
import { EditComponent } from './core/all-tests/edit/edit.component';

const routes: Routes = [
  {path: "", component: DashboardComponent},
  {path: "login", component: LoginComponent, canActivate: [AuthGuard]},
  {path: "register", component: RegisterComponent, canActivate: [AuthGuard]},
  {path: "all-tests", component: AllTestsComponent},
  {path: "all-tests/create", component: CreateTestComponent, canActivate: [SecurityGuard]},
  {path: "all-tests/edit/:id", component: EditComponent},
  {path: "all-tests/:id", component: TestBoardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, SecurityGuard]
})
export class AppRoutingModule { }
