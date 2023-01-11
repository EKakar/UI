import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { ApiService } from 'src/app/services/api.service';
import { FilesService } from 'src/app/services/files.service';
import { NotesService } from 'src/app/services/notes.service';

interface NoteLevel {
  value: number;
  viewValue: string;
}
interface Category {
  categoryId: number;
  categoryName: string;
}
@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
})
export class AddNoteComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;

  levels: NoteLevel[] = [
    { value: 0, viewValue: 'Primary' },
    { value: 1, viewValue: 'High School' },
    { value: 2, viewValue: 'University' },
  ];

  public categories: any[] = [];

  shortLink: string = '';
  loading: boolean = false;

  addNoteForm!: FormGroup;

  userObj = sessionStorage['user'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private noteService: NotesService,
    private fileService: FilesService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.addNoteForm = this.fb.group({
      noteId: [0],
      description: ['', Validators.required],
      noteLevel: [0, Validators.required],
      category: [0, Validators.required],
      ratingScore: [0],
      userId: [1],
    });

    this.api.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
        for (let i = 1; i < this.categories.length; i++) {
          this.categories[i - 1].categoryId = i;
        }
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  public ChangeFile(evt: any) {
    console.log(evt.target.files[0]);
    let file = evt.target.files[0];

    if (file.size <= 100000) {
      this.fileService.uploadFile(file).subscribe({
        next: (res) => {
          alert(res.message);
        },
        error: (err) => {
          alert(err?.error.message);
        },
      });
    } else {
      alert('File size causes overload maximum 1mb file can be uploaded');
    }
  }

  addNote() {
    if (this.addNoteForm.valid) {
      console.log(this.addNoteForm.value);

      this.noteService.addNote(this.addNoteForm.value).subscribe({
        next: (res) => {
          alert(res.message);
          this.router.navigate(['note']);
        },
        error: (err) => {
          alert(err?.error.message);
        },
      });
    } else {
      alert('Please enter all values correctly');
      ValidateForm.validateAllFormFields(this.addNoteForm);
    }
  }
}
