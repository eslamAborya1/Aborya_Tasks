import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './post-form.html',
  styleUrl:'post-form.css'
})

export class PostForm implements OnInit {
 form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      userId: [1]
    });
  }

  cancel() {
  this.router.navigate(['/posts']);
}

  isEdit = false;
  id?: number;
  loading = false;

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = +idParam;
      this.loading = true;
      this.postService.getById(this.id).subscribe({
        next: post => {
          this.form.patchValue({ title: post.title, body: post.body, userId: post.userId ?? 1 });
          this.loading = false;
        },
        error: () => { alert('Error'); this.loading = false; }
      });
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Partial<Post> = this.form.value;

    if (this.isEdit && this.id) {
      this.postService.update(this.id, payload).subscribe({
        next: res => {
          alert('Done Successfully');
          this.router.navigate(['/posts']);
        },
        error: () => alert('Error')
      });
    } else {
      this.postService.create(payload).subscribe({
        next: res => {
          alert('Done Successfully');
          this.router.navigate(['/posts']);
        },
        error: () => alert('Error')
      });
    }
  }
}
