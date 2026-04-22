import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#FF0000',
    },
    background: {
      default: '#FFFFFF',
    },
  },
  typography: {
    // Updated to use the Montserrat variable from your RootLayout
    fontFamily: 'var(--font-montserrat), "Helvetica Neue", Helvetica, Arial, sans-serif',
    h1: {
      fontWeight: 900,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 900, // Matched to "WE ARE NEVER DONE" weight
    },
    h3: {
      fontWeight: 700,
    },
    button: {
      fontFamily: 'var(--font-montserrat)',
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Changed to 30px to match the rounded button in your hero image
          borderRadius: '30px', 
          textTransform: 'none',
          fontWeight: 700,
          padding: '8px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          border: '1px solid #e0e0e0',
        },
      },
    },
  },
});