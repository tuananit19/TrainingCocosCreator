// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node) canvasNode : cc.Node;

    // ======================= Members ===============================
    public touchStartLoc: cc.Vec2 = null;
    public touchEndLoc: cc.Vec2 = null;

    speed : number = 0; 
    direction : cc.Vec2 = cc.Vec2.ZERO;
   
    // LIFE-CYCLE CALLBACKS:
    onLoad () {

        this.speed = 140;
        this.direction = cc.v2(1, 1);

        this.canvasNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this));
        this.canvasNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove.bind(this));
        this.canvasNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this));
    }

    start () {

    }

    update (dt) {
        this.move();
    }

    move() {
        let dt = cc.director.getDeltaTime();

        this.node.x += this.direction.x * this.speed * dt;
        this.node.y += this.direction.y * this.speed * dt;
    }
    // ======================== Methods ======================================
    public onTouchStart (touch: cc.Event.EventTouch) {
        this.touchStartLoc = touch.getLocation();
    }

    public onTouchMove (touch: cc.Event.EventTouch) {

    }

    public onTouchEnd (touch: cc.Event.EventTouch) {
        this.touchEndLoc = touch.getLocation();

        let touchVec = new cc.Vec2(this.touchEndLoc.x - this.touchStartLoc.x, this.touchEndLoc.y - this.touchStartLoc.y);

        this.direction = touchVec.normalize();
        this.speed = touchVec.mag() * 2;
    }
}
