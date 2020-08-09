class Items {
    constructor(x_pos, y_pos, arena) {
        this.arena = arena;
        this.y = y_pos;
        this.x_count = 0;
        const rand = Math.random() * 3 | 0;
        if (rand == 0) {
            this.item_name = "diagnal";
            this.matrix = Items.diagnal;
        }
        else if (rand == 1) {
            this.item_name = "double";
            this.matrix = Items.double;
        }
        else if (rand == 2) {
            this.item_name = "large";
            this.matrix = Items.large;
        }
        this.x = x_pos - this.matrix.length / 2 | 0;
        this.draw();
        
        if (Math.random() < 0.5) {
            this.dir = 1;
        }
        else {
            this.dir = -1;
        }
    }
    
    check_item(x_pos, y_pos) {
        if (this.x < x_pos && this.x + this.matrix[0].length > x_pos
            && this.y < y_pos && this.y + this.matrix.length > y_pos) {
                return true;
            }
        return false;
    }
    
    draw() {
        this.matrix.forEach((row, y) => {
            row.forEach((number, x) => {
                if (this.y + y < canvas_fore.height && this.x + x < canvas_fore.width) {
                   this.arena[this.y + y][this.x + x] = number;
                }
            });
        });
    }
    
    update() {
        if (this.y >= canvas_fore.height - 2) {
            return false;
        }
        if (this.x_count == 1) {
            if (Math.random() < 0.05) {
                this.dir *= -1;
            }
            this.x += this.dir;
            this.x_count = 0;
        }
        else {
            this.x_count = 1;
        }
        this.y++;
        

        if (this.x >= canvas_fore.width || this.x < 0) {
            this.dir *= -1;
            this.x += this.dir;
        }
        this.draw();
        return true;
    }
    
}

Items.chance = 0.2;

Items.diagnal = [
        [-10, -10, -10, -10, -10, -10, -10],
        [-10, -10, -10, -11, -10, -10, -10],
        [-11, -10, -10, -11, -10, -10, -11],
        [-10, -11, -10, -11, -10, -11, -10],
        [-10, -10, -11, -11, -11, -10, -10],
        [-10, -10, -10, -11, -10, -10, -10],
        [-10, -10, -10, -10, -10, -10, -10],
     ];
Items.double = [
        [-10, -10, -11, -10, -11, -10, -10],
        [-10, -10, -11, -10, -11, -10, -10],
        [-10, -10, -11, -10, -11, -10, -10],
        [-10, -10, -11, -10, -11, -10, -10],
        [-10, -10, -11, -10, -11, -10, -10],
        [-10, -10, -11, -10, -11, -10, -10],
        [-10, -10, -11, -10, -11, -10, -10],
     ];

Items.large = [
        [-10, -10, -10, -10, -10, -10, -10],
        [-10, -10, -10, -10, -10, -10, -10],
        [-10, -10, -10, -10, -10, -10, -10],
        [-10, -11, -11, -11, -11, -11, -10],
        [-10, -11, -11, -11, -11, -11, -10],
        [-10, -10, -10, -10, -10, -10, -10],
        [-10, -10, -10, -10, -10, -10, -10],
    ];