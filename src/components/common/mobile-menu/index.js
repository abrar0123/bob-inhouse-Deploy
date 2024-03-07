"use client";
import Link from "next/link";
import Image from "next/image";
import ContactInfo from "./ContactInfo";
import Social from "./Social";
import ProSidebarContent from "./ProSidebarContent";
import { useDispatch, useSelector } from "react-redux";
import { removeAllComparisonPools, showSignupModal } from "@/slices/userSlice";
import { logout } from "@/slices/authSlice";

const MobileMenu = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const handleUserClick = () => {
    if (token) {
      dispatch(logout());
      ispatch(removeAllComparisonPools());
    } else {
      dispatch(showSignupModal());
    }
  };

  return (
    <div className="mobilie_header_nav stylehome1">
      <div className="mobile-menu">
        <div className="header innerpage-style">
          <div className="menu_and_widgets">
            <div className="mobile_menu_bar d-flex justify-content-between align-items-center">
              <a
                className="menubar"
                href="#"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileMenu"
                aria-controls="mobileMenu"
              >
                <Image
                  width={25}
                  height={9}
                  src="/images/mobile-dark-nav-icon.svg"
                  alt="mobile icon"
                />
              </a>
              <Link className="mobile_logo" href="/">
                <Image
                  width={138}
                  height={44}
                  src="/images/header-logo2.svg"
                  alt="logo"
                />
              </Link>
              <span
                onClick={handleUserClick}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <span className="icon fz18 far fa-user-circle" />{" "}
                {token && <span style={{ marginLeft: "4px" }}>Logout</span>}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* /.mobile-menu meta */}

      <div
        className="offcanvas offcanvas-start mobile_menu-canvas"
        tabIndex="-1"
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
        data-bs-scroll="true"
      >
        <div className="rightside-hidden-bar">
          <div className="hsidebar-header">
            <div
              className="sidebar-close-icon"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <span className="far fa-times"></span>
            </div>
            <h4 className="title">Welcome to Homez</h4>
          </div>
          {/* End header */}

          <div className="hsidebar-content ">
            <div className="hiddenbar_navbar_content">
              <ProSidebarContent />
              {/* End .hiddenbar_navbar_menu */}

              <div className="row pt30 pb30 bdrt1">
                <div className="col-auto">
                  <div className="social-style-sidebar d-flex align-items-center pl30">
                    <h6 className="me-4 mb-0">Follow us</h6>
                    <Social />
                  </div>
                </div>
              </div>

              {/* hiddenbar_footer */}
            </div>
          </div>
          {/* End hsidebar-content */}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
