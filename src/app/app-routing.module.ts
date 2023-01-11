import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AddNoteComponent } from './components/notes/add-note/add-note.component';
import { MyNotesComponent } from './components/notes/my-notes/my-notes.component';
import { NoteListComponent } from './components/notes/note-list/note-list.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'note',
    component: NoteListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'myNotes',
    component: MyNotesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'note/add',
    component: AddNoteComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
