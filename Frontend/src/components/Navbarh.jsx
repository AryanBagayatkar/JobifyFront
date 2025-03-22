import React from 'react';
import { NavLink , Link , useNavigate ,useLocation } from 'react-router-dom';
import { Navbar, Container, Nav, Form, FormControl, InputGroup } from 'react-bootstrap';
import { Search, Bell } from 'react-bootstrap-icons';
import { LuLogIn } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { TbMessageDots } from "react-icons/tb";
import { LiaUserFriendsSolid } from "react-icons/lia";

const Navbarh = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;

  const handleLogout = () => {
    navigate("/"); // Redirect to login page
  };

  return (
    <Navbar expand="lg" className="linkedin-navbar sticky-top">
      <Container>
        <Navbar.Brand href="/" className="navbar-brand">
          <h1>Job<span className='logo'>ify</span></h1>
        </Navbar.Brand>

     
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {/* Right Side Icons */}
          <Nav className="ml-auto align-items-center navri">
             {/* Search Bar */}
          {/* <div className="search-container">
            <Form>
              <InputGroup>
                <InputGroup.Text className="search-icon">
                  <Search />
                </InputGroup.Text>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="search-input"
                />
              </InputGroup>
            </Form>
          </div> */}
            <Nav.Link as={NavLink} to="/associations" className="nav-icon">
              <LiaUserFriendsSolid size={20} />
              <p>Friends</p>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/notifications" className="nav-icon">
              <Bell size={20} />
              <p>Notifications</p>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/messages" className="nav-icon">
              <TbMessageDots size={20} />
              <p>Message</p>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login" className="nav-icon">
            <ul >
            {username ? (
              <>
                <li>
                  <button className=" nav-link nav-icon" onClick={handleLogout}>
                    <FiLogOut  />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link className="nav-link nav-icon text-decoration-none text-dark" to="/login">
                <LuLogIn />
                  Login
                </Link>
              </li>
            )}
          </ul>
          </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarh;
