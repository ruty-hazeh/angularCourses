import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { CourseListComponent } from '../components/course-list/course-list.component';
import { CourseDetailsComponent } from '../components/course-details/course-details.component';
import { AuthComponent } from '../components/auth/auth.component';
import { ManageComponent } from '../components/manage/manage.component';
import { authGuard } from '../guards/auth.guard';
import { teacherGuard } from '../guards/teacher.guard';
import { EnteranceComponent } from '../components/enterance/enterance.component';
import { LessonsComponent } from '../components/lessons/lessons.component';
export const routes: Routes = [

    { path: '', component: EnteranceComponent},
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'courses', component: CourseListComponent, canActivate: [authGuard] },
    {path:'auth/:type' , component:AuthComponent},
    { path: 'course-details/:id', component: CourseDetailsComponent, canActivate: [authGuard] },
    { path: 'course-manager', component: ManageComponent, canActivate: [authGuard, teacherGuard] },
    { path: 'lesson-manager', component: LessonsComponent, canActivate: [authGuard, teacherGuard] },
];