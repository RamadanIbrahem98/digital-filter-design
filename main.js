const poles = []
const zeros = []
let blankSpace = true

function setup() {
    let cvs = createCanvas(600, 600);
    cvs.style('display', 'block');
    cvs.parent('canvas');
  }

function mousePressed() {
    for(let i = poles.length - 1; i >= 0; i--) {
        if (poles[i].getDestance(mouseX, mouseY)) {
            poles.splice(i, 1);
            blankSpace = false;
        }
    }
    for(let i = zeros.length - 1; i >= 0; i--) {
        if (zeros[i].getDestance(mouseX, mouseY)) {
            zeros.splice(i, 1);
            blankSpace = false;
        }
    }
    if(blankSpace) {
        if(document.getElementById('success-outlined').checked) {
            let newZero = new Zero(mouseX, mouseY);
            zeros.push(newZero);
        } else {
            let newPole = new Pole(mouseX, mouseY);
            zeros.push(newPole);
        }
    }
    blankSpace = true;
}
  
  function draw() {
    background(255);
    noFill()
    ellipse(width/2, height/2, 2 * 250);
    line(0, height/2, width, height/2);
    line(width/2, 0, width/2, height);
    poles.forEach(pole => pole.show());
    zeros.forEach(zero => zero.show());
  }

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 3;
    }

    getDestance(currentX, currentY) {
        let distance = dist(currentX, currentY, this.x, this.y);
        if(distance < this.r) {
            return true;
        }
        return false;
    }

    show() {
        if(this.constructor == Point)
            fill('#0F0');
        else if(this.constructor == Pole)
            fill('#DC3545');
        else
            fill('#198754');
        ellipse(this.x, this.y, this.r * 2);
    }
}

class Pole extends Point {
    constructor(x, y) {
        super(x, y);
    }
}

class Zero extends Point {
    constructor(x, y) {
        super(x, y);
    }
}