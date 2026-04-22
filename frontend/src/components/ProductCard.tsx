'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { Product, useAddToCartMutation } from '@/services/api';

interface ProductCardProps {
  product: Product;
  variant?: 0 | 1 | 2;
}

export default function ProductCard({
  product,
  variant = 0,
}: ProductCardProps) {
  const [addToCart, { isLoading }] = useAddToCartMutation();
  const [snackOpen, setSnackOpen] = useState(false);

  const handleAddToCart = async () => {
    try {
      await addToCart({
        productId: product.id,
        name: product.name,
        price: product.discount ?? product.price,
        image: product.image?.url ?? '',
        quantity: 1,
      }).unwrap();

      setSnackOpen(true);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const imageStyles = [
    {
      width: { xs: '200px', md: '654px' },
      height: { xs: '120px', md: '373px' },
      rotate: '-10deg',
    },
    {
      width: { xs: '200px', md: '654px' },
      height: { xs: '120px', md: '373px' },
      rotate: '-20deg',
    },
    {
      width: { xs: '200px', md: '654px' },
      height: { xs: '120px', md: '373px' },
      rotate: '-4.03deg',
    },
  ];

  const style = imageStyles[variant];

  return (
    <>
      <Card
        sx={{
          width: '100%',
          height: { xs: 280, sm: 420, md: 580 },
          borderRadius: '18px',
          position: 'relative',
          overflow: 'hidden',
          bgcolor: '#EFEFEF',
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
          },
        }}
      >
        <Typography
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-90deg)',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 900,
            fontStyle: 'italic',
            fontSize: { xs: '70px', md: '140px' },
            color: 'rgba(0,0,0,0.07)',
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 0,
            whiteSpace: 'nowrap',
          }}
        >
          NIKE
        </Typography>

        <Box
          sx={{
            position: 'relative',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          {product.image?.url ? (
            <Box
              component="img"
              src={product.image.url}
              alt={product.name}
              sx={{
                width: style.width,
                height: style.height,
                objectFit: 'contain',

                position: 'absolute',
                left: '50%',
                top: '50%',

                transform: `translate(-50%, -50%) rotate(${style.rotate})`,
                transformOrigin: 'center',

                filter: 'drop-shadow(0px 20px 40px rgba(0,0,0,0.18))',
                transition: 'transform 0.3s ease',

                '&:hover': {
                  transform: `translate(-50%, -50%) rotate(${style.rotate}) scale(1.05)`,
                },
              }}
            />
          ) : (
            <Typography variant="caption" color="text.secondary">
              No image
            </Typography>
          )}
        </Box>

        <CardContent sx={{ p: 3, zIndex: 1 }}>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.2rem', md: '1.45rem' },
              lineHeight: 1.1,
              mb: 1,
              textTransform: 'uppercase',
              color: '#111',
            }}
          >
            {product.name}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {product.discount &&
                product.discount < product.price ? (
                <>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: '#e53935',
                    }}
                  >
                    ${product.discount}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: '0.8rem',
                      color: '#999',
                      textDecoration: 'line-through',
                    }}
                  >
                    ${product.price}
                  </Typography>
                </>
              ) : (
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    color: '#555',
                  }}
                >
                  ${product.price}
                </Typography>
              )}
            </Box>

            <IconButton
              onClick={handleAddToCart}
              disabled={isLoading}
              sx={{
                width: 55,
                height: 52.9,
                borderRadius: '50%',
                bgcolor: '#fff',
                color: '#fff',
                '&:hover': {
                  bgcolor: '#333',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <Box
                component="img"
                src="/Group (2).png"
                alt="Add to cart"
                sx={{
                  width: 28,
                  height: 28,
                  objectFit: 'contain',
                }}
              />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ fontSize: '0.8rem' }}>
          {product.name} added to cart
        </Alert>
      </Snackbar>
    </>
  );
}