import React, { useState, useEffect } from 'react';
import { Reservation } from '../models/reservation'; 

const IncidentForm: React.FC = () => {
  const [description, setDescription] = useState('');
  const [dateSignalement, setDateSignalement] = useState('');
  const [gravite, setGravite] = useState('');
  const [reservationId, setReservationId] = useState('');
  const [reservations, setReservations] = useState<Reservation[]>([]); 

  const userId = localStorage.getItem('userId');
  console.log('User ID:', userId); 

  useEffect(() => {
    if (!userId) {
      console.error('User ID is not available');
      alert('Veuillez vous connecter pour signaler un incident.');
      return;
    }

    const fetchReservations = async () => {
      try {
        const response = await fetch(`http://localhost:3000/reservations/user/${userId}`);
        const data: Reservation[] = await response.json(); // Typage explicite
        setReservations(data);
        console.log('Reservations:', data); // Ajoutez ce log pour vérifier les réservations
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, [userId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const incidentData = {
      description,
      date_signalement: new Date(dateSignalement).toISOString(),
      gravite,
      reservationId: parseInt(reservationId, 10),
    };

    try {
      const response = await fetch('http://localhost:3000/incidents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(incidentData),
      });

      const data = await response.json();
      console.log('Incident created:', data);
      alert('Incident signalé avec succès!');
    } catch (error) {
      console.error('Error:', error);
      alert('Erreur lors de la création de l\'incident.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Date de Signalement:</label>
        <input
          type="datetime-local"
          value={dateSignalement}
          onChange={(e) => setDateSignalement(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Gravité:</label>
        <input
          type="text"
          value={gravite}
          onChange={(e) => setGravite(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Réservation:</label>
        <select
          value={reservationId}
          onChange={(e) => setReservationId(e.target.value)}
          required
        >
          <option value="" disabled>Sélectionnez une réservation</option>
          {reservations.map((reservation) => (
            <option key={reservation.id} value={reservation.id}>
              {new Date(reservation.date_debut).toLocaleString()} - {reservation.lieu}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Signaler un Incident</button>
    </form>
  );
};

export default IncidentForm;
