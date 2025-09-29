import React from 'react';

const Settings = () => (
  <div>
    <h2>Organization Settings</h2>
    <form className="ck-form">
      <label>Org Name<input placeholder="Organization" defaultValue="Demo Org" /></label>
      <label>Contact Email<input placeholder="contact@org.com" defaultValue="contact@example.com" /></label>
      <label>Timezone<select defaultValue="UTC"><option>UTC</option><option>EST</option><option>PST</option></select></label>
      <button type="submit" className="ck-btn-primary">Save Changes</button>
    </form>
  </div>
);

export default Settings;