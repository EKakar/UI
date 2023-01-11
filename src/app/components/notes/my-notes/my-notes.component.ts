import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { FilesService } from 'src/app/services/files.service';
import { NotesService } from 'src/app/services/notes.service';

interface NoteLevel {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.css'],
})
export class MyNotesComponent implements OnInit {
  levels: NoteLevel[] = [
    { value: 0, viewValue: 'Primary' },
    { value: 1, viewValue: 'High School' },
    { value: 2, viewValue: 'University' },
  ];

  public notes: any = [];
  userMail = this.auth.getFullNameFromToken();
  constructor(
    private notesService: NotesService,
    private toast: NgToastService,
    private fileService: FilesService,
    private auth : AuthService
  ) {

  }

  ngOnInit(): void {
    console.log(this.auth.getFullNameFromToken());
    this.notesService.getUserNotes(this.userMail).subscribe({
      next: (res) => {
        this.notes = res;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  deleteNote(noteId: number) {
    alert('Do you want to delete this note?');
    this.notesService.deleteNote(noteId).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'Deleted',
          summary: res.message,
          duration: 5000,
        });
        window.location.reload();
      },
    });
  }

  downloadNote(noteId: number) {
    this.fileService.downloadFile(noteId).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'Download',
          summary: res.message,
          duration: 5000,
        });
      },
    });
  }
}
