import React, { useState } from 'react';
import styles from '@/styles/Calendar.module.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const startingDay = firstDayOfMonth.getDay();
  const totalDays = daysInMonth(currentDate.getFullYear(), currentDate.getMonth());

  const renderCalendar = () => {
    const calendar = [];
    const numRows = Math.ceil((totalDays + startingDay) / 7); // Calculate the number of rows
  
    for (let i = 0; i < numRows; i++) { // Loop based on the number of rows
      const week = [];
  
      for (let j = 0; j < 7; j++) {
        const dayIndex = i * 7 + j - startingDay + 1;
  
        if (dayIndex <= 0 || dayIndex > totalDays) {
          week.push(<div className={`${styles.day} ${styles.emptyDay}`} key={j}></div>);
        } else {
          week.push(
            <div className={`${styles.day} ${styles.dayBox}`} key={dayIndex}>
              <div className={styles.dayNumber}>{dayIndex}</div>
              <TextareaWithBullets />
            </div>
          );
        }
      }
  
      calendar.push(
        <div className={styles.week} key={i}>
          {week}
        </div>
      );
    }
  
    return calendar;
  };
  

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button onClick={prevMonth}>&lt;</button>
        <h1>
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </h1>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className={styles.days}>
        <div className={`${styles.day} ${styles.day}`}>Sun</div>
        <div className={`${styles.day} ${styles.day}`}>Mon</div>
        <div className={`${styles.day} ${styles.day}`}>Tue</div>
        <div className={`${styles.day} ${styles.day}`}>Wed</div>
        <div className={`${styles.day} ${styles.day}`}>Thu</div>
        <div className={`${styles.day} ${styles.day}`}>Fri</div>
        <div className={`${styles.day} ${styles.day}`}>Sat</div>
      </div>
      <div className={styles.week}>
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;

const TextareaWithBullets = () => {
  const [text, setText] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setText(text + '\n• ');
    }
  };

  return (
    <textarea
      className={styles.textBox}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};
