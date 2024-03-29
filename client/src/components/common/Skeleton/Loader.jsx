import Skeleton from "react-loading-skeleton";

const Loader = () => {
  return (
    <>
      {[...Array(8).keys()].map((item) => (
        <div key={item}>
          <Skeleton height={230} />
          <Skeleton width={370} />
          <Skeleton height={100} />
          <Skeleton />
        </div>
      ))}
    </>
  );
};

export default Loader;
