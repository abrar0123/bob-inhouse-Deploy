const Features = () => {
  // Define an array of feature objects
  const features = [
    {
      icon: 'flaticon-security',
      title: 'Step 1',
      description: 'Fill in your adress or find your location (GPS)',
    },
    {
      icon: 'flaticon-keywording',
      title: 'Step 2',
      description:
        'Click what you are looking for like swimminglessons or banenzwemmen',
    },
    {
      icon: 'flaticon-investment',
      title: 'Step 3',
      description: 'Pick a swimmingpool or swimmingschool',
    },
  ];

  return (
    <>
      {features.map((feature, index) => (
        <div className="list-one d-flex align-items-start mb30" key={index}>
          <span className={`list-icon flex-shrink-0 ${feature.icon}`} />
          <div className="list-content flex-grow-1 ml20">
            <h6 className="mb-1">{feature.title}</h6>
            <p className="text mb-0 fz15">{feature.description}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Features;
