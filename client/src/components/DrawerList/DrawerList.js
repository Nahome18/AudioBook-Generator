import { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

export default function DrawerList({ collapsed, setCollapsed }) {
 

  return (
    <div className="sidebar">
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-2 mb-4 border rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          {collapsed ? 'Expand' : 'Collapse'}
        </button>
      <div className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ${collapsed ? 'w-0' : 'w-60'}`}>
        <Sidebar collapsed={collapsed} className="h-full shadow-lg bg-white">
        <Menu
          menuItemStyles={{
            button: {
              borderRadius: '8px', // Adjust the value for rounder corners
              margin:'10px 0px',
              '&:hover': {
                backgroundColor: '#f0f0f0', // Light gray hover effect
                color: '#13395e', // Dark blue text on hover
                borderRadius: '8px', // Keep border-radius on hover

              },
            },
          }}
        >
            <MenuItem component={<Link to="/history" />} className='sidebar-item'> History</MenuItem>
            <MenuItem component={<Link to="/calendar" />} className='sidebar-item'> Calendar</MenuItem>
            <MenuItem component={<Link to="/e-commerce" />} className='sidebar-item'> E-commerce</MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </div>
  );
}
