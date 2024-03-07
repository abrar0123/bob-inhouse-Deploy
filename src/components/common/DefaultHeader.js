'use client';

import MainMenu from '@/components/common/MainMenu';
import LoginSignupModal from '@/components/common/login-signup-modal';
import { logout } from '@/slices/authSlice';
import { removeAllComparisonPools, showSignupModal } from '@/slices/userSlice';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DefaultHeader = () => {
  const [navbar, setNavbar] = useState(false);

  const dispatch = useDispatch();

  const isSignupModalVisible = useSelector(
    (state) => state.user.isSignupModalVisible,
  );
  const token = useSelector((state) => state.auth.token);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeAllComparisonPools());
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
    return () => {
      window.removeEventListener('scroll', changeBackground);
    };
  }, []);

  return (
    <>
      <header
        className={`header-nav nav-homepage-style light-header menu-home4 main-menu ${
          navbar ? 'sticky slideInDown animated' : ''
        }`}
      >
        <nav className="posr">
          <div className="container posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos mr40">
                    <Link className="header-logo logo1" href="/">
                      <Image
                        width={138}
                        height={44}
                        src="/images/header-logo2.svg"
                        alt="Header Logo"
                      />
                    </Link>
                    <Link className="header-logo logo2" href="/">
                      <Image
                        width={138}
                        height={44}
                        src="/images/header-logo2.svg"
                        alt="Header Logo"
                      />
                    </Link>
                  </div>
                  <MainMenu />
                </div>
              </div>

              <div className="col-auto">
                <div className="d-flex align-items-center">
                  {token ? (
                    <span
                      onClick={handleLogout}
                      className="login-info d-flex align-items-cente mx-2 mx-xl-4"
                      role="button"
                    >
                      <i className="far fa-user-circle fz16 me-2" />{' '}
                      <span className="d-none d-xl-block">Logout</span>
                    </span>
                  ) : (
                    <span
                      onClick={() => dispatch(showSignupModal())}
                      className="login-info d-flex align-items-cente mx-2 mx-xl-4"
                      role="button"
                    >
                      <i className="far fa-user-circle fz16 me-2" />{' '}
                      <span className="d-none d-xl-block">
                        Login / Register
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {isSignupModalVisible && (
        <div className="signup-modal">
          <div
            className="signup-modal-new"
            style={{
              display: 'block !important',
              background: 'rgba(0,0,0,0.7)',
            }}
          >
            <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
              <LoginSignupModal />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DefaultHeader;
