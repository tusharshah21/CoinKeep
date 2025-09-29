import React from 'react';
import NavItem from './NavItem';
import Header from './Header';
import Dashboard from '../pages/Dashboard';
import Payments from '../pages/Payments';
import Batch from '../pages/Batch';
import Files from '../pages/Files';
import Billing from '../pages/Billing';
import Developers from '../pages/Developers';
import Settings from '../pages/Settings';

const Layout = ({ current, setCurrent, logout, org }) => {
  const items = ['Dashboard','Payments','Batch','Files','Billing','Developers','Settings'];
  return (
    <div className="ck-layout">
      <aside className="ck-sidebar">
        <div className="ck-brand">CoinKeep</div>
        <div className="ck-org">{org}</div>
        <nav className="ck-nav">
          {items.map(i => (
            <NavItem key={i} label={i} active={current === i} onClick={() => setCurrent(i)} />
          ))}
        </nav>
        <div className="ck-spacer" />
        <button className="ck-logout" onClick={logout}>Logout</button>
      </aside>
      <main className="ck-main">
        <Header title={current} />
        <div className="ck-content">
          {renderSection(current)}
        </div>
      </main>
    </div>
  );
};

const renderSection = (name) => {
  switch(name) {
    case 'Dashboard':
      return <Dashboard />;
    case 'Payments':
      return <Payments />;
    case 'Batch':
      return <Batch />;
    case 'Files':
      return <Files />;
    case 'Billing':
      return <Billing />;
    case 'Developers':
      return <Developers />;
    case 'Settings':
      return <Settings />;
    default:
      return <div>Unknown section</div>;
  }
};

export default Layout;