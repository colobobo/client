import * as Phaser from "phaser";
import MainScene, { RoundMembersArray } from "./scenes/MainScene";
import { Dispatch } from "redux";
import { enums } from "@colobobo/library";
import { selectors } from "../redux";
import Preloader from "./scenes/Preloader";

type PlayersRole = ReturnType<typeof selectors.round.selectPlayersRole>;
type AreaDevices = ReturnType<typeof selectors.area.selectDevices>;

type GameStoreData = {
  dispatch: Dispatch;
  world: enums.World;
  playerId: string;
  playersRole: PlayersRole;
  areaDevices: AreaDevices;
  roundMembersArray: RoundMembersArray;
  isRoundStarted: boolean;
  areaWidth: number;
  areaHeight: number;
  pixelRatio: number;
};

export default class Game extends Phaser.Game {
  mainScene: MainScene;

  pixelRatio: number;
  dispatch: Dispatch;
  playerId: string;
  roundMembersArray: RoundMembersArray;
  isRoundStarted: boolean;
  world: enums.World;
  playersRole: PlayersRole;
  areaDevices: AreaDevices;
  areaHeight: number;
  areaWidth: number;

  constructor(
    config: Phaser.Types.Core.GameConfig,
    gameStoreData: GameStoreData
  ) {
    super(config);

    const {
      dispatch,
      world,
      playerId,
      playersRole,
      areaDevices,
      roundMembersArray,
      isRoundStarted,
      areaWidth,
      areaHeight,
      pixelRatio
    } = gameStoreData;

    this.pixelRatio = pixelRatio;
    this.dispatch = dispatch;
    this.playerId = playerId;
    this.roundMembersArray = roundMembersArray;
    this.isRoundStarted = isRoundStarted;
    this.world = world;
    this.playersRole = playersRole;
    this.areaDevices = areaDevices;
    this.areaWidth = areaWidth;
    this.areaHeight = areaHeight;

    this.scene.add("preloader", Preloader);
    this.mainScene = new MainScene({ ...gameStoreData, game: this });
    this.scene.add("main-scene", this.mainScene);
  }

  // SETTERS

  setDispatch(dispatch: Dispatch) {
    this.dispatch = dispatch;
    this.mainScene.setDispatch(dispatch);
  }

  setPlayerId(playerId: string) {
    this.playerId = playerId;
    this.mainScene.setPlayerId(playerId);
  }

  setRoundMembersArray(roundMembersArray: RoundMembersArray) {
    this.roundMembersArray = roundMembersArray;
    this.mainScene.setRoundMembersArray(roundMembersArray);
    // this.onGameMembersUpdate();
  }

  setWorld(world: enums.World) {
    this.world = world;
    this.mainScene.setWorld(world);
  }

  setPlayersRole(playersRole: PlayersRole) {
    this.playersRole = playersRole;
    this.mainScene.setPlayersRole(playersRole);
  }

  setAreaDevices(areaDevices: AreaDevices) {
    this.areaDevices = areaDevices;
    this.mainScene.setAreaDevices(areaDevices);
  }

  // FUNCTION

  startPreloader() {
    this.scene.start("preloader");
  }

  newRound() {
    console.log("new round");
    this.mainScene.destroy();
    this.mainScene = new MainScene({
      dispatch: this.dispatch,
      areaDevices: this.areaDevices,
      playersRole: this.playersRole,
      world: this.world,
      roundMembersArray: this.roundMembersArray,
      playerId: this.playerId,
      pixelRatio: this.pixelRatio,
      areaHeight: this.areaHeight,
      areaWidth: this.areaWidth,
      isRoundStarted: this.isRoundStarted,
      game: this
    });

    // TODO : update
    setTimeout(() => {
      this.scene.add("main-scene", this.mainScene, true);
    }, 100);
  }

  pause() {
    this.mainScene.scene.pause();
    this.mainScene.matter.pause();
  }

  resume() {
    this.mainScene.scene.resume();
    this.mainScene.matter.resume();
  }
}
