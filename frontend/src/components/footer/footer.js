import React from 'react';
import GithubLogo from '../../assets/images/GitHub-Mark-120px-plus.png';
import LinkedInLogo from '../../assets/images/LI-In-Bug.png';


function Footer() {
  return (
    
    <div className="footer">
      <p>Creators</p>
      <div className="footer-tiles">
        <div className="footer-tile">
          <h1 className="footer-tile-name">
            Josh Kim
          </h1>
          <div className="footer-tile-links">
            <a className="footer-tile-link" href="https://github.com/joshhk72">
              <img className="footer-tile-logo" src={GithubLogo}></img>
            </a>
            <a className="footer-tile-link" href="https://www.linkedin.com/in/joshhk72">
              <img id="linkedin" className="footer-tile-logo" src={LinkedInLogo}></img>
            </a>
          </div>
        </div>
        <div className="footer-tile">
          <h1 className="footer-tile-name">
            Jasim Atiyeh
          </h1>
          <div className="footer-tile-links">
            <a className="footer-tile-link" href="https://github.com/JasimAtiyeh">
              <img className="footer-tile-logo" src={GithubLogo}></img>
            </a>
            <a className="footer-tile-link" href="https://www.linkedin.com/in/jasim-atiyeh-a0281a5a">
              <img id="linkedin" className="footer-tile-logo" src={LinkedInLogo}></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer