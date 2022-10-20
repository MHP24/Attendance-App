import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { alertToast } from '../../helpers/alertHandler';
import { PostI } from 'src/app/interfaces/post.interface';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {
  forumForm!: FormGroup;
  data: PostI[];
  currentId: number;
  constructor(
    private readonly formBuilder:FormBuilder,
    private readonly api: ApiService,
    private readonly toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadPosts();
    this.forumForm = this.initForm();
    this.api.postTrigger.subscribe(({ title, body, id }) => {
      this.currentId = id;
      this.forumForm = this.initForm(title, body);
    })
  }

  loadPosts() {
    this.api.getUsers().subscribe(users => {
      this.api.getPosts().subscribe(posts => {
        this.data = posts.map(({ userId, ...props }) => {
          const { name } = users.find(({ id }) => {
            return(id === userId);
          });
          return {username: name, ...props};
        });
        this.data.reverse();
      });
    });
  }

  initForm(_title: string='', _content: string=''): FormGroup {
    return this.formBuilder.group({
      title: [_title, [Validators.required]],
      content: [_content, [Validators.required]]
    });
  }

  onSubmit() {
    if(this.forumForm.invalid) return;
    const { value } = this.forumForm;
    if(!this.currentId) {
      this.api.createPost(value).subscribe((res) => {
        alertToast(`Publicación creada con éxito.`, this.toastController);
      });
    } else {
      this.api.updatePost({id:this.currentId, ...value}).subscribe(({ id }) => {
        alertToast(`Publicación #${id} actualizada con éxito.`, this.toastController);
      });
    }
    this.forumForm = this.initForm();
    this.currentId = undefined;
  }
}

