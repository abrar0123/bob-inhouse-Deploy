import Image from 'next/image';
import Link from 'next/link';
import ContactMeta from './ContactMeta';
import AppWidget from './AppWidget';
import Subscribe from './Subscribe';
import MenuWidget from './MenuWidget';
import Copyright from './Copyright';

const Footer = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-lg-6">
            <div className="footer-widget mb-4 mb-lg-5">
              <Link className="footer-logo" href="/">
                <Image
                  width={138}
                  height={44}
                  className="mb40"
                  src="/images/header-logo.svg"
                  alt=""
                />
              </Link>

              <ContactMeta />
            </div>
          </div>

          <MenuWidget />
          <p className="text-white text-center pb10">
            We accept no liability for such errors. All information on our
            websites is therefore subject to printing and typing errors.
          </p>
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}

      <Copyright />
      {/* End copyright */}
    </>
  );
};

export default Footer;
