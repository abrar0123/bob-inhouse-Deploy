import { saveToken } from '@/slices/authSlice';
import { hideSignupModal } from '@/slices/userSlice';
import axios from 'axios';
import { setCookie } from 'nookies';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(hideSignupModal());
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post('/api/auth/login', { email, password })
      .then(async (res) => {
        const response = await res.data;
        setCookie(null, 'token', response.user.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        });
        dispatch(saveToken(response.user.token));
        closeModal();
        setEmail('');
        setPassword('');
        setLoading(false);
      })
      .catch((res) => {
        setLoading(false);
        if (res?.response?.data?.error) {
          setError(res.response.data.error);
        } else {
          setError('An error has occurred. Please try again later');
        }
      });
  };

  return (
    <form onSubmit={login} className="form-style1">
      <div className="mb25">
        <label className="form-label fw600 dark-color">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      {/* End email */}

      <div className="mb15">
        <label className="form-label fw600 dark-color">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      {/* End Password */}

      <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb10">
        <label className="custom_checkbox fz14 ff-heading">
          Remember me
          <input type="checkbox" defaultChecked="checked" />
          <span className="checkmark" />
        </label>
        <a className="fz14 ff-heading" href="#">
          Lost your password?
        </a>
      </div>
      {/* End  Lost your password? */}

      <div className="d-grid mb20">
        <button className="ud-btn btn-thm" type="submit">
          {loading ? (
            'Loading'
          ) : (
            <>
              Sign in <i className="fal fa-arrow-right-long" />
            </>
          )}
        </button>
      </div>
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
      {/* End submit */}

      {/* <div className="hr_content mb20">
        <hr />
        <span className="hr_top_text">OR</span>
      </div> */}

      {/* <div className="d-grid mb10">
        <button className="ud-btn btn-white" type="button">
          <i className="fab fa-google" /> Continue Google
        </button>
      </div>
      <div className="d-grid mb10">
        <button className="ud-btn btn-fb" type="button">
          <i className="fab fa-facebook-f" /> Continue Facebook
        </button>
      </div>
      <div className="d-grid mb20">
        <button className="ud-btn btn-apple" type="button">
          <i className="fab fa-apple" /> Continue Apple
        </button>
      </div> */}
    </form>
  );
};

export default SignIn;
