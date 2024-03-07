/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'www.zwembadvergelijker.nl',
      'maps.googleapis.com',
      'zvblogpostimages.s3.eu-west-3.amazonaws.com',
      'portfolioblogs.s3.eu-north-1.amazonaws.com',
      'static.independent.co.uk',
    ],
  },
};

module.exports = nextConfig;
