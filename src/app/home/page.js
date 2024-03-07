import MobileMenu from "@/components/common/mobile-menu";
import DefaultHeader from "@/components/common/DefaultHeader";
import PropertiesByCities from "@/components/home/home-v4/PropertiesByCities";
import Hero from "@/components/home/home-v4/hero";
import Features from "@/components/home/home-v4/Features";
import Link from "next/link";
import FilterProperties from "@/components/home/home-v4/FilterProperties";
import Footer from "@/components/home/home-v4/footer";
import UserReviews from "@/components/home/home-v4/UserReviews";

export const metadata = {
  title: "Home",
};

const Home = () => {
  return (
    <>
      <DefaultHeader />
      <MobileMenu />

      <section className="home-banner-style4 p0 bgc-white">
        <div className="home-style4 maxw1600 bdrs24 position-relative mx-auto mx20-lg">
          <div className="container">
            <div className="row">
              <div className="col-xl-9">
                <Hero />
              </div>
            </div>
          </div>
        </div>
      </section>

      <PropertiesByCities />

      <section className="pt-0 pb60">
        <div className="container">
          <FilterProperties />
        </div>
      </section>

      {/* Abut intro */}
      <section className="pt30 pb-0">
        <div className="cta-banner3 bgc-thm-light mx-auto maxw1600 pt100 pt60-lg pb90 pb60-lg bdrs24 position-relative overflow-hidden mx20-lg">
          <div className="container">
            <div className="row">
              <div
                className="col-md-6 col-lg-5 pl30-md pl15-xs"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                <div className="mb30">
                  <h2 className="title text-capitalize">
                    Let’s find the right <br className="d-none d-md-block" />{" "}
                    swimming school for you
                  </h2>
                </div>
                <div className="why-chose-list style2">
                  <Features />
                </div>
                <Link href="#" className="ud-btn btn-dark">
                  Learn More
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Abut intro */}

      {/* Our Testimonials */}
      <section className="pt80 pb40-md">
        <div className="container">
          


          <div className="row">
            <div className="col-lg-12">
              <div
                className="testimonial-slider"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <UserReviews />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default Home;
