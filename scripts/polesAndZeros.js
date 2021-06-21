const poles = [];
const zeros = [];
const CircleNumbersX = [];
const CircleNumbersY = [];
const PolesX = [];
const PolesY = [];
const Distances = [];
let blankSpace = true;
let xaxis;
let yaxis;

for (let i = 0; i <= 3.14516; i = i + 0.01) {
    CircleNumbersX.push(Math.cos(i));
    CircleNumbersY.push(Math.sin(i));
}

function setup() {
    let cvs = createCanvas(600, 600);
    cvs.style("display", "block");
    cvs.parent("canvas");
    xaxis = width / 2;
    yaxis = height / 2;
}

function mousePressed() {
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
    console.log({
        "x: ": poles[poles.length - 1].x,
        "y: ": poles[poles.length - 1].y
    });
    Getter();
}

function Mapper(input, input_start, input_end, output_start, output_end) {
    var slope = (output_end - output_start) / (input_end - input_start);
    var output = output_start + slope * (input - input_start);
    return output;
}

function Getter() {
    document.getElementById("demo").innerHTML = Mapper(
        poles[poles.length - 1].x,
        50,
        550, -1,
        1
    );
    PolesX.push(Mapper(poles[poles.length - 1].x, 50, 550, -1, 1));
    PolesY.push(Mapper(poles[poles.length - 1].y, 50, 550, -1, 1));
    GraphData();
}

function GraphData() {
    console.log(CircleNumbersX.length);
    console.log(CircleNumbersY.length);
    for (let i = 0; i < 315; i++) {
        Distances.push(
            Math.sqrt(
                Math.pow(
                    Mapper(poles[poles.length - 1].x, 50, 550, -1, 1) - CircleNumbersX[i],
                    2
                ) +
                Math.pow(
                    Mapper(poles[poles.length - 1].y, 50, 550, -1, 1) -
                    CircleNumbersY[i],
                    2
                )
            )
        );
    }

    for (let i = 0; i < 315; i++) {
        console.log(Distances[i]);
    }
    console.log(Distances.length);
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