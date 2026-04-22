'use client';

import { useState } from 'react';
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import { Product, useAddToCartMutation } from '@/services/api';

interface PromoSectionProps {
  products: Product[];
}

function calcDiscountPercent(price: number, discount: number): string {
  const pct = Math.round(((price - discount) / price) * 100);
  return `-${pct}%`;
}

function PromoCard({ product }: { product: Product }) {
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

  const discountLabel = calcDiscountPercent(product.price, product.discount!);

  return (
    <>
      <Box
        sx={{
          width: { xs: '100%', md: 606.6 },
          height: { xs: 160, md: 272.94 },
          borderRadius: '18px',
          opacity: 1,
          position: 'relative',
          bgcolor: '#EFEFEF',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 0.8,
          p: { xs: 2, md: 3 },
        }}
      >
        {/* Discount */}
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: { xs: '1.3rem', md: '1.6rem' },
              color: '#e53935',
              lineHeight: 1,
            }}
          >
            {discountLabel}
          </Typography>
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#e53935' }}>
            Discount
          </Typography>
        </Box>

        {/* Product Name */}
        <Typography sx={{ fontWeight: 600, color: '#333', fontSize: '0.85rem', maxWidth: '55%' }}>
          {product.name}
        </Typography>

        {/* Price */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#e53935' }}>
            ${product.discount}
          </Typography>
          <Typography
            sx={{ fontWeight: 400, fontSize: '0.8rem', color: '#999', textDecoration: 'line-through' }}
          >
            ${product.price}
          </Typography>
        </Box>

        {/* Button */}
        <Button
          variant="contained"
          onClick={handleAddToCart}
          disabled={isLoading}
          sx={{
            bgcolor: 'black',
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: 600,
            py: 1,
            px: 3,
            borderRadius: 3,
            alignSelf: 'flex-start',
            '&:hover': { bgcolor: '#333' },
          }}
        >
          {isLoading ? 'Adding...' : 'Shop now'}
        </Button>

        {/* Product Image */}
        <Box
          component="img"
          src={product.image.url}
          alt={product.name}
          sx={{
            position: 'absolute',
            right: { xs: -5, md: -45 },
            top: '50%',
            transform: 'translateY(-50%)',
            width: { xs: 140, md: 430 },
            height: 'auto',
            objectFit: 'contain',
            zIndex: 2,
            filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.15))',
          }}
        />
      </Box>

      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ fontSize: '0.8rem' }}>
          {product.name} added to cart!
        </Alert>
      </Snackbar>
    </>
  );
}

export default function PromoSection({ products }: PromoSectionProps) {
  const promoProducts = products;

  if (promoProducts.length === 0) return null;

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
      {/* Heading */}
      <Typography
        sx={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 900,
          fontStyle: 'italic',
          fontSize: { xs: '22px', md: '40px' },
          lineHeight: '100%',
          textTransform: 'uppercase',
          textAlign: 'center',
          mb: 4,
        }}
      >
        Looks Good. Runs Good. Feels Good.
      </Typography>

      {/* Cards Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 3,
          justifyItems: 'center',
        }}
      >
        {promoProducts.map((product) => (
          <PromoCard key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
}