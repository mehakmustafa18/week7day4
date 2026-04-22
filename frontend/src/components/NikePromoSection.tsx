'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import { Product, useAddToCartMutation } from '@/services/api';

interface NikePromoSectionProps {
  products: Product[];
}

interface NikeCardProps {
  product: Product;
}

function NikeCard({ product }: NikeCardProps) {
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

  return (
    <>
      <Box
        sx={{
          flex: 1,
          position: 'relative',
          // Space for the shoe to pop out from the top
          pt: { xs: 10, md: 12 }, 
        }}
      >
        {/* The Shoe Image - Large and angled */}
        {product.image?.url && (
          <Box
            component="img"
            src={product.image.url}
            alt={product.name}
            sx={{
              position: 'absolute',
              top: { xs: 50, md: 60 },
              right: { xs: -8, md: -42 },
              width: { xs: '160px', md: '350px' },
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0px 20px 30px rgba(0,0,0,0.25))',
              zIndex: 10,
              transform: 'rotate(-18deg)', 
              transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              pointerEvents: 'none', 
              '&:hover': {
                transform: 'rotate(-5deg) scale(1.1)',
              },
            }}
          />
        )}

        {/* Card Body */}
        <Box
          sx={{
            bgcolor: '#F2F2F2',
            borderRadius: '24px',
            width: '100%',
            height: { xs: 150, md: 220 },
            p: { xs: 2, md: 4 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            position: 'relative',
          }}
        >
          <Typography
            sx={{
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: { xs: '1.2rem', md: '2.2rem' },
              color: '#FF4D4D', // Vibrant Nike Red
              lineHeight: 1,
              mb: 0.5,
            }}
          >
            NEW
          </Typography>
          
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: { xs: '0.7rem', md: '0.9rem' },
              color: '#333',
              textTransform: 'uppercase',
              maxWidth: '55%', // Prevents text from going under the shoe
              lineHeight: 1.2,
            }}
          >
            {product.name}
          </Typography>

          {/* Price display */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            {product.discount ? (
              <>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '0.85rem', md: '1rem' },
                    color: '#FF4D4D',
                  }}
                >
                  ${product.discount}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: { xs: '0.7rem', md: '0.85rem' },
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
                  fontWeight: 700,
                  fontSize: { xs: '0.85rem', md: '1rem' },
                  color: '#333',
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
    mt: 'auto',
    width: { xs: 32, md: 44 },
    height: { xs: 32, md: 44 },
    bgcolor: '#fff',
    color: '#000',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease-in-out',
    '&:hover': { 
      bgcolor: '#000', 
      // If your arrow is a black SVG, you might need a filter to turn it white on hover
      '& img': { 
        transform: 'translateX(4px)',
        filter: 'brightness(0) invert(1)', 
      }
    },
  }}
>
  <Box
    component="img"
    src="/Vector (27).png" // Replace with your actual link or file path
    alt="Add to cart"
    sx={{
      width: { xs: '16px', md: '20px' },
      height: 'auto',
      transition: 'transform 0.2s ease-in-out',
    }}
  />
</IconButton>
        </Box>
      </Box>

      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {product.name} added to cart!
        </Alert>
      </Snackbar>
    </>
  );
}

export default function NikePromoSection({ products }: NikePromoSectionProps) {
  // Use the products passed in directly (already filtered by parent)
  const cardProducts = products.slice(0, 2);

  return (
    <Box sx={{ width: '100%', pb: { xs: 4, md: 15 } }}>
      {/* Banner + cards wrapper */}
      <Box sx={{ position: 'relative', width: '100%' }}>
        <Box
          component="img"
          src="/Rectangle 1141.png"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* Swoosh Logo Overlay */}
        <Box
          component="img"
          src="/Vector (26).png"
          sx={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: 180, md: 400 },
            zIndex: 1,
          }}
        />

        {/* Cards container — absolute on desktop, static flow on mobile */}
        <Box
          sx={{
            position: { xs: 'static', md: 'absolute' },
            bottom: { md: -110 },
            left: { md: 0 },
            right: { md: 0 },
            mt: { xs: 0, md: 0 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 2, sm: 2.5, md: 4 },
            px: { xs: 2, sm: 3, md: 10 },
            py: { xs: 2, md: 0 },
            zIndex: 20,
          }}
        >
          {cardProducts.map((product) => (
            <Box
              key={product.id}
              sx={{
                flex: { xs: '1 1 auto', md: 1 },
                width: { xs: '100%', md: 'auto' },
              }}
            >
              <NikeCard product={product} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}