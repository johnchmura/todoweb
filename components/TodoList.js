import React, { useRef, useEffect, useState } from 'react';
import pop from '@/public/pop.mp3';
import styles from '@/styles/TodoList.module.css';

function CanvasApp() {
  const canvasRef = useRef(null);
  const circlesRef = useRef([]);
  const [label, setLabel] = useState('');
  const [circleFlag, setCircleFlag] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      circlesRef.current.forEach(circle => {
        circle.move();
        circle.animateOrbit();
      });
      requestAnimationFrame(animate);
    }
    animate();
    
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    audioRef.current = new Audio(pop);

    class MovingCircle {
      constructor(x, y, radius, color, dx = 2, dy = 2, label = '', Lcolor = 'white') {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = dx >= 0.5 ? -1 : 1;
        this.dy = dy >= 0.5 ? -1 : 1;
        this.label = label;
        this.minis = [];
        this.onClick = null; // Callback function to handle click events
        this.onContextMenu = null;
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
        this.minis.forEach(childCircle => {
          childCircle.move();
        });
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

      addMiniCircle() {
        const orbitCirc = new MiniCircle(this.x, this.y, 20, 'red', 1, 1, 'lol', 'black', this, 100);
        this.minis.push(orbitCirc);
      }
    }

    class MiniCircle extends MovingCircle {
      constructor(x, y, radius, color, dx = 2, dy = 2, label = '', Lcolor = 'white', parent = null, distanceFromCenter = 50) {
        super(x, y, radius, color, dx, dy, label, Lcolor);
        this.distanceFromCenter = distanceFromCenter;
        this.angle = 0;
        this.parent = parent || null;
      }

      move() {
        this.angle += 0.02;
        this.x = this.parent.x + this.distanceFromCenter * Math.cos(this.angle);
        this.y = this.parent.y + this.distanceFromCenter * Math.sin(this.angle);
        this.draw();
      }
    }
    
    function createCircle() {
      const newCircle = new MovingCircle(
        Math.random() * 200 + 400,
        Math.random() * 200 + 150,
        50,
        'blue',
        Math.random(),
        Math.random(),
        label
      );

      newCircle.onClick = () => {
        circlesRef.current = circlesRef.current.filter(circle => circle !== newCircle);
        audioRef.current.play();
      };

      newCircle.onContextMenu = (e) => {
        e.preventDefault(); // Prevent the default context menu
        newCircle.addMiniCircle(); // Add a mini circle when right-clicked
      };

      circlesRef.current.push(newCircle);
      setLabel('');
    }

    if (circleFlag) {
      createCircle();
      setCircleFlag(false);
    }

    function handleShiftClick(e) {
      if (!e.shiftKey) return;
      e.preventDefault();
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      for (const circle of circlesRef.current) {
        const distance = Math.sqrt(
          Math.pow(mouseX - circle.x, 2) + Math.pow(mouseY - circle.y, 2)
        );
        if (distance <= circle.radius) {
          if (circle.addMiniCircle) {
            circle.addMiniCircle();
          }
          break;
        }
      }
    }

    // Attach the event listener to the document
    document.addEventListener("mousedown", handleShiftClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleShiftClick);
    };
    
  }, [circleFlag, label]);

  function newCircle() {
    setCircleFlag(true);
  }

  function handleCanvasClick(e) {
    if (!e.shiftKey) {
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
    }
  }

  return (
    <div>
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          onClick={handleCanvasClick}
        ></canvas>
      </div>
      <div className="styles.input-container">
        <label className="styles.input-label" htmlFor="labelInput">
          Label:
        </label>
        <input
          type="text"
          id="labelInput"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Enter label"
        />
        <button className="styles.create-button" onClick={newCircle}>
          Create New Task!
        </button>
      </div>
    </div>
  );
}

export default CanvasApp;
