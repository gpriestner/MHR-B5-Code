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
            console.log(wp);
            const xy = this.toXyPoint(wp);
            points.push(xy);
        }

        view.beginPath();
        view.moveTo(points[3].x, points[3].y);
        view.lineTo(points[0].x, points[0].y);
        view.lineTo(points[1].x, points[1].y);
        view.lineTo(points[2].x, points[2].y);
        view.lineTo(points[3].x, points[3].y);

        view.lineTo(points[7].x, points[7].y);
        view.lineTo(points[4].x, points[4].y);
        view.lineTo(points[5].x, points[5].y);
        view.lineTo(points[6].x, points[6].y);
        view.lineTo(points[7].x, points[7].y);

        view.stroke();
    }
}

const cube = new Cube(-5, -5, 20, 2);

cube.draw();