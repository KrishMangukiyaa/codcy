import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashbordComponent } from './pages/admin/dashbord/dashbord.component';
import { WriteABlogComponent } from './pages/admin/write-a-blog/write-a-blog.component';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CatagoryComponent } from './pages/catagory/catagory.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'admin',
        component: DashbordComponent
    },
    {
        path: 'admin/add-post',
        component: WriteABlogComponent
    },
    {
        path: 'admin/edit-post/:id',
        component: WriteABlogComponent
    },
    {
        path: 'admin/profile',
        component: ProfileComponent
    },
    {
        path: 'blog/:id',
        component: BlogComponent
    },
    {
        path: 'category/:id',
        component: CatagoryComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '**',
        component: PagenotfoundComponent
    }

];
