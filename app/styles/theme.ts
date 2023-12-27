import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: 'var(--font-rubik)',
    body: 'var(--font-rubik)',
  },
  colors: {
    gray: {
      50: '#F7FAFC',  
      700: '#2D3748', 
      800: '#1A202C', 
    },
    blue: {
      400: '#4299E1', 
      500: '#3182CE', 
    },
  },
});
