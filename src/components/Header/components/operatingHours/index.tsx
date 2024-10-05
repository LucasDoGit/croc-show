import styles from './operatinghours.module.css'

export function OperatingHours() {
  const openingTime = 19;  // 9 AM
  const closingTime = 23; // 10 PM
  const currentHour = new Date().getHours();

  const isOpen = currentHour >= openingTime && currentHour < closingTime;

  const bgColor = isOpen ? '#54CC0A' : '#f34e26';

  return (
    <span className={styles.openingHours} style={{backgroundColor: `${bgColor}`}}>Seg á Dom - 19:00 as 23:00</span>
  );
};
