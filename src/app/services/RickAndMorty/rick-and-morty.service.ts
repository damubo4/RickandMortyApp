import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  constructor() {}

  url = 'https://rickandmortyapi.com/api/character/';

  //function to obtain all characters
  getCharacters(page: number) {
    return fetch(this.url + '?page=' + page).then();
  }
  //function to obtain the detail of a character
  getDetailCharacter(id: number) {
    return fetch(this.url + id).then();
  }
  //function to obtain the data of each episode
  getEpisode(url: string) {
    return fetch(url);
  }
}
