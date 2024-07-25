import { Component } from '@angular/core';
import { SvgImgComponent } from '../svg-img/svg-img.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SvgImgComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
