import { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

export default function DrawerList() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="relative h-screen">
      {/* Sidebar - Overlay Effect */}
      <div className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ${collapsed ? 'w-0' : 'w-60'}`}>
        <Sidebar collapsed={collapsed} className="h-full shadow-lg bg-white">
          <Menu
            menuItemStyles={{
              button: {
                [`&.active`]: {
                  backgroundColor: '#13395e',
                  color: '#b6c8d9',
                },
              },
            }}
          >
            <MenuItem component={<Link to="/history" />}> History</MenuItem>
            <MenuItem component={<Link to="/calendar" />}> Calendar</MenuItem>
            <MenuItem component={<Link to="/e-commerce" />}> E-commerce</MenuItem>
          </Menu>
        </Sidebar>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-2 mb-4 border rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          {collapsed ? 'Expand' : 'Collapse'}
        </button>
        
        {/* Example Content */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border rounded bg-gray-100">Item 1</div>
          <div className="p-4 border rounded bg-gray-100">Item 2</div>
          <div className="p-4 border rounded bg-gray-100">Item 3</div>
        </div>
      </div>
    </div>
  );
}
