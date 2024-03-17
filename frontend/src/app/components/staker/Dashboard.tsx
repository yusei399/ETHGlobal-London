"use client";

import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, useMediaQuery, useTheme, SelectChangeEvent } from '@mui/material';
import ConnectWallet from '../auth/Wallet';
import DashboardTypeSwitcher from './DashboardTypeSwitcher';
import QuantityInputWithCoinSelect from './QuantityInputWithCoinSelect';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [coin1, setCoin1] = useState<string>('');
  const [quantity1, setQuantity1] = useState('');
  const [coin2, setCoin2] = useState<string>('');
  const [quantity2, setQuantity2] = useState('');
  const [dashboardType, setDashboardType] = useState<'staker' | 'beginner'>('staker');
  const [coinOptions, setCoinOptions] = useState([
    { value: 'ETH', label: 'ETH' },
    { value: 'World Coin', label: 'World Coin' }
  ]);

  const handleDashboardTypeChange = (type: 'staker' | 'beginner') => {
    setDashboardType(type);
    const newCoinOptions = type === 'staker'
      ? [{ value: 'ETH', label: 'ETH' }, { value: 'World Coin', label: 'World Coin' }]
      : [{ value: 'World Coin', label: 'World Coin' }, { value: 'ETH', label: 'ETH' }];
    setCoinOptions(newCoinOptions);
  };

  return (
    <main style={{ position: 'relative', height: '100vh', padding: '20px' }}>
      <Box sx={{ position: 'absolute', top: 0, right: 0, padding: '20px' }}>
        <ConnectWallet />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
        <DashboardTypeSwitcher onChange={handleDashboardTypeChange} />
        <Card sx={{
            width: isDesktop ? '40%' : '100%',
            maxWidth: '500px',
            transition: '0.3s',
        }}>
          <CardHeader title={dashboardType === 'staker' ? "Staker" : "Beginner"} titleTypographyProps={{ align: 'center', variant: 'h4' }} />
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="flex-end" gap={2}>
            <QuantityInputWithCoinSelect
              id="coin-quantity-1"
              value={coin1}
              quantity={quantity1}
              onQuantityChange={(e) => setQuantity1(e.target.value)}
              onCoinChange={(e: SelectChangeEvent<string>) => setCoin1(e.target.value)}
              coinOptions={coinOptions}
            />
            <QuantityInputWithCoinSelect
              id="coin-quantity-2"
              value={coin2}
              quantity={quantity2}
              onQuantityChange={(e) => setQuantity2(e.target.value)}
              onCoinChange={(e: SelectChangeEvent<string>) => setCoin2(e.target.value)} 
              coinOptions={coinOptions}
            />
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  display: 'block',
                  width: '100%',
                  mx: 'auto',
                  borderRadius: '20px',
                }}
              >
                Confirm
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </main>
  );
}

export default Dashboard;
