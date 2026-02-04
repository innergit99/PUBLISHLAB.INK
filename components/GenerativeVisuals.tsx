import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

// Use a global or ref to persist nodes across renders
let globalNodes: any[] = [];

export const NeuralNetworkBackground: React.FC = () => {
    const canvasRef = React.useRef<p5Types | null>(null);
    const nodesRef = React.useRef<Node[]>([]);
    const linkDist = 180; // Increased for better full-page spiderweb look

    class Node {
        x: number;
        y: number;
        vx: number;
        vy: number;
        p5: p5Types;

        constructor(p5: p5Types) {
            this.p5 = p5;
            this.x = p5.random(p5.width);
            this.y = p5.random(p5.height);
            this.vx = p5.random(-0.4, 0.4);
            this.vy = p5.random(-0.4, 0.4);
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > this.p5.width) this.vx *= -1;
            if (this.y < 0 || this.y > this.p5.height) this.vy *= -1;
        }

        draw() {
            // Invisible nodes, just lines for the plexus look
            this.p5.noStroke();
            this.p5.fill(99, 102, 241, 120);
            this.p5.circle(this.x, this.y, 2.5);
        }
    }

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
        canvasRef.current = p5;

        // Initialize nodes if they don't exist
        if (nodesRef.current.length === 0) {
            for (let i = 0; i < 60; i++) { // Increased density
                nodesRef.current.push(new Node(p5));
            }
        }
    };

    const draw = (p5: p5Types) => {
        p5.clear();

        const nodes = nodesRef.current;
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].update();
            nodes[i].draw();

            for (let j = i + 1; j < nodes.length; j++) {
                let d = p5.dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                if (d < linkDist) {
                    let alpha = p5.map(d, 0, linkDist, 120, 0); // Higher visibility
                    p5.stroke(99, 102, 241, alpha);
                    p5.strokeWeight(1.2);
                    p5.line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                }
            }
        }
    };

    const windowResized = (p5: p5Types) => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };

    return <Sketch setup={setup} draw={draw} windowResized={windowResized} className="fixed inset-0 pointer-events-none z-0" />;
};


export const GenerativeBrain: React.FC = () => {
    let t = 0;

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(300, 300).parent(canvasParentRef);
    };

    const draw = (p5: p5Types) => {
        p5.clear();
        p5.translate(p5.width / 2, p5.height / 2);

        p5.noFill();
        p5.stroke(99, 102, 241); // Indigo
        p5.strokeWeight(1.5);

        for (let i = 0; i < 20; i++) {
            p5.beginShape();
            for (let a = 0; a < p5.TWO_PI; a += 0.1) {
                let r = 50 + 30 * p5.noise(Math.cos(a) + 1, Math.sin(a) + 1, t + i * 0.1);
                let x = r * Math.cos(a);
                let y = r * Math.sin(a);
                p5.vertex(x, y);
            }
            p5.endShape(p5.CLOSE);
        }

        t += 0.01;
    };

    return <Sketch setup={setup} draw={draw} className="w-full h-full" />;
};
