import React, { useState, useEffect } from 'react';
import { Modal, Button } from '@material-ui/core';
import './App.css'; // Ensure you have a CSS file for styling if needed

function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      // Prevent the default back action
      window.history.pushState(null, null, window.location.href);
      setOpen(true);
    };

    window.addEventListener('popstate', handlePopState);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleYes = () => {
    // Allow the back action
    window.history.go(-1);
  };

  const handleNo = () => {
    // Prevent going back and close the modal
    window.history.pushState(null, null, window.location.href);
    setOpen(false);
  };

  return (
    <div>
      {/* Your main content goes here */}

      <Modal open={open} onClose={handleNo}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
          }}
        >
          <p>Are you sure you want to go back?</p>
          <Button variant="contained" color="primary" onClick={handleYes}>
            Yes
          </Button>
          <Button variant="contained" onClick={handleNo}>No</Button>
        </div>
      </Modal>
    </div>
  );
}

export default App;