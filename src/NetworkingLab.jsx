import React from 'react';
import './NetworkingLab.css';

function NetworkingLab() {
  return (
    <div className="networking-lab-container">
      <h2>Networking Lab Tools</h2>
      <ul className="networking-tool-list">
        <li>NMS (Network Management System)</li>
        <li>ITSM (IT Service Management)</li>
        <li><strong>PNET Lab</strong> (Practical Networking Lab)</li>
      </ul>
      <div className="pnet-lab-section">
        <h3>PNET Lab</h3>
        <p>
          Welcome to the PNET Lab! Here you can simulate, configure, and test various networking scenarios. More features coming soon.
        </p>
        <a
          href="https://your-pnet-lab-url.com" // <-- Replace with your actual PNET Lab URL
          target="_blank"
          rel="noopener noreferrer"
          className="pnet-lab-button"
        >
          Go to PNET Lab
        </a>
      </div>
    </div>
  );
}

export default NetworkingLab;