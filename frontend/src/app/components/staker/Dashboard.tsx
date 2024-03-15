"use client";
import React, { useState } from 'react';
import { Card, Box, CardHeader, CardContent, Button, useTheme, useMediaQuery, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ConnectWallet from '../auth/Wallet';

const Dashboard = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [coin1, setCoin1] = useState(''); 
  const [coin2, setCoin2] = useState('');

  const handleChange1 = (event:any) => {
    setCoin1(event.target.value);
  };

  const handleChange2 = (event:any) => {
    setCoin2(event.target.value);
  };

  return (
    <main style={{ position: 'relative', height: '100vh', padding: '20px' }}>
      <Box sx={{ position: 'absolute', top: 0, right: 0, padding: '20px' }}>
        <ConnectWallet />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Card sx={{
          width: isDesktop ? '70%' : '100%',
          maxWidth: '1000px',
          transition: '0.3s',
        }}>
          <CardHeader title="Stake!" titleTypographyProps={{ align: 'center', variant: 'h4' }} />
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <FormControl sx={{ width: '240px', mb: 2 }}>
                <InputLabel id="coin-select-label-1">Choose a coin</InputLabel>
                <Select
                  labelId="coin-select-label-1"
                  id="coin-select-1"
                  value={coin1}
                  label="Choose a coin"
                  onChange={handleChange1}
                  variant="outlined"
                >
                  <MenuItem value="ETH">ETH</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ width: '240px' }}>
                <InputLabel id="coin-select-label-2">Choose another coin</InputLabel>
                <Select
                  labelId="coin-select-label-2"
                  id="coin-select-2"
                  value={coin2}
                  label="Choose another coin"
                  onChange={handleChange2}
                  variant="outlined"
                >
                  <MenuItem value="World Coin">World Coin</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                display: 'block',
                width: '40%',
                mx: 'auto',
                borderRadius: '20px',
              }}
            >
              Confirm
            </Button>
          </CardContent>
        </Card>
      </Box>
    </main>
  );
}

export default Dashboard;
