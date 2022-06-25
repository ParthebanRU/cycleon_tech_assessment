import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameId = 0;
  pits: any;
  kalahP1 = 0;
  kalahP2 = 0;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.pits = [];
    this.gameService.checkForActiveGame().subscribe((res: any) => {
      let game = res.body.game;
      if(res.status === 200) {
        this.gameId = game.id;
        this.formPits(game);
      }
    });
  }

  createGame(): void {
    this.gameService.createGame().subscribe((res: any) => this.gameId = res.id);
  }

  formPits(game: any) {
    this.kalahP1 = game.players[0].pits.find((obj: any) => {
      return obj.type === 'KALAH';
    }).seedCount;
    this.kalahP2 = game.players[1].pits.find((obj: any) => {
      return obj.type === 'KALAH';
    }).seedCount;
    for(let i=0; i < 6; i++ ) {
      this.pits.push({'p1': game.players[0].pits[i].seedCount, 'p2':game.players[1].pits[i].seedCount});
    }
  }

}
