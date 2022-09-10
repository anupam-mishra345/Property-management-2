import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Intellitick-Property-Management';
  properties: any;
  form!: FormGroup;

  @ViewChild('modal', { static: false }) modal!: ElementRef;

  constructor(private renderer: Renderer2, private apiService: ApiService){
    this.createForm();
  }

  async ngOnInit(){
    const response = await this.apiService.getProperties();  
    console.log("ngOnInit response: ", response);
    this.properties = response;
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      size: new FormControl("", [Validators.required])
    });
  }
  
  async addProperty(formValue: any){
    const resp = await this.apiService.createProperty(formValue);
    console.log("resp: ", resp);
    this.properties = resp;
    this.closeModal();
  }

  openModal(){
    this.renderer.addClass(this.modal.nativeElement, 'show')
  }

  closeModal(){
    this.form.reset();
    // reset the errors of all the controls
    for (let name in this.form.controls) {
      this.form.controls[name].setErrors(null);
    }
    this.renderer.removeClass(this.modal.nativeElement, 'show');
  }

  async deleteProperty(id:any){
    const response = await this.apiService.deleteProperty(id)
    this.properties = response;
  }
}
