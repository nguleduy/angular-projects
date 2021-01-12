import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {FlashService} from './services/flash.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('flashForm', {static: false}) flashForm: NgForm;
  editing = false;
  editingId;
  flash = {
    question: '',
    answer: ''
  };
  flashs$;

  constructor(private flashService: FlashService) {
    this.flashs$ = this.flashService.flashs$;
  }

  trackByFlashId(index, flash): number {
    return flash.id;
  }

  handleSubmit(): void {
    this.flashService.addFlash(this.flash);
    this.handleClear();
  }

  handleClear(): void {
    this.flash = {
      question: '',
      answer: '',
    };
    this.flashForm.reset();
  }

  handleToggleCard(id): void {
    this.flashService.toggleFlash(id);
  }

  handleDelete(id): void {
    this.flashService.deleteFlash(id);
  }

  handleEdit(id): void {
    this.flash = this.flashService.getFlash(id);
    this.editing = true;
    this.editingId = id;
  }

  handleUpdate(): void {
    this.flashService.updateFlash(this.editingId, this.flash);
    this.handleCancel();
  }

  handleCancel(): void {
    this.editing = false;
    this.editingId = undefined;
    this.handleClear();
  }

  handleRememberedChange({id, flag}): void {
    this.flashService.rememberedChange(id, flag);
  }

}
