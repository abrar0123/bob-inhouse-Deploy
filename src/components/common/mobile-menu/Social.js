const Social = () => {
  const socialLinks = [
    {
      id: 1,
      iconClass: "fab fa-facebook-f",
      href: "https://www.facebook.com/zwembadvergelijker/",
    },
    {
      id: 2,
      iconClass: "fab fa-twitter",
      href: "https://twitter.com/zwembadvergeli1",
    },
    {
      id: 3,
      iconClass: "fab fa-instagram",
      href: "https://www.instagram.com/zwembadvergelijker/",
    },
    {
      id: 4,
      iconClass: "fab fa-pinterest",
      href: "https://nl.pinterest.com/zwembadvergelijker/",
    },
  ];

  return (
    <>
      {socialLinks.map((link) => (
        <a className="me-3" target="_blank" href={link.href} key={link.id}>
          <i className={link.iconClass}></i>
        </a>
      ))}
    </>
  );
};

export default Social;
