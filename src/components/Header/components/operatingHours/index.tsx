"use client"
import { useEffect, useState } from 'react';
import styles from './operatinghours.module.css'

export function OperatingHours() {
    const [openingTime, setOpeningTime] = useState("20");
    const [closingTime, setClosingTime] = useState("00");
    const [operatingDaysText, setOperatingDaysText] = useState("Seg á Sex");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const currentHour = new Date().getHours();
        const currentDay = new Date().getDay();
        const isOpen = (currentHour >= Number(openingTime) && currentHour < 24) || (currentHour >= 0 && currentHour < Number(closingTime));
        setIsOpen(isOpen)

        if (currentDay === 0) {
          setIsOpen(false)
        } else if (currentDay === 6){
          setOpeningTime("16")
          setClosingTime("22")
          setOperatingDaysText("Sábado")
        }
    }, [])

    return (
        <span
          className={styles.openingHours}
          style={{ 
              backgroundColor: isOpen ? "#32CD32" : "#FF0000", 
              fontWeight: 500,
          }}>
            {operatingDaysText} - {openingTime}:00 as {closingTime}:00
        </span>
    );
};
