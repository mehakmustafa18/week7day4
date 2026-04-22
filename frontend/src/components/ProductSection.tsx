'use client';

import { useState } from 'react';
import { Box, Typography, IconButton, CircularProgress, Alert } from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from '@/services/api';

const CARDS_PER_PAGE = 3;

interface ProductSectionProps {
  title: string;
  products: Product[];
  isLoading?: boolean;
  error?: boolean;
}

export default function ProductSection({
  title,
  products,
  isLoading,
  error,
}: ProductSectionProps) {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(products.length / CARDS_PER_PAGE);
  const visibleProducts = products.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  const handlePrev = () => setPage((p) => Math.max(0, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <Box sx={{ py: 3, px: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontStyle: 'normal',
            fontSize: { xs: '1.5rem', md: '2.5rem' },
            lineHeight: 1,
            letterSpacing: '0%',
            mb: 2,
          }}
        >
          {title}
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
          <IconButton
            size="small"
            onClick={handlePrev}
            disabled={page === 0}
            aria-label="scroll left"
            sx={{
              right: 48,
              width: 28,
              height: 28,
              '&:hover': { bgcolor: '#f5f5f5' },
              '&.Mui-disabled': { opacity: 0.3 },
            }}
          >
            <Box
              component="img"
              src="/Group 61.png"
              alt="Previous"
              sx={{ width: 55, height: 55, objectFit: 'contain' }}
            />
          </IconButton>

          <IconButton
            size="small"
            onClick={handleNext}
            disabled={page >= totalPages - 1}
            aria-label="scroll right"
            sx={{
              borderRadius: 0,
              width: 28,
              height: 28,
              '&:hover': { bgcolor: '#f5f5f5' },
              '&.Mui-disabled': { opacity: 0.3 },
            }}
          >
            <Box
              component="img"
              src="/Group 60.png"
              alt="Next"
              sx={{ width: 55, height: 55, objectFit: 'contain' }}
            />
          </IconButton>
        </Box>
      </Box>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress size={32} />
        </Box>
      )}

      {error && !isLoading && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load products. Please check your backend connection.
        </Alert>
      )}

      {!isLoading && !error && (
        <>
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              gap: 2,
              overflowX: 'auto',
              pb: 1,
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
              mx: -2,
              px: 2,
            }}
          >
            {products.map((product, idx) => (
              <Box
                key={product.id}
                sx={{ flex: '0 0 68vw', minWidth: '68vw' }}
              >
                <ProductCard
                  product={product}
                  variant={(idx % 3) as 0 | 1 | 2}
                />
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'grid' },
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 3,
              width: '100%',
            }}
          >
            {visibleProducts.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No products available.
              </Typography>
            ) : (
              visibleProducts.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant={((page * CARDS_PER_PAGE + idx) % 3) as 0 | 1 | 2}
                />
              ))
            )}
          </Box>

          {/* Page indicator dots */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 3 }}>
              {Array.from({ length: totalPages }).map((_, i) => (
                <Box
                  key={i}
                  onClick={() => setPage(i)}
                  sx={{
                    width: i === page ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    bgcolor: i === page ? '#111' : '#ccc',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                />
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
