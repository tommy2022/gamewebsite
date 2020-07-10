class SpaceInvader extends Game {
    constructor(ctx, canvas, ctx_back, player) {
        super(ctx, canvas.width, canvas.height, player);
        this.ctx_back = ctx_back;
    }
    
    update_frame() {
        super.drawMatrix(this.player.matrix, this.player.pos, "#87CEEB");
    }
}