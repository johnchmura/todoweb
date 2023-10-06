import React, { useRef, useEffect, useState, useContext } from 'react';
import pop from '@/public/pop.mp3';
import styles from '@/styles/TodoList.module.css';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserContext } from '../lib/context';
import { db } from '@/lib/firebase';
import ExperienceNotis from './experienceNotis';

function CanvasApp() {
  const {user, username} = useContext(UserContext);
  const canvasRef = useRef(null);
  const circlesRef = useRef([]);
  const [label, setLabel] = useState('');
  const [circleFlag, setCircleFlag] = useState(false);
  const audioRef = useRef(null);

  const [xpNotifications, setXpNotifications] = useState([]);

  async function updateExperiencePoints(points) {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
  
      // Fetch the user's document
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        let currentExperiencePoints = userData.experiencePoints || 0; // Default to 0 if not initialized
  
        // Update the experiencePoints
        currentExperiencePoints += points;
  
        // Update the Firestore document with the new experience points value
        await updateDoc(userDocRef, { experiencePoints: currentExperiencePoints });
      } else {
        console.error('User document does not exist.');
      }
    }
  }
  

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const aspectRatio = 16 / 9; 

    function resizeCanvas() {
      const screenWidth = window.innerWidth;
      const canvasWidth = Math.min(screenWidth, 1000);
      const canvasHeight = canvasWidth / aspectRatio;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      
    }

    
    resizeCanvas();

   
    window.addEventListener('resize', resizeCanvas);

    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

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
        const canvas = canvasRef.current;
        if(canvas != null){
          const ctx = canvas.getContext('2d');
        }
        
      
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      
        // Style for the label text
        ctx.font = '15px Arial'; // Adjust the font size and family as needed
        ctx.fillStyle = 'black'; // Text color
        ctx.textAlign = 'center'; // Center the text horizontally
        ctx.textBaseline = 'middle'; // Center the text vertically
      
        // Draw the label text centered within the circle
        ctx.fillText(this.label, this.x, this.y);
      }

      addMiniCircle(label) {
        // Calculate the number of existing mini circles
        const numMiniCircles = this.minis.length;
      
        // Calculate the angle increment for evenly distributing mini circles
        const angleIncrement = (2 * Math.PI) / (numMiniCircles + 1);
      
        // Calculate the starting angle
        let angle = 0;
      
        // Create and distribute the new mini circle
        const orbitCirc = new MiniCircle(
          this.x + this.distanceFromCenter * Math.cos(angle),
          this.y + this.distanceFromCenter * Math.sin(angle),
          20,
          'red',
          1,
          1,
          label,
          'black',
          this,
          100
        );
      
        // Add the new mini circle to the parent's minis array
        this.minis.push(orbitCirc);
        this.adjustMinis();
        
      }

      adjustMinis() {

        const numMiniCircles = this.minis.length-1;

        const angleIncrement = (2 * Math.PI) / (numMiniCircles + 1);
        
        let angle = 0;

        this.minis.forEach((miniCircle) => {
          miniCircle.angle = angle;
          miniCircle.move(); // Update the position
          angle += angleIncrement;
        });

      }
    }

    class MiniCircle extends MovingCircle {
      constructor(x, y, radius, color, dx = 2, dy = 2,label, Lcolor = 'black', parent = null, distanceFromCenter = 50) {
        super(x, y, radius, color, dx, dy);
        this.distanceFromCenter = distanceFromCenter;
        this.angle = 0;
        this.parent = parent || null;
        this.label = label;
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
        updateExperiencePoints(10);

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
            circle.addMiniCircle(label);
            setLabel('');
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

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default form submission behavior
      newCircle();
    }
  }
  
  function handleCanvasClick(e) {
    if (!e.shiftKey) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      // Check if any mini circle was clicked
      for (const circle of circlesRef.current) {
        // Check if the click is within the mini circle's radius
        for (const miniCircle of circle.minis) {
          const distance = Math.sqrt(
            Math.pow(mouseX - miniCircle.x, 2) + Math.pow(mouseY - miniCircle.y, 2)
          );
          if (distance <= miniCircle.radius) {
            // Remove the mini circle from its parent's minis array
            audioRef.current.play();
            const relativeX = mouseX - miniCircle.x;
            const relativeY = mouseY - miniCircle.y;
            setXpNotifications(prevNotifications => [
              ...prevNotifications,
              { x: e.clientX, y: e.clientY, points: 5 },
              
            ]);

            circle.minis = circle.minis.filter(mc => mc !== miniCircle);
            circle.adjustMinis();
            updateExperiencePoints(5);
            
            return; 
          }
        }
      }
  
      // Check if any main circle was clicked
      for (const circle of circlesRef.current) {
        const distance = Math.sqrt(
          Math.pow(mouseX - circle.x, 2) + Math.pow(mouseY - circle.y, 2)
        );
        if (distance <= circle.radius) {
          if (circle.onClick) {
            if(circle.minis.length == 0){
              circle.onClick();
              setXpNotifications(prevNotifications => [
                ...prevNotifications,
                { x: e.clientX, y: e.clientY, points: 10},
                
              ]);
            }
          }
          break;
        }
      }
    }
  }
  

  return (
    <div className={styles.todo}>
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          width={1200}
          height={600}
          onClick={handleCanvasClick}
        ></canvas>
        {xpNotifications.map((notification, index) => (
          <ExperienceNotis
            key={index}
            x={notification.x}
            y={notification.y}
            points={notification.points}
          />
        ))}
      </div>
      <div className={styles.container}>
        <div>
        <label className={styles.label} htmlFor="labelInput">
          Label:
        </label>
        <input
          type="text"
          id="labelInput"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter label"
        />
        </div>
        <button className={styles.button} onClick={newCircle}>
          Create New Task!
        </button>
        
      </div>
    </div>
  );
}

export default CanvasApp;
