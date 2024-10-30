"use client"
import styles from './operatinghours.module.css'

export function OperatingHours() {
  const currentHour = new Date().getHours();
  const currentDay = new Date().getDay();
  
  let openingTime = 20;
  let closingTime = 1;
  let operatingDaysText = "Seg á Sex";

  if(currentDay === 0 || currentDay === 6){
    openingTime = 11
    closingTime = 22
    operatingDaysText = "Sab e Dom";
  }

  const isOpen = (currentHour >= openingTime && currentHour < 24) || (currentHour >= 0 && currentHour < closingTime);

  const bgColor = isOpen ? '#54CC0A' : '#f34e26';

  return (
    <span className={styles.openingHours} style={{backgroundColor: `${bgColor}`}}>{operatingDaysText} - {openingTime}:00 as {closingTime}:00</span>
  );
};
