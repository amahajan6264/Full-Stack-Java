import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GlobalhttpserviceService } from '../globalhttpservice.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {


  public jobs: any[] = [];
  public viewDetail: Boolean = false;
  public applyForm: Boolean = false;
  public selectedJob: any;
  public title: any;
  public countries: any;
  public states: any;
  public cities: any;
  public villages: any;
  public selectedCountry: string = '';

  @ViewChild('detailsSection') detailsSection!: ElementRef;
  @ViewChild('applyJobSection') applyJobSection!: ElementRef;
  constructor(private service: GlobalhttpserviceService, private fb: FormBuilder) { }

  public frmSave = this.fb.group({
    name:  this.fb.control('', [Validators.required, Validators.maxLength(30), Validators.minLength(3),Validators.pattern(/^[a-zA-Z ]*$/)]),
    email: this.fb.control('', [Validators.required,Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)]),
    age:   this.fb.control('',[Validators.required,Validators.maxLength(2),Validators.minLength(2)]),
    pincode:this.fb.control('',[Validators.required,Validators.maxLength(6),Validators.minLength(6)]),
    experience:this.fb.control('',[Validators.required]),
    address:this.fb.control('',[Validators.required,Validators.minLength(5)]),
    country:this.fb.control('',[Validators.required]),
    state:this.fb.control('',Validators.required),
    city:this.fb.control('',Validators.required),
    village:this.fb.control('',[Validators.required]),
    resume:this.fb.control('',[Validators.required])
  });

  ngOnInit(): void {
    // Fetch job listings from the backend service
    this.service.getJobs().subscribe(data => {
      this.jobs = data;
    });
  }


  showJobDetails(jobtitle: string) {
    this.selectedJob = this.jobs.find(job => job.title === jobtitle);
    this.viewDetail = true;
    this.applyForm = false;

    // Scroll to the details section
    setTimeout(() => {
      // Now, detailsSection should be defined
      console.log('detailsSection:', this.detailsSection);
      // Use detailsSection as needed
      if (this.detailsSection) {
        this.detailsSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 20);
  }

  applyJobForm(jobtitle: string) {
    // alert("apply job : "+jobtitle)
    this.applyForm = true;
    this.viewDetail = false
    this.title = jobtitle;
    this.service.getCountry().subscribe(data => {
      this.countries = data;
    });
    setTimeout(() => {
      // Now, applyJobSection should be defined
      console.log('applyJobSection:', this.applyJobSection);
      // Use applyJobSection as needed
      if (this.applyJobSection) {
        this.applyJobSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 20);
  }

  displayState(event: any) {
    const keyForTargetValue = Object.keys(this.countries).find(key => this.countries[key] === event.target.value);
    this.service.getState(keyForTargetValue).subscribe(data => {
      this.states = data;
    });
  }
  displayCity(event: any) {
    const keyForTargetValue = Object.keys(this.states).find(key => this.states[key] === event.target.value);
    this.service.getCity(keyForTargetValue).subscribe(data => {
      this.applyForm = true;
      this.cities = data;
    });
  }
  displayVillage(event: any) {
    const keyForTargetValue = Object.keys(this.cities).find(key => this.cities[key] === event.target.value);
    this.service.getVillage(keyForTargetValue).subscribe(data => {
      this.applyForm = true;
      this.villages = data;
    });
  }

  applyJob() {
    alert()
  }

  get name() {
    return this.frmSave.get('name') as FormControl;
  }
  get email() {
    return this.frmSave.get('email') as FormControl;
  }
  get age() {
    return this.frmSave.get('age') as FormControl;
  }
  get pincode() {
    return this.frmSave.get('pincode') as FormControl;
  }
  get experience() {
    return this.frmSave.get('experience') as FormControl;
  }
  get address() {
    return this.frmSave.get('address') as FormControl;
  }
  get country() {
    return this.frmSave.get('country') as FormControl;
  }
  get state() {
    return this.frmSave.get('state') as FormControl;
  }
  get city() {
    return this.frmSave.get('city') as FormControl;
  }
  get village() {
    return this.frmSave.get('village') as FormControl;
  }
  get resume() {
    return this.frmSave.get('resume') as FormControl;
  }
}
