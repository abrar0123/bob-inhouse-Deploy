import Wrap from "@/components/singleListing/Wrap";

export const metadata = {
  title: "Homez - Real Estate",
};

const SingleV4 = ({ params }) => {
  const { id } = params;

  return <Wrap id={id} />;
};

export default SingleV4;
