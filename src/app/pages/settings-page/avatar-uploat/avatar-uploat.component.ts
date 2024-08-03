import { Component, signal } from '@angular/core';
import { SvgImgComponent } from '../../../common-ui/svg-img/svg-img.component';
import { DndDirective } from '../../../common-ui/directives/dnd.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-avatar-uploat',
  standalone: true,
  imports: [SvgImgComponent, DndDirective, FormsModule],
  templateUrl: './avatar-uploat.component.html',
  styleUrl: './avatar-uploat.component.scss',
})
export class AvatarUploatComponent {
  previw = signal<string>('/assets/imgs/fake-avatar.png');

  avatar: File | null = null;

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    return this.proceseFile(file);
  }

  onFileDropped(file: File) {
    return this.proceseFile(file);
  }

  proceseFile(file: File | null | undefined) {
    if (!file || !file.type.match('image')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      this.previw.set(event.target?.result?.toString() ?? '');
    };

    reader.readAsDataURL(file);

    this.avatar = file;
  }
}
