import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashbordComponent } from './pages/admin/dashbord/dashbord.component';
import { WriteABlogComponent } from './pages/admin/admin-blog/write-a-blog/write-a-blog.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CatagoryComponent } from './pages/catagory/catagory.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { MainComponent } from './pages/home/main/main.component';
import { AuthAccessService } from './service/auth-access/auth-access.service';
import { PlatformComponent } from './pages/platform/platform.component';
import { AdminComponent } from './pages/admin/admin/admin.component';
import { AdminCategoryComponent } from './pages/admin/admin-category/admin-category.component';
import { AddEditCategoryComponent } from './pages/admin/admin-category/add-edit-category/add-edit-category.component';
import { AdminBlogComponent } from './pages/admin/admin-blog/admin-blog.component';
import { DisplayBlogComponent } from './pages/admin/admin-blog/display-blog/display-blog.component';
import { UpdateBlogComponent } from './pages/admin/admin-blog/update-blog/update-blog.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthAccessService],
    children: [
      {
        path: '',
        component: MainComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthAccessService],
      },
    ],
  },
  {
    path: 'platform',
    component: PlatformComponent,
    canActivate: [AuthAccessService],
  },
  {
    path: 'blog/:id',
    component: BlogComponent,
    canActivate: [AuthAccessService],
  },
  {
    path: 'category/:id',
    component: CatagoryComponent,
    canActivate: [AuthAccessService],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthAccessService],
    children: [
      {
        path: '',
        component: DashbordComponent,
      },
      {
        path: 'blog',
        component: AdminBlogComponent,
        children: [
          {
            path: '',
            component: DisplayBlogComponent,
          },
          {
            path: 'add-blog',
            component: WriteABlogComponent,
          },
          {
            path: 'update-blog/:id',
            component: UpdateBlogComponent,
          },
        ],
      },
      {
        path: 'category',
        component: AdminCategoryComponent,
        children: [
          {
            path: 'add',
            component: AddEditCategoryComponent, 
          },
          {
            path: 'edit/:id',
            component: AddEditCategoryComponent,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    component: PagenotfoundComponent,
  },
];
