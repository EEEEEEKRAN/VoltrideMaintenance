import React from 'react';
import IncidentForm from '../components/IncidentForm';

const IncidentPage: React.FC = () => {
  return (
    <div>
      <h1>Signaler un Incident</h1>
      <IncidentForm />
    </div>
  );
};

export default IncidentPage;
