const poles = [];
const zeros = [];

const CircleNumbersX = [];
const CircleNumbersY = [];

const PolesX = [];
const PolesY = [];
const TheX_Axis = [];
let Distances = [];
let phases = [];
const Distances2 = [];
const phases2 = [];
let Distances3 = [];
let phases3 = [];

const MuliOfDistances = new Array(315);
const MuliOfPhases = new Array(315);
const DivsionOfDistances = new Array(315);
const MuliOfPhasesOfZeros = new Array(315);

let blankSpace = true;
let xaxis;
let yaxis;

function setup() {
    let cvs = createCanvas(600, 600);
    cvs.style("display", "block");
    cvs.parent("canvas");
    xaxis = width / 2;
    yaxis = height / 2;

    for (let i = 0; i <= 3.14516; i = i + 0.01) {
        CircleNumbersX.push(Math.cos(i));
        CircleNumbersY.push(Math.sin(i));
        TheX_Axis.push(i.toFixed(3));
    }
}

function mousePressed() {
    if(mouseX > width || mouseY > height) 
    {
        return;
    }
    for (let i = poles.length - 1; i >= 0; i--) {
        if (poles[i].getDestance(mouseX, mouseY)) {
            poles.splice(i, 1);
            blankSpace = false;
        }
    }
    for (let i = zeros.length - 1; i >= 0; i--) {
        if (zeros[i].getDestance(mouseX, mouseY)) {
            zeros.splice(i, 1);
            blankSpace = false;
        }
    }
    if (blankSpace) {
        const createConjugate = document.getElementById("create-conjugate").checked;
        if (document.getElementById("new-pole").checked) {
            let newPole = new Pole(mouseX, mouseY, createConjugate);
            poles.push(newPole);
        } else {
            let newZero = new Zero(mouseX, mouseY, createConjugate);
            zeros.push(newZero);
        }
    }
    blankSpace = true;
    Getter();
}

function Mapper(input, input_start, input_end, output_start, output_end) {
    var slope = (output_end - output_start) / (input_end - input_start);
    var output = output_start + slope * (input - input_start);
    return output;
}

function Getter() {
    const pointX = Mapper(poles[poles.length - 1].x, 50, 550, -1, 1);
    const pointY = Mapper(poles[poles.length - 1].y, 50, 550, -1, 1);
    document.getElementById("demo").innerHTML = pointX + " +j " + pointY;
    PolesX.push(pointX);
    PolesY.push(pointY);
    GraphData();
}

function GraphData() {
    for (let j = 0; j < poles.length; j++) {
        MuliOfDistances[j] = [];
        MuliOfPhases[j] = [];
        for (let i = 0; i < 315; i++) {
            let pointX = Mapper(poles[j].x, 50, 550, -1, 1) - CircleNumbersX[i];
            let pointY = Mapper(poles[j].y, 50, 550, -1, 1) - CircleNumbersY[i];
            MuliOfDistances[j].push(
                Math.sqrt(Math.pow(pointX, 2) + Math.pow(pointY, 2))
            );
            pointX = Mapper(poles[j].x, 50, 550, -1, 1) - CircleNumbersX[i];
            pointY = Mapper(poles[j].y, 50, 550, -1, 1) - CircleNumbersY[i];
            MuliOfPhases[j].push(
                Math.atan(pointY / pointX)
            );
        }
      }
    
      for (let j = 0; j < zeros.length; j++) {
        DivsionOfDistances[j] = [];
        MuliOfPhasesOfZeros[j] = [];
        for (let i = 0; i < 315; i++) {
            let pointX = Mapper(zeros[j].x, 50, 550, -1, 1) - CircleNumbersX[i];
            let pointY = Mapper(zeros[j].y, 50, 550, -1, 1) - CircleNumbersY[i];
            DivsionOfDistances[j].push(
                Math.sqrt(Math.pow(pointX, 2) + Math.pow(pointY, 2))
            );
            pointX = Mapper(zeros[j].x, 50, 550, -1, 1) - CircleNumbersX[i];
            pointY = Mapper(zeros[j].y, 50, 550, -1, 1) - CircleNumbersY[i];
            MuliOfPhasesOfZeros[j].push(
                Math.atan(pointY / pointX)
            );
        }
      }
    
      var sum = [];
      var sum2 = [];
      var sum3 = [];
      var sum4 = [];
    
      for (let K = 0; K < 315; K++) {
        sum.push(1);
        sum3.push(1);
        sum2.push(0);
        sum4.push(0);
      }
      for (let j = 0; j < poles.length; j++) {
        Distances3 = [];
        phases3 = [];
        for (let i = 0; i < 315; i++) {
          sum[i] = sum[i] * MuliOfDistances[j][i];
          sum2[i] = sum2[i] + MuliOfPhases[j][i];
    
          Distances3.push(sum[i]);
          phases3.push(sum2[i]);
        }
      }

      for (let j = 0; j < zeros.length; j++) {
        Distances2 = [];
        phases2 = [];
        for (let i = 0; i < 315; i++) {
          sum3[i] = sum3[i] * DivsionOfDistances[j][i];
          sum4[i] = sum4[i] + MuliOfPhasesOfZeros[j][i];
          Distances2.push(sum3[i]);
          phases2.push(sum4[i]);
        }
      }
      Distances = [];
      phases = [];
    for (let i = 0; i < 315; i++) {
        if (zeros.length === 0) {
            Distances.push(Distances3[i]);
            phases.push(phases3[i]);
        }
        if (poles.length === 0) {
            Distances.push(parseFloat(1 / Distances2[i]));
            phases.push(phases2[i] * -1);
        }
        if (zeros.length !== 0 && poles.length !== 0) {
            Distances.push(parseFloat(Distances3[i] / Distances2[i]));
            phases.push(phases3[i] - phases2[i]);
        }
    }
    mousePressed2();
    mousePressed3();
}

function draw() {
    background(255);
    noFill();

    ellipse(xaxis, yaxis, 2 * 250);
    line(0, yaxis, width, yaxis);
    line(0, 0, width, 0);
    line(0, 0, 0, height);
    line(width, 0, width, height);
    line(0, height, width, height);
    line(xaxis, 0, xaxis, height);
    poles.forEach((pole) => pole.show());
    zeros.forEach((zero) => zero.show());
}

class Point {
    constructor(x, y, drawConjugate) {
        this.x = x;
        this.y = y;
        this.r = 3;
        this.isConjugated = drawConjugate;
        if (this.isConjugated) {
            this.xdash = this.x;
            this.ydash = 2 * yaxis - this.y;
        }
    }

    getDestance(currentX, currentY) {
        let distance = dist(currentX, currentY, this.x, this.y);
        let distance2 = Infinity;
        if (this.isConjugated) {
            distance2 = dist(currentX, currentY, this.xdash, this.ydash);
        }

        if (distance < this.r || distance2 < this.r) {
            return true;
        }
        return false;
    }

    show() {
        if (this.constructor == Point)
            throw new Error("This Class Cannot be instantiated");
        else if (this.constructor == Pole) fill("#DC3545");
        else fill("#198754");
        ellipse(this.x, this.y, this.r * 2);
        if (this.xdash) {
            ellipse(this.xdash, this.ydash, this.r * 2);
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

// export {};