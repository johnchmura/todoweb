// src/components/CanvasApp.js

import React, { useRef, useEffect, useState } from 'react';

function CanvasApp() {
  const canvasRef = useRef(null);
  const circlesRef = useRef([]);
  const [label, setLabel] = useState('');
  const [circleFlag, setCircleFlag] = useState(false);


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const circle of circlesRef.current) {
        circle.move();
        circle.animateOrbit();
      }
      requestAnimationFrame(animate);
    }
    animate();
    
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    class MovingCircle {
      constructor(x, y, radius, color, dx = 2, dy = 2, label = '', Lcolor = 'white') {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
        this.label = label;
        this.minis = [];
        this.onClick = null; // Callback function to handle click events
      }

      move() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
          this.dx *= -1;
        }
        if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
          this.dy *= -1;
        }

        this.draw();
      }

      animateOrbit() {
        for (const childCircle of this.minis) {
          childCircle.move();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = 'black';
        ctx.fillText(this.label, this.x, this.y);
      }
    }

    function createCircle() {
      const newCircle = new MovingCircle(400, 400, 50, 'blue', 2, 2, label);
      newCircle.onClick = () => {
        // Remove the clicked circle from the state
        circlesRef.current = circlesRef.current.filter((circle) => circle !== newCircle);
      };
      circlesRef.current.push(newCircle);
      setLabel('');
    }
    if (circleFlag) {
      createCircle();
      setCircleFlag(false);
    }

  }, [circleFlag, label]);

  function newCircle() {
    setCircleFlag(true);
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onClick={(e) => {
          const canvas = canvasRef.current;
          const rect = canvas.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          
          for (const circle of circlesRef.current) {
            const distance = Math.sqrt(
              Math.pow(mouseX - circle.x, 2) + Math.pow(mouseY - circle.y, 2)
            );
            if (distance <= circle.radius) {
              
              if (circle.onClick) {
                circle.onClick();
              }
              break; 
            }
          }
        }}
      ></canvas>
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Enter label"
      />
      <button onClick={newCircle}>Create New Task!</button>
    </div>
  );
}

export default CanvasApp;
