import { Component } from '@angular/core';
import { Contactservices } from '../../services/contactservices';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
 contact = { name: '', email: '', subject: '', message: '' };

  constructor(private contactService: Contactservices) {}

  sendMessage() {
    this.contactService.sendContact(this.contact).subscribe({
      next: (res) => {
        alert('Thank you! Your message has been sent.');
        this.contact = { name: '', email: '', subject: '', message: '' };
      },
      error: (err) => {
        console.error(err);
        alert('Error sending message.');
      }
    });
  }
}
