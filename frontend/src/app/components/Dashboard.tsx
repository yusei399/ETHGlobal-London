"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Button, Typography, useTheme, useMediaQuery, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Dashboard = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [coin, setCoin] = useState('ETH'); 

  const stakeDetails = {
    availableToVote: 0,
    lockedBalance: 0,
    alreadyStaked: 0,
    remainingLockedBalance: 0,
    totalStake: 0,
  };

  const handleChange = (event:any) => {
    setCoin(event.target.value);
  };

  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px' }}>
      <Card sx={{
        width: isDesktop ? '70%' : '100%', 
        maxWidth: '1000px', 
        mx: 'auto', 
        transition: '0.3s',
      }}>
        <CardHeader title="Stake!" titleTypographyProps={{ align: 'center', variant: 'h4' }} />
        <CardContent>
          <FormControl fullWidth margin="normal">
            <InputLabel id="coin-select-label">Choose a coin</InputLabel>
            <Select
              labelId="coin-select-label"
              id="coin-select"
              value={coin}
              label="Choose a coin"
              onChange={handleChange}
              variant="outlined"
            >
              <MenuItem value="ETH">ETH</MenuItem>
            </Select>
          </FormControl>
          <Card variant="outlined" sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="body1" gutterBottom>
                Available to vote: {stakeDetails.availableToVote} {coin}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Locked balance: {stakeDetails.lockedBalance} {coin}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Already staked: {stakeDetails.alreadyStaked} {coin}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Remaining locked balance: {stakeDetails.remainingLockedBalance} {coin}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Total stake: {stakeDetails.totalStake} {coin}
              </Typography>
            </CardContent>
          </Card>
          <Button variant="contained" sx={{ marginTop: 2, display: 'block', width: '100%' }}>
            Confirm
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}

export default Dashboard;
