// Debug component to test Module Federation loading

import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const Debug: React.FC = () => {
  const [moduleInfo, setModuleInfo] = useState<string>('');
  const [error, setError] = useState<string>('');

  const testModuleFederation = async () => {
    try {
      setModuleInfo('Testing Module Federation...');

      // Test if __webpack_require__ is available
      const webpack = (window as any).__webpack_require__;
      if (!webpack) {
        setError('Webpack runtime not available');
        return;
      }

      // Test if the remote is registered
      const container = webpack.cache;
      console.log('Webpack cache:', container);

      // Try to import the remote module
      const module = await import('remote/UserCard');
      console.log('Remote module loaded:', module);

      setModuleInfo(
        `Module loaded successfully: ${JSON.stringify(Object.keys(module))}`
      );
    } catch (err: any) {
      console.error('Module Federation error:', err);
      setError(`Error: ${err.message}`);
    }
  };

  const testDirectImport = async () => {
    try {
      setModuleInfo('Testing direct import...');

      // Try to fetch the remote entry directly
      const response = await fetch('http://localhost:3001/remoteEntry.js');
      const text = await response.text();

      setModuleInfo(`Remote entry loaded: ${text.substring(0, 200)}...`);
    } catch (err: any) {
      console.error('Direct import error:', err);
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Module Federation Debug
      </Typography>

      <Box mb={2}>
        <Button
          variant="contained"
          onClick={testModuleFederation}
          sx={{ mr: 2 }}
        >
          Test Module Federation
        </Button>
        <Button variant="outlined" onClick={testDirectImport}>
          Test Direct Import
        </Button>
      </Box>

      {moduleInfo && (
        <Box mb={2}>
          <Typography variant="h6">Info:</Typography>
          <Typography component="pre" sx={{ fontSize: '0.875rem' }}>
            {moduleInfo}
          </Typography>
        </Box>
      )}

      {error && (
        <Box mb={2}>
          <Typography variant="h6" color="error">
            Error:
          </Typography>
          <Typography
            component="pre"
            color="error"
            sx={{ fontSize: '0.875rem' }}
          >
            {error}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Debug;
