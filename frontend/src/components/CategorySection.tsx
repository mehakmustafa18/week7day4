'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

const categories = [
  {
    name: 'WORKOUT',
    position: 'left',
    imgSrc: '/buy (1).gif',
  },
  {
    name: 'RUN',
    position: 'right',
    imgSrc: '/buy (2).gif',
  },
  {
    name: 'FOOTBALL',
    position: 'left',
    imgSrc: '/buy (3).gif',
  },
];

export default function CategorySection() {
  return (
    <Box sx={{ py: { xs: 3, md: 4 }, px: { xs: 0, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
      
      {/* Heading */}
      <Typography
        sx={{
          px: { xs: 2, md: 0 },
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: { xs: '1.5rem', md: '40px' },
          lineHeight: '100%',
          mb: { xs: 2, md: 4 },
        }}
      >
        Buy by category
      </Typography>

      {/* Categories */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {categories.map((cat) => (
          <Box key={cat.name}>
            {/* MOBILE: full-width image with text overlay */}
            <Box
              sx={{
                display: { xs: 'block', md: 'none' },
                position: 'relative',
                height: 160,
                overflow: 'hidden',
                cursor: 'pointer',
                mb: 0,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  bgcolor: 'black',
                  opacity: 0.25,
                  zIndex: 1,
                }}
              />
              <Box
                component="img"
                src={cat.imgSrc}
                alt={cat.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <Typography
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  fontStyle: 'italic',
                  fontSize: '28px',
                  letterSpacing: '0.3em',
                  color: 'white',
                  zIndex: 2,
                  whiteSpace: 'nowrap',
                  textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                }}
              >
                {cat.name}
              </Typography>
            </Box>

            {/* DESKTOP: original split grid layout */}
            <Box
              sx={{
                display: { xs: 'none', md: 'grid' },
                gridTemplateColumns: '1fr 1fr',
                height: 280,
                cursor: 'pointer',
                '&:hover .overlay': { opacity: 0.15 },
              }}
            >
            {cat.position === 'left' ? (
              <>
                {/* LEFT TEXT */}
                <Box
                  sx={{
                    bgcolor: 'white',
                    position: 'relative',
                    border: '1px solid #e0e0e0',
                    borderRight: 'none',
                  }}
                >
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',

                      width: { xs: '180px', md: '270px' },
                      height: '44px',

                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 700,
                      fontStyle: 'italic',
                      fontSize: { xs: '20px', md: '36px' },
                      lineHeight: '100%',
                      letterSpacing: '0.3em',
                      textAlign: 'center',
                    }}
                  >
                    {cat.name}
                  </Typography>
                </Box>

                {/* RIGHT IMAGE */}
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <Box
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: 'black',
                      opacity: 0,
                      transition: '0.3s',
                      zIndex: 1,
                    }}
                  />
                  <Box
                    component="img"
                    src={cat.imgSrc}
                    alt={cat.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </Box>
              </>
            ) : (
              <>
                {/* LEFT IMAGE */}
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <Box
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: 'black',
                      opacity: 0,
                      transition: '0.3s',
                      zIndex: 1,
                    }}
                  />
                  <Box
                    component="img"
                    src={cat.imgSrc}
                    alt={cat.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </Box>

                {/* RIGHT TEXT */}
                <Box
                  sx={{
                    bgcolor: 'white',
                    position: 'relative',
                    border: '1px solid #e0e0e0',
                    borderLeft: 'none',
                  }}
                >
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '106px',
                      height: '44px',
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 700,
                      fontStyle: 'italic',
                      fontSize: '36px',
                      lineHeight: '100%',
                      letterSpacing: '0.3em',
                      textAlign: 'center',
                    }}
                  >
                    {cat.name}
                  </Typography>
                </Box>
              </>
            )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}