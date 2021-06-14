const poles = []
const zeros = []
let blankSpace = true;
let xaxis;
let yaxis;


function setup() {
    let cvs = createCanvas(600, 600);
    cvs.style('display', 'block');
    cvs.parent('canvas');
    xaxis = width / 2;
    yaxis = height / 2;
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
        const createConjugate = document.getElementById('create-conjugate').checked;
        if(document.getElementById('new-pole').checked) {
            let newZero = new Zero(mouseX, mouseY, createConjugate);
            zeros.push(newZero);
        } else {
            let newPole = new Pole(mouseX, mouseY, createConjugate);
            zeros.push(newPole);
        }
    }
    blankSpace = true;
}
  
  function draw() {
    background(255);
    noFill()

    ellipse(xaxis, yaxis, 2 * 250);
    line(0, yaxis, width, yaxis);
    line(xaxis, 0, xaxis, height);
    poles.forEach(pole => pole.show());
    zeros.forEach(zero => zero.show());
  }

class Point {
    constructor(x, y, drawConjugate) {
        this.x = x;
        this.y = y;
        this.r = 3;
        this.isConjugated = drawConjugate
        if(this.isConjugated) {
            this.xdash = this.x
            this.ydash = 2 * yaxis - this.y
        }
    }

    getDestance(currentX, currentY) {
        let distance = dist(currentX, currentY, this.x, this.y);
        let distance2 = Infinity
        if(this.isConjugated) {
            distance2 = dist(currentX, currentY, this.xdash, this.ydash);
        }
        
        if(distance < this.r || distance2 < this.r) {
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
        if(this.xdash) {
            ellipse(this.xdash, this.ydash, this.r * 2)
        }
    }
}

class Pole extends Point {
    constructor(x, y, drawConjugate) {
        super(x, y, drawConjugate);
    }
}

class Zero extends Point {
    constructor(x, y, drawConjugate) {
        super(x, y, drawConjugate);
    }
}