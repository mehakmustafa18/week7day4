'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

const leftLinks = ['ALL', 'WOMAN', 'MEN'];
const rightLinks = ['WORKOUT', 'RUN', 'FOOTBALL'];

export default function Footer() {
  return (
    <Box component="footer">
      {/* Glory to Ukraine Section - White */}
      <Box
        sx={{
          bgcolor: 'white',
          textAlign: 'center',
          py: 8,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: { xs: '14px', md: '24px' },
            lineHeight: 1,
            letterSpacing: 0,
            textTransform: 'uppercase',
            color: 'text.secondary',
            display: 'block',
            mb: 1,
          }}
        >
          THANKS FOR WATCHING
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 900,
            fontStyle: 'italic',
            fontSize: { xs: '28px', md: '48px' },
            lineHeight: 1,
            letterSpacing: 0,
            mb: 1,
          }}
        >
          Glory to Ukraine
        </Typography>

        {/* Ukrainian Flag Image */}
        <Box
          component="img"
          src="/ukr.png"
          alt="Ukraine Flag"
          sx={{
            width: 60,
            height: 40,
            mt: 1,
            mx: 'auto',
            display: 'block',
          }}
        />
      </Box>

      {/* Main Black Footer */}
      <Box sx={{ bgcolor: 'black', width: '100%', position: 'relative', zIndex: 0 }}>
        <Box
          sx={{
            color: 'white',
            width: '100%',
            maxWidth: 1400,
            mx: 'auto',
            minHeight: { xs: 'auto', md: 280 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'space-between' },
            px: { xs: 3, md: 8 },
            py: { xs: 4, md: 0 },
            gap: { xs: 3, md: 0 },
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Center - Nike Swoosh */}
          <Box
            sx={{
              position: { xs: 'static', md: 'absolute' },
              left: { md: '50%' },
              transform: { md: 'translateX(-50%)' },
              width: { xs: 100, md: 380 },
              height: { xs: 68, md: 260 },
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src="/Rectangle.png"
              alt="Nike Swoosh"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                zIndex: 1,
              }}
            />
            <Box
              component="img"
              src="/Vector (25).png"
              alt="Nike Swoosh"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                zIndex: 2,
              }}
            />
          </Box>

          {/* All links in one row on mobile */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexDirection: 'row',
              gap: 3,
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {[...leftLinks, ...rightLinks].map((link) => (
              <Typography
                key={link}
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.7 },
                  transition: 'opacity 0.2s',
                }}
              >
                {link}
              </Typography>
            ))}
          </Box>

          {/* Desktop left links */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              gap: 2.5,
              alignItems: 'flex-start',
            }}
          >
            {leftLinks.map((link) => (
              <Typography
                key={link}
                sx={{
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.7 },
                  transition: 'opacity 0.2s',
                }}
              >
                {link}
              </Typography>
            ))}
          </Box>

          {/* Desktop right links */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              gap: 2.5,
              alignItems: 'flex-end',
              textAlign: 'right',
            }}
          >
            {rightLinks.map((link) => (
              <Typography
                key={link}
                sx={{
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.7 },
                  transition: 'opacity 0.2s',
                }}
              >
                {link}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}