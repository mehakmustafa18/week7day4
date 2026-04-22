'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function MembershipBanner() {
  return (
    <Box>
      {/* Heading */}
      <Typography
        sx={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: { xs: '24px', md: '40px' },
          lineHeight: '100%',
          letterSpacing: 0,
          textTransform: 'uppercase',
          color: '#000',
          ml: { xs: 2, md: 4 },
          mb: 3,
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        More Nike Products
      </Typography>

      {/* Banner */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 1400,
          mx: 'auto',
          height: { xs: 200, md: 324 },
          overflow: 'hidden',
          fontFamily: 'Montserrat, sans-serif',
        }}
      >
        {/* Background Image */}
        <Box
          component="img"
          src="/footer.png"
          alt="Nike Membership Background"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Text Content */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: { xs: 16, md: 48 },
            transform: 'translateY(-50%)',
            color: 'white',
            zIndex: 1,
            maxWidth: { xs: 200, md: 320 },
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: { xs: '18px', md: '40px' },
              lineHeight: '100%',
              letterSpacing: 0,
              color: '#fff',
            }}
          >
            Your Nike <br /> Membership
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: '0.7rem', sm: '0.9rem', md: '0.85rem' },
              color: '#fff',
              mb: 2,
              lineHeight: 1.5,
            }}
          >
            Join our members and show your love with{' '}
            <Box component="span" sx={{ fontWeight: 700 }}>
              Nike By You!
            </Box>
          </Typography>

          <Button
            variant="contained"
            sx={{
              bgcolor: '#000',
              color: '#fff',
              borderRadius: 4,
              fontSize: { xs: '0.65rem', md: '0.75rem' },
              fontWeight: 600,
              px: { xs: 3, md: 5 },
              py: 0.9,
              letterSpacing: '0.05em',
              '&:hover': {
                bgcolor: '#222',
              },
            }}
          >
            Join Us
          </Button>
        </Box>
      </Box>
    </Box>
  );
}