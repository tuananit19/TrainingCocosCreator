import {GameState} from './GameDefine';
import BallControl from './BallControl';
import PlayControl from './PlayControl';
import GameSetting from './GameSetting';
import Level from './Level';

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameController extends cc.Component {

  @property(cc.Prefab)
  prefabBall : cc.Prefab = null;

  @property(cc.Prefab)
  prefabPlayer : cc.Prefab = null;

  @property(cc.Node)
  gameSetting:cc.Node = null;

  guiNode : cc.Node = null;

  layer_MainMenu : cc.Node;
  // layer_Playing : cc.Node;

  state : GameState = GameState.None;
  
  ballNode: cc.Node = null;
  playerNode: cc.Node = null;

  currentLevel: number = 1;
  // LIFE-CYCLE CALLBACKS:
  onLoad () {
      cc.log('onload')
  }
  
  winSizeW: number = 0;
  winSizeH: number = 0;
  start() {
    this.winSizeW = cc.winSize.width;
    this.winSizeH = cc.winSize.height;

    this.guiNode = this.node.parent.getChildByName("GUIManager");
    this.layer_MainMenu = this.guiNode.getChildByName("MainMenu");
    // this.layer_Playing = this.guiNode.getChildByName("PlayNode");

    this.init ();
  }

  init() {
    this.layer_MainMenu.active = true;  
    // this.layer_Playing.active = false;
    this.state = GameState.MainMenuGame;
    this.layer_MainMenu.getChildByName("btnPlay").on(cc.Node.EventType.TOUCH_START, this.startGame.bind(this));
  }

  startGame() {
    this.layer_MainMenu.active = false;  
    // this.layer_Playing.active = true;
    this.addLevel(this.currentLevel);
    this.addPlayer();
    this.addBall();
  }  

  addLevel(level) {
    var levelPrefab = this.gameSetting.getComponent(GameSetting).listLevel[level];
    var obj = cc.instantiate(levelPrefab);
    var level = obj.getComponent(Level);
    level.setCollisionCallback(this.playerCollistionCallback.bind(this));
    this.node.addChild(obj);
  }

  addBall() {
    var obj =  cc.instantiate(this.prefabBall);
    var ball = obj.getComponent(BallControl);
    obj.x = this.playerNode.x;
    obj.y = this.playerNode.y + ball.node.height/2 + this.playerNode.height/2;
    ball.speed = this.gameSetting.getComponent(GameSetting).speed;
    // ball.addCollistionCallback(this.collistionCallback.bind(ball));
    this.node.addChild(obj);
    this.ballNode = obj;
  }

  addPlayer() {
    var objP =  cc.instantiate(this.prefabPlayer);
    objP.x = this.winSizeW/2;
    objP.y = objP.height/2;

    var player = objP.getComponent(PlayControl);
    player.setCollisionCallback(this.playerCollistionCallback.bind(this));
    this.node.addChild(objP);

    this.playerNode = objP;
  }

  playerCollistionCallback() {
    var ball = this.ballNode.getComponent(BallControl);
    ball.changeDirectionByCollistion(false); // TODO check dir by horizontal
  }
}