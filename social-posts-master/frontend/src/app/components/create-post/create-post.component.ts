import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormControl, FormGroup, Validators, NgForm } from "@angular/forms";

import { first } from "rxjs/operators";

import { Post } from "src/app/models/Post";

import { AuthService } from "src/app/services/auth.service";
import { PostService } from "src/app/services/post.service";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.scss"],
})
export class CreatePostComponent implements OnInit {
  @ViewChild("formDirective") formDirective: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();

  form: FormGroup;

  isOpen = false;

  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.form = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      department: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
      section: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
      description: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
      notes: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  onSubmit(formData: Pick<Post, "name" | "department" | "section" | "description" | "notes">): void {
    this.postService
      .createPost(formData, this.authService.userId)
      .pipe(first())
      .subscribe(() => {
        this.create.emit(null);
      });
    this.form.reset();
    this.formDirective.resetForm();
  }
}
