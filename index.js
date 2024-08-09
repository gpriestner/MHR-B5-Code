console.log("working");

const canvas = document.querySelector("canvas");
const view = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    view.translate(canvas.width / 2, canvas.height / 2);
    view.scale(1, -1);
    view.lineWidth = 5;
}
resize();

// view.beginPath();
// view.moveTo(0, 0);
// view.lineTo(100, 100);
// view.stroke();

class Pt {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Cube {
    model = [
        new Pt(-1, 1, -1), // top-left front
        new Pt(1, 1, -1), // top-right front
        new Pt(1, -1, -1),  // bottom-right front
        new Pt(-1, -1, -1), // bottom-left front

        new Pt(-1, 1, 1), // top-left front
        new Pt(1, 1, 1), // top-right front
        new Pt(1, -1, 1),  // bottom-right front
        new Pt(-1, -1, 1), // bottom-left front

    ]
    constructor(x, y, z, s) {
        this.scale = s;
        this.position = { x, y, z};
    }
    toWorldPoint(p) {
        const wp = { x: this.position.x + p.x * this.scale, 
                     y: this.position.y + p.y * this.scale,
                     z: this.position.z + p.z * this.scale };
        return wp;
    }
    toXyPoint(p) {
        const xy = { x: p.x / p.z * canvas.width, y: p.y / p.z * canvas.width };
        return xy;
    }
    draw() {
        const points = [];
        for (const p of this.model) {
            const wp = this.toWorldPoint(p);
            //console.log(wp);
            const xy = this.toXyPoint(wp);
            points.push(xy);
        }

        view.beginPath();
        this.moveTo(points[3]);
        this.lineTo(points[0]);
        this.lineTo(points[1]);
        this.lineTo(points[2]);
        this.lineTo(points[3]);

        this.moveTo(points[7]);
        this.lineTo(points[4]);
        this.lineTo(points[5]);
        this.lineTo(points[6]);
        this.lineTo(points[7]);

        this.moveTo(points[0]);
        this.lineTo(points[4]);
        this.moveTo(points[1]);
        this.lineTo(points[5]);
        this.moveTo(points[2]);
        this.lineTo(points[6]);
        this.moveTo(points[3]);
        this.lineTo(points[7]);


        view.stroke();
    }
    moveTo(p) { view.moveTo(p.x, p.y); }
    lineTo(p) { view.lineTo(p.x, p.y); }
}

const cube = new Cube(-3, -3, 20, 2);

const gui = new dat.GUI();
gui.add(cube.position, "x", -20, 20);
gui.add(cube.position, "y", -20, 20);
gui.add(cube.position, "z", 1, 50);



function animate() {
    view.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height); 
    cube.draw();
    requestAnimationFrame(animate);
}

animate();