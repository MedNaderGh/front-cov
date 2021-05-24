import { UserService } from "src/app/pages/user.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-profil",
  templateUrl: "./profil.page.html",
  styleUrls: ["./profil.page.scss"],
})
export class ProfilPage implements OnInit {
  customerRating: any;
  show: boolean = true;
  profilid: any;
  constructor(
    private user: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.profilid = this.route.snapshot.queryParams["page"];
  }
  cmnt: any;
  comment: any;
  commentForm: FormGroup;
  ngOnInit() {
    if (this.profilid === this.user.getUserPayload()._id) {
      this.show = false;
    }
    this.commentForm = this.formBuilder.group({
      commentaire: ["", [Validators.maxLength(70), Validators.required]],
      rate: ["", [Validators.required]],
    });
    this.getcomment(this.profilid);
  }
  getcomment(id) {
    this.user.getcomment(id).subscribe(
      (data) => {
        this.cmnt = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  commenter(form) {
    this.comment = {
      Comment: form.get("commentaire").value,
      rate: this.customerRating,
      id_user: this.profilid,
      name_user: this.user.getUserPayload().fullName,
      commenter_id: this.user.getUserPayload()._id,
    };
    this.user.commenter(this.comment).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        console.log("erreur");
      }
    );
  }
}
