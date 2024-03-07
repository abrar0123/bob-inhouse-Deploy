import Link from 'next/link';

const Category = () => {
  const categories = [
    { icon: 'flaticon-location', text: 'Binnen – en Buitenbad' },
    { icon: 'flaticon-location', text: 'Binnenbad' },
    { icon: 'flaticon-location', text: 'Buitenbad' },
    { icon: 'flaticon-location', text: 'Subtropisch Zwembad' },
    { icon: 'flaticon-location', text: 'Zwemschool (Particulier)' },
  ];

  return (
    <div className="home4-icon-style mt30 d-none d-sm-flex animate-up-4">
      {categories.map((category, index) => {
        return (
          <Link
            key={index}
            href={`/vergelijk-zwembad?category=${category.text}`}
            className="d-flex align-items-center dark-color ff-heading me-4"
          >
            <i className={`icon mr10 ${category.icon}`} /> {category.text}
          </Link>
        );
      })}
    </div>
  );
};

export default Category;
