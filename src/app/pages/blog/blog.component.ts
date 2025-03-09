import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  standalone: true, // ✅ Add 'standalone: true' for standalone components
  imports: [CommonModule], // ✅ Correct usage of imports in standalone components
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'], // ✅ Corrected 'styleUrl' to 'styleUrls'
})
export class BlogComponent {
  blogs = [
    {
      title: 'Of acceptance insipidity remarkably is invitation',
      content: 'Together happy feelings continue juvenile hold of one...',
      views: '622 Views',
      comments: '0 Comments',
      readTime: '2 Min Read',
      author: 'Laura Dallas',
      date: '5 months ago',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s',
    },
    {
      title: 'Uneasy no settle when nature narrow in afraid',
      content:
        'Together happy feelings continue juvenile hold of one...Together happy feelings continue juvenile hold of one...Together happy feelings continue juvenile hold of one...Together happy feelings continue juvenile hold of one...Together happy feelings continue juvenile hold of one...Together happy feelings continue juvenile hold of one...Together happy feelings continue juvenile hold of one...Together happy feelings continue juvenile hold of one...Together happy feelings continue juvenile hold of one...Together happy feelings continue juvenile hold of one...Together happy feelings continue juvenile hold of one...',
      views: '2.8K Views',
      comments: '0 Comments',
      readTime: '2 Min Read',
      author: 'William Lewis',
      date: '5 months ago',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s',
    },
    {
      title: 'Insipidity sufficient dispatched any reasonably led ask',
      content: 'Together happy feelings continue juvenile hold of one...',
      views: '1.5K Views',
      comments: '0 Comments',
      readTime: '2 Min Read',
      author: 'William Lewis',
      date: '5 months ago',
      image: 'assets/blog-image-3.png',
    },
  ];
}
