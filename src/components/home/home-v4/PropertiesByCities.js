'use client';

import Error from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

const cities = [
  {
    id: 0,
    img: require('../../../../public/images/home/cities/Amsterdam.png'),
  },
  {
    id: 1,
    img: require('../../../../public/images/home/cities/Utrecht.png'),
  },
  {
    id: 2,
    img: require('../../../../public/images/home/cities/Rotterdam.png'),
  },
  {
    id: 3,
    img: require('../../../../public/images/home/cities/Den Haag.png'),
  },
  {
    id: 4,
    img: require('../../../../public/images/home/cities/Eindhoven.png'),
  },
  {
    id: 5,
    img: require('../../../../public/images/home/cities/s-Hertogenbosch.png'),
  },
];
const PropertiesByCities = () => {
  const { popularCities, popularCitiesLoading, popularCitiesError } =
    useSelector((state) => state.cities);
  const router = useRouter();

  const newPopularCities = popularCities;
  return popularCitiesLoading ? (
    <Loading />
  ) : popularCitiesError ? (
    <Error error={popularCitiesError} />
  ) : !popularCities || popularCities.length === 0 ? (
    <></>
  ) : (
    <section className="pb40-md pb90">
      <div className="container">
        <div
          className="row align-items-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="col-lg-9">
            <div className="main-title2">
              <h2 className="title">Properties by Cities</h2>
              <p className="paragraph">
                Aliquam lacinia diam quis lacus euismod
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-start text-lg-end mb-3"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up" data-aos-delay="300">
            <div className="property-city-slider position-relative">
              <>
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  breakpoints={{
                    300: {
                      slidesPerView: 2,
                      spaceBetween: 15,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    1024: {
                      slidesPerView: 5,
                    },
                    1200: {
                      slidesPerView: 6,
                    },
                  }}
                >
                  {popularCities.map((city, index) => (
                    <SwiperSlide key={index}>
                      <div className="item">
                        <div className="feature-style3 text-center">
                          <div className="feature-img rounded-circle">
                            <Image
                              width={200}
                              height={200}
                              className="cover"
                              objectFit="cover"
                              src={cities[index]?.img}
                              alt="cities"
                            />
                          </div>
                          <div className="feature-content pt25">
                            <div className="top-area">
                              <h6 className="title mb-1">
                                <div
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => {
                                    router.push(
                                      `/vergelijk-zwembad?locations=${city.name}`
                                    );
                                  }}
                                >
                                  {city.name}
                                </div>
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertiesByCities;
