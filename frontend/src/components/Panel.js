import React from 'react';

const Panel = ({ title, children }) => (
  <div className="ck-panel">
    <div className="ck-panel-head">{title}</div>
    <div className="ck-panel-body">{children}</div>
  </div>
);

export default Panel;