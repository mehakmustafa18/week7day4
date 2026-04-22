'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} from '@/services/api';

const ITEMS_PER_PAGE = 3;

export default function CartPage() {
  const { data: cart, isLoading, error } = useGetCartQuery();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();
  const [clearCart] = useClearCartMutation();
  const [page, setPage] = useState(0);

  const handleIncrease = async (productId: string, currentQty: number) => {
    await updateCartItem({ productId, quantity: currentQty + 1 });
  };

  const handleDecrease = async (productId: string, currentQty: number) => {
    if (currentQty <= 1) {
      await removeCartItem(productId);
    } else {
      await updateCartItem({ productId, quantity: currentQty - 1 });
    }
  };

  const handleRemove = async (productId: string) => {
    await removeCartItem(productId);
  };

  const handleClearCart = async () => {
    await clearCart();
    setPage(0);
  };

  const totalPages = cart ? Math.ceil(cart.items.length / ITEMS_PER_PAGE) : 0;
  const currentItems = cart
    ? cart.items.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE)
    : [];

  const handlePrev = () => setPage((p) => Math.max(0, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <Box sx={{ flex: 1, px: { xs: 2, md: 4 }, py: 3, maxWidth: 800, mx: 'auto', width: '100%' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <Link href="/">
            <IconButton size="small" aria-label="back to home">
              <ArrowBackIcon fontSize="small" />
            </IconButton>
          </Link>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>
            Your Cart
          </Typography>
          {cart && cart.items.length > 0 && (
            <Typography variant="caption" sx={{ color: '#999', ml: 0.5 }}>
              ({cart.items.reduce((s, i) => s + i.quantity, 0)} items)
            </Typography>
          )}
        </Box>

        {/* Loading */}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress size={36} />
          </Box>
        )}

        {/* Error */}
        {error && !isLoading && (
          <Alert severity="error">
            Failed to load cart. Please check your backend connection.
          </Alert>
        )}

        {/* Empty cart */}
        {!isLoading && !error && cart?.items.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
              Your cart is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Add some sneakers to get started
            </Typography>
            <Link href="/">
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'black',
                  color: 'white',
                  borderRadius: 0,
                  px: 4,
                  '&:hover': { bgcolor: '#333' },
                }}
              >
                Shop Now
              </Button>
            </Link>
          </Box>
        )}

        {/* Cart items */}
        {!isLoading && !error && cart && cart.items.length > 0 && (
          <>
            {/* Items list — shows 3 at a time */}
            <Box
              sx={{
                borderRadius: '18px',
                bgcolor: '#f7f7f7',
                overflow: 'hidden',
                mb: 2,
              }}
            >
              {currentItems.map((item, idx) => (
                <React.Fragment key={item.productId}>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      px: 2.5,
                      py: 1.8,
                      alignItems: 'center',
                    }}
                  >
                    {/* Product image */}
                    <Box
                      sx={{
                        width: 72,
                        height: 72,
                        bgcolor: '#efefef',
                        borderRadius: '10px',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}
                    >
        {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            padding: 6,
                          }}
                        />
                      ) : (
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>
                          No image
                        </Typography>
                      )}
                    </Box>

                    {/* Product info */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          mb: 0.3,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: '#888', fontSize: '0.72rem', display: 'block', mb: 1 }}
                      >
                        ${item.price.toFixed(2)} each
                      </Typography>

                      {/* Quantity controls */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleDecrease(item.productId, item.quantity)}
                          aria-label="decrease quantity"
                          sx={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '6px 0 0 6px',
                            width: 26,
                            height: 26,
                            bgcolor: '#fff',
                            '&:hover': { bgcolor: '#f0f0f0' },
                          }}
                        >
                          <RemoveIcon sx={{ fontSize: '0.75rem' }} />
                        </IconButton>
                        <Box
                          sx={{
                            width: 34,
                            height: 26,
                            border: '1px solid #e0e0e0',
                            borderLeft: 'none',
                            borderRight: 'none',
                            bgcolor: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.78rem' }}>
                            {item.quantity}
                          </Typography>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={() => handleIncrease(item.productId, item.quantity)}
                          aria-label="increase quantity"
                          sx={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '0 6px 6px 0',
                            width: 26,
                            height: 26,
                            bgcolor: '#fff',
                            '&:hover': { bgcolor: '#f0f0f0' },
                          }}
                        >
                          <AddIcon sx={{ fontSize: '0.75rem' }} />
                        </IconButton>
                      </Box>
                    </Box>

                    {/* Price + Remove */}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        gap: 1,
                        flexShrink: 0,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 700, fontSize: '0.88rem' }}
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleRemove(item.productId)}
                        aria-label={`Remove ${item.name} from cart`}
                        sx={{
                          color: '#bbb',
                          '&:hover': { color: '#e53935' },
                          p: 0.5,
                        }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  {idx < currentItems.length - 1 && (
                    <Divider sx={{ borderColor: '#ececec', mx: 2.5 }} />
                  )}
                </React.Fragment>
              ))}
            </Box>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  mb: 2,
                }}
              >
                <IconButton
                  size="small"
                  onClick={handlePrev}
                  disabled={page === 0}
                  aria-label="previous items"
                  sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 0,
                    width: 32,
                    height: 32,
                    '&:disabled': { opacity: 0.35 },
                    '&:hover:not(:disabled)': { bgcolor: '#f0f0f0' },
                  }}
                >
                  <ArrowBackIosNewIcon sx={{ fontSize: '0.75rem' }} />
                </IconButton>

                <Typography variant="caption" sx={{ color: '#666', fontWeight: 600 }}>
                  {page + 1} / {totalPages}
                </Typography>

                <IconButton
                  size="small"
                  onClick={handleNext}
                  disabled={page === totalPages - 1}
                  aria-label="next items"
                  sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 0,
                    width: 32,
                    height: 32,
                    '&:disabled': { opacity: 0.35 },
                    '&:hover:not(:disabled)': { bgcolor: '#f0f0f0' },
                  }}
                >
                  <ArrowForwardIosIcon sx={{ fontSize: '0.75rem' }} />
                </IconButton>
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            {/* Order summary */}
            <Paper
              elevation={0}
              sx={{ border: '1px solid #e0e0e0', p: 2, mb: 2 }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, mb: 1.5, fontSize: '0.85rem' }}
              >
                Order Summary
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  Subtotal ({cart.items.reduce((s, i) => s + i.quantity, 0)} items)
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  ${cart.total.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  Shipping
                </Typography>
                <Typography variant="caption" sx={{ color: '#2e7d32', fontWeight: 600 }}>
                  FREE
                </Typography>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Total
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  ${cart.total.toFixed(2)}
                </Typography>
              </Box>
            </Paper>

            {/* Actions */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                variant="contained"
                fullWidth
                disabled
                sx={{
                  bgcolor: '#ccc',
                  color: 'white',
                  borderRadius: 0,
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'not-allowed',
                }}
              >
                Checkout (Coming Soon)
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleClearCart}
                sx={{
                  borderColor: '#e0e0e0',
                  color: '#666',
                  borderRadius: 0,
                  py: 1,
                  fontSize: '0.75rem',
                  '&:hover': { borderColor: '#999', color: 'black' },
                }}
              >
                Clear Cart
              </Button>
            </Box>
          </>
        )}
      </Box>

      <Footer />
    </Box>
  );
}
