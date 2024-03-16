import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface CoinSelectorProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  options: { value: string; label: string }[];
}

const CoinSelector: React.FC<CoinSelectorProps> = ({ id, label, value, onChange, options }) => {
  return (
    <FormControl sx={{ width: '240px', mb: 2 }}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={value}
        label={label}
        onChange={onChange}
        variant="outlined"
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CoinSelector;
