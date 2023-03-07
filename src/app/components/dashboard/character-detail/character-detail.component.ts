import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,  
  FormGroup,
  Validators,
} from '@angular/forms';
import { RickAndMortyService } from 'src/app/services/RickAndMorty/rick-and-morty.service';
import { episodeDetail } from 'src/app/models/episodeDetail.model';
import { episodesInfo } from 'src/app/models/episodesInfo.mode';
import { character } from 'src/app/models/characters.model';
@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit {
  idUser: number = 0;
  episodes = [] as any[];
  episodesInfo: episodesInfo[] = [];
  characterDetail: character[] = [];
  episodeDetail: episodeDetail[] = [];
  myForm: FormGroup;
  show_info_episode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private rmService: RickAndMortyService
  ) {
    this.myForm = this.fb.group({
      url: [Validators.required],
    });
    this.idUser = this.aRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getDetail();
  }
  //function to call the service and get the data of each character
  //this function also saves the episode information in an array
  getDetail() {
    this.rmService.getDetailCharacter(this.idUser).then(async (res: any) => {
      res = await res.json();
      this.characterDetail.push(res);
      this.episodes = res.episode;      
      this.episodes.map((element) => {
        this.episodesInfo.push({
          title: element.split('/').splice(4, 2).join(' '),
          url: element,
        });
      });
    });
  }
  //function to call the service to get the data for each episode
  infoEpisode() {
    const URL = this.myForm.get('url')?.value;
    this.episodeDetail = [];
    this.rmService.getEpisode(URL).then(async (res: any) => {
      res = await res.json();
      this.episodeDetail.push(res);
    });
  }
}
