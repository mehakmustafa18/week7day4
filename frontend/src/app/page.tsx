'use client';

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import ProductSection from '@/components/ProductSection';
import CategorySection from '@/components/CategorySection';
import PromoSection from '@/components/PromoSection';
import NikePromoSection from '@/components/NikePromoSection';
import MembershipBanner from '@/components/MembershipBanner';
import Footer from '@/components/Footer';
import { useGetProductsQuery } from '@/services/api';

export default function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [searchQuery, setSearchQuery] = useState('');

  const allProducts = products ?? [];

  const nikePromoProducts = allProducts.filter((p) => p.nikePromo && p.image?.url);
  const promoProducts = allProducts.filter(
    (p) => p.discount != null && p.discount < p.price && p.image?.url
  );
  const topSneakers = allProducts.filter(
    (p) =>
      !p.nikePromo &&
      !(p.discount != null && p.discount < p.price) &&
      p.image?.url
  );

  const filteredProducts = searchQuery.trim()
    ? allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : allProducts;

  const isSearching = searchQuery.trim().length > 0;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      <Navbar onSearch={setSearchQuery} />

      {isSearching ? (
        <Box sx={{ py: 4, px: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
          <Typography
            sx={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: { xs: '1.2rem', md: '1.8rem' },
              mb: 1,
            }}
          >
            Results for &ldquo;{searchQuery}&rdquo;
          </Typography>
          <Typography sx={{ color: '#999', fontSize: '0.9rem', mb: 3 }}>
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </Typography>
          <ProductSection
            title=""
            products={filteredProducts}
            isLoading={isLoading}
            error={!!error}
          />
        </Box>
      ) : (
        <>
          <HeroBanner />

          <NikePromoSection products={nikePromoProducts} />

          <Box
            sx={{
              textAlign: 'center',
              py: { xs: 3, md: 3 },
              px: 2,
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: { xs: '0.75rem', md: '2.5rem' },
                lineHeight: 1,
                letterSpacing: '0.1em',
                color: '#999',
                display: 'block',
                mb: 0.5,
                textTransform: 'uppercase',
              }}
            >
              At the moment
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Montserrat',
                fontWeight: 900,
                fontStyle: 'italic',
                fontSize: { xs: '2rem', md: '5rem' },
                lineHeight: 1,
                letterSpacing: '0%',
                mb: 0.5,
                textTransform: 'uppercase',
              }}
            >
              SUMMERTIME MOOD
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Montserrat',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: { xs: '0.8rem', md: '2.5rem' },
                lineHeight: 1,
                letterSpacing: '0%',
                color: '#666',
              }}
            >
              Fight the heat in a sunny look!
            </Typography>
          </Box>

          <ProductSection
            title="Top sneakers"
            products={topSneakers}
            isLoading={isLoading}
            error={!!error}
          />

          <CategorySection />

          <PromoSection products={promoProducts} />

          <MembershipBanner />

          <Footer />
        </>
      )}
    </Box>
  );
}
