import React, { useState } from 'react';
import FullCalendarComponent from '../components/FullCalendarComponent';

const ReservationPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    console.log('Selected Date:', date);
  };

  const handleReservation = () => {
    if (!selectedDate) {
      console.error('No date selected');
      return;
    }

    const userId = localStorage.getItem('id');
    if (!userId) {
      console.error('User ID is not available');
      return;
    }

  

    const reservationData = {
      utilisateurId: parseInt(userId, 10),
      scooterId: 1, // Exemple de scooterId, à remplacer par la valeur réelle
      date_debut: selectedDate.toISOString(),
      date_fin: selectedDate.toISOString(),
      lieu: 'Paris',
      statut: 'pending',
    };

    console.log('Reservation Data:', reservationData);

    fetch('http://localhost:3000/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(reservationData)
    })
    .then(response => response.json())
    .then(data => console.log('Reservation created:', data))
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Reservation Page</h1>
      <FullCalendarComponent onDateClick={handleDateClick} />
      <button onClick={handleReservation}>Reserve</button>
    </div>
  );
};

export default ReservationPage;
