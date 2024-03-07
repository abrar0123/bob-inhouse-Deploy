import axios from 'axios';
import { useState } from 'react';
import { setCookie } from 'nookies';
import { useDispatch } from 'react-redux';
import { hideSignupModal } from '@/slices/userSlice';
import { saveToken } from '@/slices/authSlice';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(hideSignupModal());
  };

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    axios
      .post('/api/auth/register', { name, email, password })
      .then(async (res) => {
        const response = await res.data;
        setCookie(null, 'token', response.user.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        });
        dispatch(saveToken(response.user.token));

        setName('');
        setEmail('');
        setPassword('');
        setLoading(false);
        closeModal();
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
    <form className="form-style1">
      <div className="mb25">
        <label className="form-label fw600 dark-color">Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      {/* End Name */}

      <div className="mb25">
        <label className="form-label fw600 dark-color">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* End Email */}

      <div className="mb20">
        <label className="form-label fw600 dark-color">Password</label>
        <input
          className="form-control"
          placeholder="Enter Password"
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {/* End Password */}

      <div className="d-grid mb20">
        <button onClick={register} className="ud-btn btn-thm" type="submit">
          {loading ? (
            'Loading'
          ) : (
            <>
              Create account <i className="fal fa-arrow-right-long" />
            </>
          )}
        </button>
      </div>
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
      {/* <div className="hr_content mb20">
        <hr />
        <span className="hr_top_text">OR</span>
      </div>

      <div className="d-grid mb10">
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

export default SignUp;
