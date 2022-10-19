import { Component, OnInit, Input } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { alertToast } from 'src/app/helpers/alertHandler';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-forum-card',
  templateUrl: './forum-card.component.html',
  styleUrls: ['./forum-card.component.scss'],
})
export class ForumCardComponent implements OnInit {
  @Input() posts: any;
  constructor(
    private readonly api: ApiService,
    private readonly toastController: ToastController
  ) { }

  ngOnInit() {
  }

  deletePost({id}) {
    this.api.deletePost(id).subscribe(() => {
      alertToast(`Publicación #${id} Eliminada correctamente`, this.toastController);
    })
  }

  editPost(post: any) {
    this.api.postTrigger.emit(post);
  }
}
