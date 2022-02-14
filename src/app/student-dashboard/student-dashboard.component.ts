import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { StudentModel } from './student.module';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

    studentValue!:FormGroup
  studentObj:StudentModel =new StudentModel;

  studentList:any=[];

   btnsaveShow:boolean = true;
   btnUpdateShow:boolean = false;

  constructor(private formBuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
      this.studentValue = this.formBuilder.group({
        name:[''],
        class:[''],
        email:[''],
        mobile:[''],
      })
      this.getStudent();
  }

  AddStudent(){
            // debugger;
            
            this.studentObj.name=this.studentValue.value.name;
            this.studentObj.class=this.studentValue.value.class;
            this.studentObj.email=this.studentValue.value.email;
            this.studentObj.mobile=this.studentValue.value.mobile;

            this.api.postStudent(this.studentObj).subscribe({next:(v)=>{
              console.log(v)
            },
            error:(e)=>{
              console.log(e)
            },
            complete:()=>{
              console.log('Student Added Successfull')
              console.log("student Record Add")
              this.getStudent();
              this.studentValue.reset();
            }})
  }
        getStudent(){
              this.api.getStudent().subscribe(res =>{
                this.studentList =res;
              })
        }

        editStudent(data:any){
        this.studentValue.controls["name"].setValue(data.name);
        this.studentValue.controls["class"].setValue(data.class);
        this.studentValue.controls["email"].setValue(data.email);
        this.studentValue.controls["mobile"].setValue(data.mobile);

        this.showUpdate();
        this.studentObj.id =data.id

     
      
    }

   

        deleteStudent(data:any){
          this.api.deleteStudent(data.id).subscribe({next:(v) =>{
            console.log(v)
          },
          complete:()=>{
            console.log('Student Delete Successfull')
            console.log("student Record")
            this.getStudent();
        
          }}
          )
    }

    UpdateStudent(){
      this.studentObj.name=this.studentValue.value.name;
      this.studentObj.class=this.studentValue.value.class;
      this.studentObj.email=this.studentValue.value.email;
      this.studentObj.mobile=this.studentValue.value.mobile;
     // this.studentObj.id = this.studentValue.value.id;

      this.api.putStudent(this.studentObj,this.studentObj.id).subscribe({next:(v)=>{
        console.log(v)
      },
      error:(e)=>{
        console.log(e)
      },
      complete:()=>{
        console.log('Student Updated Successfully')
        console.log("student Record Update")
        this.getStudent();
        this.studentValue.reset();
        this.showSave();
        this.studentObj.id = 0;
      }})

    }
  showSave(){
    this.btnsaveShow = true;
    this.btnUpdateShow= false;
 
  }
  showUpdate(){
    this.btnsaveShow = false;
    this.btnUpdateShow= true;
 
  }

}
