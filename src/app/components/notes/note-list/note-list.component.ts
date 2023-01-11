import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { FilesService } from 'src/app/services/files.service';
import { NotesService } from 'src/app/services/notes.service';

interface NoteLevel {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
})
export class NoteListComponent implements OnInit {
  levels: NoteLevel[] = [
    { value: 0, viewValue: 'Primary' },
    { value: 1, viewValue: 'High School' },
    { value: 2, viewValue: 'University' },
  ];

  searchText!:string;

  public notes: any = [];
  public users: any = [];

  constructor(
    private notesService: NotesService,
    private toast: NgToastService,
    private fileService: FilesService
  ) {}

  ngOnInit(): void {
    this.notesService.getAllNotes().subscribe({
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
