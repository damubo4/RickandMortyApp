import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from 'src/app/services/RickAndMorty/rick-and-morty.service';
import { character } from 'src/app/models/characters.model';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent implements OnInit {
  characters: character[] = [];
  info: any;
  page: number = 1;
  maxPage: number = 0;
  previousButton: boolean = true;
  nextButton: boolean = false;

  constructor(private rmService: RickAndMortyService) {}

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    this.rmService.getCharacters(this.page).then(async (res: any) => {
      res = await res.json();
      const { info, results } = res;
      this.info = { ...info };
      this.maxPage = this.info.pages;
      this.characters = [...results];
    });
  }

  pagination(page: number) {
    if (page <= 1) {
      this.page = 1;
      this.previousButton = true;
    } else {
      this.previousButton = false;
    }

    if (page >= this.maxPage) {
      this.page = this.maxPage;
      this.nextButton = true;
    } else {
      this.nextButton = false;
    }
    this.getCharacters();
    window.scroll(0, 0);
  }
}
