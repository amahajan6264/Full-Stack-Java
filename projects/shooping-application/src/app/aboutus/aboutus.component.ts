import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Aboutformdata } from '../aboutformdata';
import { GlobalhttpserviceService } from '../globalhttpservice.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  namesite: string = "Java with Akshay";
  public data: Aboutformdata = new Aboutformdata('', '', '');
  public submitted = false;
  constructor(private fb: FormBuilder, private service: GlobalhttpserviceService) { }
  saveResponse: string = '';
  ngOnInit(): void {
  }

  public frmSave = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required]),
    message: this.fb.control('', [Validators.required])
  });

  // save about form data
  save(frm: any) {
    const formValues = this.frmSave.value;
    this.data = new Aboutformdata(formValues.name as string,
      formValues.email as string, formValues.message as string)
    //call service method
    this.service.saveaboutform(this.data)
      .subscribe(response => {
        this.saveResponse = `Your message is send succesfully with this id [` + response + `]`;
        this.submitted = true;
      },
        (error) => {
          this.saveResponse = `Sorry we are not able to store the your data server issue`;
        }
      );
    //reset the form
    this.frmSave.reset();
    //remove the message from scren
    setTimeout(() => {
      this.submitted = false;
    }, 3000);
  }

  get name() {
    return this.frmSave.get('name') as FormControl;
  }

  get email() {
    return this.frmSave.get('email') as FormControl;
  }

  get message() {
    return this.frmSave.get('message') as FormControl;
  }
}
