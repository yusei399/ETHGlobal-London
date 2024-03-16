import React from 'react';
import { FormControl, InputAdornment, MenuItem, Select, TextField, SelectChangeEvent } from '@mui/material';

interface QuantityInputWithCoinSelectProps {
  id: string;
  value: string;
  quantity: string;
  onQuantityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCoinChange: (event: SelectChangeEvent<string>) => void; 
  coinOptions: { value: string; label: string }[];
}

const QuantityInputWithCoinSelect: React.FC<QuantityInputWithCoinSelectProps> = ({
  id,
  value,
  quantity,
  onQuantityChange,
  onCoinChange,
  coinOptions, 
}) => (
  <TextField
    label="Quantity"
    variant="outlined"
    fullWidth
    value={quantity}
    onChange={onQuantityChange}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <FormControl variant="standard">
            <Select
              labelId={`${id}-select-label`}
              id={`${id}-select`}
              value={value}
              onChange={onCoinChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {coinOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </InputAdornment>
      ),
    }}
  />
);

export default QuantityInputWithCoinSelect;
