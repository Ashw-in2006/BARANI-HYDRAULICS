import React from 'react';
import DieCushionResultsComponent from '../components/DieCushionResults';
import { useLocation } from 'react-router-dom';

const DieCushionResultsPage: React.FC = () => {
  const location = useLocation();
  const results = location.state?.results;

  if (!results) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        No results available. Please calculate first.
      </div>
    );
  }

  return <DieCushionResultsComponent results={results} />;
};

export default DieCushionResultsPage; 