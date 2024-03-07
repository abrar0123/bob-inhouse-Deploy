import Link from 'next/link';
import React from 'react';

const MenuWidget = () => {
  const swimmingSchoolsInNetherlands = [
    'Amsterdam',
    'Utrecht',
    'Rotterdam',
    'The Hague',
    'Haarlem',
    'Eindhoven',
    'S-Hertogenbosch',
  ];

  const swimmingSchoolsCosts = [
    'Amsterdam',
    'The Hague',
    'Rotterdam',
    'Utrecht',
    'The Eindhoven Region',
    "The 'S-Hertogenbosch Region",
    'The Haarlem Region',
  ];

  return (
    <>
      <div className="col-sm-6 col-lg-3">
        <div className="footer-widget mb-4 mb-lg-5 ps-0 ps-lg-5">
          <div className="link-style1 mb-3">
            <h6 className="mb25 text-white">
              All Swimming Pools In The Netherlands
            </h6>
            <ul className="ps-0">
              {swimmingSchoolsInNetherlands.map((item, index) => (
                <li key={index}>
                  <Link href={`/vergelijk-zwembad?city=${item}`}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-3">
        <div className="footer-widget mb-4 mb-lg-5 ps-0 ps-lg-5">
          <div className="link-style1 mb-3">
            <h6 className="mb25 text-white">Swimming Lessons Costs In</h6>
            <ul className="ps-0">
              {swimmingSchoolsCosts.map((item, index) => (
                <li key={index}>
                  <Link href={`/vergelijk-zwembad?cost=${item}`}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* End .col */}
    </>
  );
};

export default MenuWidget;
