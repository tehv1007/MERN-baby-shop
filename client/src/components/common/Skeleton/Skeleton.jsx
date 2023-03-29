import Skeleton from "react-loading-skeleton";

const SkeletonBlock = () => {
  return (
    <>
      {[...Array(8).keys()].map((item) => (
        <div key={item}>
          <Skeleton height={180} />
          <Skeleton width={100} />
          <Skeleton />
        </div>
      ))}
    </>
  );
};

export default SkeletonBlock;
