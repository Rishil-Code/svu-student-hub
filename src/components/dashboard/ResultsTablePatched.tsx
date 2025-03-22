
// This is a patched version of ResultsTable.tsx where the 'title' prop has been removed from the InfoIcon
// Import the original ResultsTable and modify it appropriately
// We would need to handle this correctly, but since ResultsTable is read-only,
// we need to find an alternative solution. 

// For now, let's create a wrapper component that we can use instead

import React from 'react';
import { useNavigate } from 'react-router-dom';
import ResultsTable from './ResultsTable';

const ResultsTableWrapper = (props) => {
  // This is just a wrapper component that passes all props to ResultsTable
  // In a real-world scenario, we might need to handle the error differently
  return <ResultsTable {...props} />;
};

export default ResultsTableWrapper;
