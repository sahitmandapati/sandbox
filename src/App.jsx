import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  
  // Get initial stepIndex from URL params
  const getInitialStep = () => {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('stepIndex')) || 0;
  };
  
  const [stepIndex, setStepIndex] = useState(getInitialStep);

  const updateURL = (newStep) => {
    const params = new URLSearchParams(window.location.search);
    params.set('stepIndex', newStep);
    const newURL = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({ stepIndex: newStep }, '', newURL);
  };

  const handleNavigation = (direction) => {
    const newStep = stepIndex + direction;
    
    // Show confirmation when going back from step 5 to 4
    if (stepIndex === 5 && direction === -1) {
      setShowModal(true);
      return;
    }
    
    setStepIndex(newStep);
    updateURL(newStep);
  };

  // const handleBackButton = (e) => {
  //   e.preventDefault();
  //   const previousStep = e.state?.stepIndex ?? stepIndex;
    
  //   if (stepIndex === 5 && previousStep === 4) {
  //     setShowModal(true);
  //     return;
  //   }
    
  //   setStepIndex(previousStep);
  // };

  useEffect(() => {
    // window.history.pushState({ stepIndex }, '', window.location.search);
    // window.addEventListener("onbeforeunload", handleBackButton);
    window.onbeforeunload = function() {
      alert('Are you sure you want to leave?');
    };
    return () => window.onbeforeunload = null;
  }, []);

  useEffect(() => {

    // Push another state to enable back navigation
    window.history.pushState({ stepIndex }, '', window.location.search);
  
    // Use onpopstate with setTimeout
    window.onpopstate = (e) => {
      setTimeout(() => {
        console.log('PopState Event:', e.state);
        const previousStep = e.state?.stepIndex ?? stepIndex;
        
        if (stepIndex === 5 && previousStep === 4) {
          setShowModal(true);
          return;
        }
        
        setStepIndex(previousStep);
      }, 0);
    };
  
    return () => {
      window.onpopstate = null;
    };
  }, [stepIndex]);

  const handleConfirm = () => {
    setShowModal(false);
    setStepIndex(4);
    updateURL(4);
  };

  const handleCancel = () => {
    setShowModal(false);
    updateURL(5); // Stay on step 5
  };

  return (
    <div>
      <button onClick={() => handleNavigation(-1)}>Back</button>
      <button onClick={() => handleNavigation(1)}>Next</button>
      {showModal && (
        <div className="modal">
          <p>Are you sure you want to go back?</p>
          <button onClick={handleConfirm}>Yes</button>
          <button onClick={handleCancel}>No</button>
        </div>
      )}
      <p>Current Step: {stepIndex}</p>
    </div>
  );
}