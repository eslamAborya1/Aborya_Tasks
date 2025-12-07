import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  postId: string = '';
  title: string = '';
  body: string = '';
  result: any = {};

  constructor(private http: HttpClient) {}

  createPost() {
    if (!this.title || !this.body) {
      alert('Please enter title and body');
      return;
    }

    const postData = {
      title: this.title,
      body: this.body,
      userId: 1
    };

    this.http.post('https://jsonplaceholder.typicode.com/posts', postData)
      .subscribe(response => {
        this.result = response;
      });
  }

  readPost() {
    if (!this.postId) {
      alert('Enter Post ID');
      return;
    }

    this.http.get(`https://jsonplaceholder.typicode.com/posts/${this.postId}`)
      .subscribe(response => {
        this.result = response;
      });
  }

  updatePost() {
    if (!this.postId || !this.title || !this.body) {
      alert('Enter Post ID, Title and Body');
      return;
    }

    const postData = {
      id: this.postId,
      title: this.title,
      body: this.body,
      userId: 1
    };

    this.http.put(`https://jsonplaceholder.typicode.com/posts/${this.postId}`, postData)
      .subscribe(response => {
        this.result = response;
      });
  }

  deletePost() {
    if (!this.postId) {
      alert('Enter Post ID');
      return;
    }

    this.http.delete(`https://jsonplaceholder.typicode.com/posts/${this.postId}`)
      .subscribe(() => {
        this.result = { status: 200, message: 'Deleted successfully' };
      });
  }
}
