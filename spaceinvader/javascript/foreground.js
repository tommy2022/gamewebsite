class Foreground {
    constructor(fore_ctx, fore_dim, player_arena, enemy_arena) {

        this.context = fore_ctx;
        this.dim = fore_dim;
        
        this.items = {
          effects: {
            double: false,
            diagnal: false,
            large: false,
          },
          time: {
            double: 0,
            diagnal: 0,
            large: 0,
          },
        };
        
        this.player_arena = player_arena;
        this.enemy_arena = enemy_arena;
        
        this.counter = 0;
        //this.spaceship = new Spaceship();
        this.enemies = new Enemy();
    }
    update() {
        this.spaceship.update();
        this.enemy.update();
    }
    
    draw() {
        this.enemy.draw();
        this.spaceship.draw();
        this.draw_arena();
    }
    
    draw_arena() {
        
    }
    
    collide() {
        
    }
}

