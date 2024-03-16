import React from 'react';
import { Button, ButtonGroup } from '@mui/material';

interface DashboardTypeSwitcherProps {
	onChange: (type: 'staker' | 'beginner') => void;
  }

const DashboardTypeSwitcher: React.FC<DashboardTypeSwitcherProps> = ({ onChange }) => {
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ marginBottom: '20px' }}>
      <Button onClick={() => onChange('staker')} sx={{ m: 2 }}>Staker</Button>
      <Button onClick={() => onChange('beginner')} sx={{ m: 2 }}>Beginner</Button>
    </ButtonGroup>
  );
};

export default DashboardTypeSwitcher;
