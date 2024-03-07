import React from 'react';

const Social = () => {
  const socialIcons = [
    {
      icon: 'fab fa-facebook-f',
      link: 'https://www.facebook.com/zwembadvergelijker/?modal=admin_todo_tour',
    },
    { icon: 'fab fa-twitter', link: 'https://twitter.com/zwembadvergeli1' },
    {
      icon: 'fab fa-instagram',
      link: 'https://www.instagram.com/zwembadvergelijker/',
    },
    {
      icon: 'fab fa-pinterest',
      link: 'https://nl.pinterest.com/zwembadvergelijker/',
    },
  ];

  return (
    <div className="social-style1">
      <a className="me-2 fw600 fz15 text-white" href="#">
        Follow us
      </a>
      {socialIcons.map((socials, index) => (
        <a key={index} href={socials.link} target="_blank">
          <i className={socials.icon + ' list-inline-item'} />
        </a>
      ))}
    </div>
  );
};

export default Social;
