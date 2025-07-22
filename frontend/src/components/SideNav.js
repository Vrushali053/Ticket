// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { FaHome, FaTicketAlt, FaPlus, FaCog } from 'react-icons/fa';
// // import '../styles/SideNav.css';

// // function SideNav() {
// //   return (
// //     <div className="side-nav">
// //       <Link to="/dashboard">
// //         <FaHome className="nav-icon" title="Dashboard" />
// //       </Link>
// //       <Link to="/tickets">
// //         <FaTicketAlt className="nav-icon" title="Tickets View" />
// //       </Link>
// //       <Link to="/create-ticket">
// //         <FaPlus className="nav-icon" title="Create Ticket" />
// //       </Link>
// //       <Link to="/settings">
// //         <FaCog className="nav-icon" title="Settings" />
// //       </Link>
// //     </div>
// //   );
// // }

// // export default SideNav;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaHome, FaTicketAlt, FaPlus, FaCog, FaUser, FaClipboardCheck } from 'react-icons/fa';
// import '../styles/SideNav.css';

// function SideNav() {
//   return (
//     <div className="side-nav">
//       <Link to="/dashboard">
//         <FaHome className="nav-icon" title="Dashboard" />
//       </Link>
//       <Link to="/tickets">
//         <FaTicketAlt className="nav-icon" title="Tickets" />
//       </Link>
//       <Link to="/create-ticket">
//         <FaPlus className="nav-icon" title="Create Ticket" />
//       </Link>
//       <Link to="/status-update">
//         <FaClipboardCheck className="nav-icon" title="Status Update" />
//       </Link>
//       <Link to="/user-login">
//         <FaUser className="nav-icon" title="User Login" />
//       </Link>
//       <Link to="/settings">
//         <FaCog className="nav-icon" title="Settings" />
//       </Link>
//     </div>
//   );
// }

// export default SideNav;

import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaTicketAlt,
  FaPlus,
  FaCog,
  FaUser,
  FaClipboardCheck
} from 'react-icons/fa';
import '../styles/SideNav.css';

function SideNav() {
  return (
    <div className="side-nav">
      <Link to="/dashboard">
        <FaHome className="nav-icon" title="Dashboard" />
      </Link>
      <Link to="/tickets">
        <FaTicketAlt className="nav-icon" title="Tickets" />
      </Link>
      <Link to="/create-ticket">
        <FaPlus className="nav-icon" title="Create Ticket" />
      </Link>
      <Link to="/status-update">
        <FaClipboardCheck className="nav-icon" title="Status Update" />
      </Link>
      <Link to="/user-login">
        <FaUser className="nav-icon" title="User Login" />
      </Link>
      <Link to="/settings">
        <FaCog className="nav-icon" title="Settings" />
      </Link>
    </div>
  );
}

export default SideNav;
