'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  InputBase,
  Collapse,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import { useGetCartQuery } from '@/services/api';

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: cart } = useGetCartQuery();
  const cartCount =
    cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  const handleSearchToggle = () => {
    if (searchOpen) {
      setSearchOpen(false);
      setSearchQuery('');
      onSearch?.('');
    } else {
      setSearchOpen(true);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    onSearch?.(val);
  };

  const navItems = [
    { label: 'WOMAN', fontWeight: 400 },
    { label: 'MEN', fontWeight: 400 },
    { label: 'ALL', fontWeight: 700 },
  ];

  const drawerItems = ['ALL', 'WOMAN', 'MEN', 'WORKOUT', 'RUN', 'FOOTBALL'];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'white',
          color: 'black',
          borderBottom: '1px solid #e0e0e0',
          zIndex: 1200,
        }}
      >
        <Box sx={{ maxWidth: '1400px', width: '100%', mx: 'auto' }}>
          <Toolbar
            sx={{
              position: 'relative',
              height: '79px',
              minHeight: '79px !important',
              px: { xs: 2, md: 4 },
            }}
          >
            <IconButton
              sx={{
                display: { xs: 'flex', md: 'none' },
                position: 'absolute',
                left: 16,
              }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: { md: 4, lg: '50px' },
                ml: { md: 2, lg: 4 },
              }}
            >
              {navItems.map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    height: '22px',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: item.fontWeight,
                      fontSize: '18px',
                      lineHeight: '100%',
                      textAlign: 'center',
                      color: '#000',
                      borderBottom:
                        item.label === 'ALL'
                          ? '2px solid black'
                          : 'none',
                      pb: '4px',
                      '&:hover': { color: '#666' },
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 400,
                    fontSize: '32px',
                    letterSpacing: '0.1em',
                    color: '#999',
                  }}
                >
                  YOUR
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 900,
                    fontSize: '32px',
                    letterSpacing: '0.1em',
                    ml: 0.5,
                    color: '#000',
                  }}
                >
                  SNEAKER
                </Typography>
              </Box>
            </Link>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 2, md: '50px' },
                ml: 'auto',
              }}
            >
              {/* Person Icon */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                <IconButton sx={{ p: 0 }}>
                  <Image src="/icon-user.png" alt="user" width={24} height={24} />
                </IconButton>
              </Box>

              {/* Search Icon */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleSearchToggle} sx={{ p: 0 }}>
                  {searchOpen ? <CloseIcon /> : <SearchIcon sx={{ fontSize: '26px', color: '#000' }} />}
                </IconButton>
              </Box>

              {/* Cart Icon */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Link href="/cart">
                  <IconButton sx={{ p: 0 }}>
                    <Badge badgeContent={cartCount} color="error">
                      <Image src="/icon_cart.png" alt="cart" width={24} height={24} />
                    </Badge>
                  </IconButton>
                </Link>
              </Box>
            </Box>
          </Toolbar>

          <Collapse in={searchOpen} timeout={250}>
            <Box
              sx={{
                px: { xs: 2, md: 4 },
                pb: 1.5,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                borderTop: '1px solid #f0f0f0',
              }}
            >
              <SearchIcon sx={{ color: '#999', fontSize: '1.2rem' }} />
              <InputBase
                autoFocus
                fullWidth
                placeholder="Search sneakers…"
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.95rem',
                }}
              />
              {searchQuery && (
                <IconButton
                  size="small"
                  onClick={() => {
                    setSearchQuery('');
                    onSearch?.('');
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Collapse>
        </Box>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{ paper: { sx: { width: 280, display: 'flex', flexDirection: 'column' } } }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.05em' }}>
            YOUR <strong>SNEAKER</strong>
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Search row */}
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1, borderBottom: '1px solid #f0f0f0' }}>
          <Image src="/icon-search.png" alt="search" width={18} height={18} />
          <Typography sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.9rem', color: '#999' }}>
            SEARCH
          </Typography>
        </Box>

        {/* Login row */}
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1, borderBottom: '1px solid #f0f0f0' }}>
          <Image src="/icon-user.png" alt="user" width={18} height={18} />
          <Typography sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.9rem', color: '#999' }}>
            LOGIN
          </Typography>
        </Box>

        <List sx={{ pt: 1 }}>
          {drawerItems.map((link) => (
            <ListItem
              key={link}
              onClick={() => setDrawerOpen(false)}
              sx={{ py: 1.5, cursor: 'pointer', '&:hover': { bgcolor: '#f5f5f5' } }}
            >
              <ListItemText
                primary={link}
                slotProps={{
                  primary: {
                    sx: {
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: link === 'ALL' ? 700 : 400,
                      fontSize: '1rem',
                      letterSpacing: '0.05em',
                      borderBottom: link === 'ALL' ? '2px solid black' : 'none',
                      display: 'inline-block',
                      pb: link === 'ALL' ? '2px' : 0,
                    },
                  },
                }}
              />
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 'auto', p: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Box
            component="img"
            src="/Vector (25).png"
            alt="Nike"
            sx={{ width: 60, height: 'auto', objectFit: 'contain', filter: 'invert(1)' }}
          />
        </Box>
      </Drawer>
    </>
  );
}