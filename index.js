let ctx, W, H, tiles = [], coords, currentName, alpha=[{letter:" ", index:26}], counter, colors, color;

const {sin, cos, atan2, hypot, random} = Math;

let name = prompt("What's your Name", "Mirielle ?") || "invalid";

for(let i=65, c=0; i <= 90; i++, c++) alpha.push(letter = {letter:String.fromCodePoint(i).toUpperCase(), index:c});

// remove unwanted characters from given name
const nameFilterer = name => {
    let temp = name.toUpperCase();
    let validLetters = [];
    let res = [];
    alpha.forEach(i => validLetters.push(i.letter));
    for(let chr of temp) {
        if (validLetters.includes(chr)) {
            for(let i of alpha) {
                if(chr === i.letter) 
                    res.push(i);
            }
        }
    }
    return res;
}
//get the map of the input name
const getNameMap = name =>{
    let temp = nameFilterer(name);
    let res = [];
    for(let chr of nameFilterer(name))
    res.push(nameMap[chr.index]);
    return res;
}


// get coordinates for each map of the input name
const getCoord = mapArray => {
    let res = [];
    let totalWidth = 0;
    for(let map of mapArray) {
        let width = (map[0].length + 1) * tile.w;
        totalWidth += width;
        res.push(totalWidth); 
    }
    return res;
}

// create each tile of the given name 
const create = mapArray => {
    for(let i=0; i < mapArray.length; i++) {
        let map = mapArray[i];
        for(let r=0; r < map.length; r++) {
        for(let c=0; c < map[r].length; c++) {
            let index = map[r][c];
            let offSet = (i > 0)?coords[i - 1]+tile.w:tile.w;
            let x = offSet + c * tile.w + index;
             let y = H * .5 - map.length * tile.w * .5 + r * tile.h;
                if(index === 0) continue;
                else {
                    tiles.push(new Tile(x, y));
                }
            }
        }
    }
}

class Tile {
    constructor(destX, destY) {
        this.destX = destX;
        this.destY = destY;
        this.w = 12;
        this.h = 12;
        this.origin = [
            {x:-this.w, y:random() * H},
            {x:W + this.w, y:random() * W},
            {x:random() * W, y:-this.h},
            {x:random() * W, y:H + this.h}
        ];
        this.originIndex = ~~(random() * this.origin.length);
        this.x = this.origin[this.originIndex].x;
        this.y = this.origin[this.originIndex].y;
        this.angle = atan2(this.destY - this.y, this.destX - this.x);
        this.vel = random() * (8-6+1)+6;
        this.isActive = true;
    }    
    
    draw() {
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.strokeRect(this.x, this.y, this.w, this.h);  
    }
    
    
    move() {
        if (hypot(this.destX - this.x, this.destY - this.y) < this.w) {
            this.x = this.destX;
            this.y = this.destY;
            this.isActive = false;
        } else {
            this.x += cos(this.angle) * this.vel;
            this.y += sin(this.angle) * this.vel;
        }
            
    }

update() {
        this.draw();
        this.move();
    }
    
    static startAgain() {
      tiles.forEach(tile => {
          tile.x = tile.origin[tile.originIndex].x;
          tile.y = tile.origin[tile.originIndex].y;
          tile.isActive = true;
          color = colors[~~(random() * colors.length)];  
      });
    }
    
}

const nameMap = [
    // a
    [ [0,1,1,0],[1,0,0,1],[1,1,1,1],[1,0,0,1],[1,0,0,1]],
    // b
    [ [1,1,1,1],[1,0,0,1],[1,1,1,0],[1,0,0,1],[1,1,1,1]],
    // c
    [ [0,1,1,1],[1,0,0,0],[1,0,0,0],[1,0,0,0],[0,1,1,1]],
    // d
    [ [1,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,1,1,0]],
    // e
    [ [1,1,1,1],[1,0,0,0],[1,1,1,0],[1,0,0,0],[1,1,1,1]],
    // f
    [ [1,1,1,1],[1,0,0,0],[1,1,1,0],[1,0,0,0],[1,0,0,0]],
    // g
    [ [1,1,1,1],[1,0,0,0],[1,0,1,1],[1,0,0,1],[1,1,1,1]],
    // i
    [ [1,0,0,1],[1,0,0,1],[1,1,1,1],[1,0,0,1],[1,0,0,1]],
    // j
    [ [1,1,1],[0,1,0],[0,1,0],[0,1,0],[1,1,1]],
    // k
    [ [0,0,0,1],[0,0,0,1],[0,0,0,1],[1,0,0,1],[1,1,1,1]],
    // l
    [ [1,0,0,1],[1,0,1,0],[1,1,0,0],[1,0,1,0],[1,0,0,1]],
    // m
    [ [1,0,0],[1,0,0],[1,0,0],[1,0,0],[1,1,1]],
    // n
    [ [1,1,1,1,0],[1,0,1,0,1],[1,0,1,0,1],[1,0,1,0,1],[1,0,1,0,1]],
  [ [1,0,0,0,1],[1,1,0,0,1],[1,0,1,0,1],[1,0,0,1,1],[1,0,0,0,1]],
    // p
    [ [0,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[0,1,1,0]],
    // q
    [ [1,1,1,0],[1,0,0,1],[1,0,0,1],[1,1,1,0],[1,0,0,0]],
    // r
    [ [0,1,1,0,0],[1,0,0,1,0],[1,0,0,1,0],[1,0,0,1,0],[0,1,1,0,1]],
    // s
    [ [1,1,1,1],[1,0,0,1],[1,0,0,1],[1,1,1,0],[1,0,0,1]],
    // t
    [ [0,1,1],[1,0,0],[1,1,1],[0,0,1],[1,1,0]],
    // u
    [ [1,1,1],[0,1,0],[0,1,0],[0,1,0],[0,1,0]],
    // v
    [ [1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[0,1,1,0]],
    // w
    [ [1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0]],
    // x
    [ [1,0,1,0,1],[1,0,1,0,1],[1,0,1,0,1],[1,0,1,0,1],[0,1,1,1,0]],
    // y
    [ [1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1]],
    // y
    [ [1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
    // z
    [ [1,1,1,1], [0,0,0,1], [0,1,1,0], [1,0,0,0],[1,1,1,1]],
    // blank space    
    [[0],[0],[0],[0]]
];

const tile = { w: 10, h: 10};

const update = () => {
    // current drawing color
    ctx.strokeStyle = "#222"; 
    ctx.fillStyle = color;
    tiles.forEach(tile => tile.update());
    // if all tiles stopped moving, wait sometimes then animate again
    if(tiles.every(tile => !tile.isActive)) {
        counter++;
        if(counter >= 80) {
            counter = 0;
            Tile.startAgain();
        }
    } else counter = 0;
    
}


const animate = () => {
    ctx.clearRect(0, 0, W, H);
    update();
    requestAnimationFrame(animate);
}

const eventHandler = () => {
    ctx.canvas.addEventListener("mousedown", () => Tile.startAgain());
    ctx.canvas.addEventListener("touchstart", () => Tile.startAgain());
}

const init = () => {
    ctx = document.getElementById("cvs").getContext("2d");
    W = ctx.canvas.width = innerWidth;
    H = ctx.canvas.height = innerHeight;

    colors = ["teal", "red", "navy", "lightskyblue", "orange", "pink",
    "green", "yellow", "purple", "indigo", "violet", "#986552", "#245032"];
    color = colors[~~(random() * colors.length)];
    
    counter = 0;
    currentName = getNameMap(name);
    coords = getCoord(currentName);
    create(currentName);    
    requestAnimationFrame(animate);
    
    eventHandler();
}

addEventListener("load", init);