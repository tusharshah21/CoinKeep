import React from 'react';

const NavItem = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`ck-nav-item ${active ? 'active' : ''}`}
  >{label}</button>
);

export default NavItem;