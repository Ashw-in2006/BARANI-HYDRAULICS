import React from 'react';
import MainCylinderResultsComponent from '../components/MainCylinderResults';
import { useLocation } from 'react-router-dom';
import { MainCylinderResults } from '../interfaces/MainCylinderTypes';

const MainCylinderResultsPage: React.FC = () => {
  const location = useLocation();
  const results = location.state?.results as MainCylinderResults;

  if (!results) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        No results available. Please calculate first.
      </div>
    );
  }

  return <MainCylinderResultsComponent results={results} />;
};

export default MainCylinderResultsPage; 