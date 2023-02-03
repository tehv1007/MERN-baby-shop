import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loader from "../../components/common/Loader";
import fetchImage from "../../services/fetchImage";

const PostCardItem = ({ featureMedia, title, content, author, url, date }) => {
  const { data: imageSrc, isLoading } = useQuery({
    queryKey: ["media", featureMedia],
    queryFn: () => fetchImage(featureMedia),
  });

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateFormated = new Date(date);

  if (isLoading) return <Loader />;

  return (
    <>
      {/* Container */}
      <div className="max-w-screen-sm mx-auto">
        {/* Layout */}
        <div className="flex flex-col text-sm leading-5 mb-8 px-4 text-center">
          {/* image */}
          <Link to={url}>
            <div className="w-full">
              <img
                src={imageSrc}
                alt=""
                className="rounded-xl object-cover transition"
              />
            </div>
          </Link>

          {/* Content */}
          <div>
            <Link
              to={url}
              className="block text-xl font-medium leading-6 my-4 capitalize"
              dangerouslySetInnerHTML={{ __html: title }}></Link>
            <div
              className="text-black text-sm leading-5 mb-4 text-left"
              dangerouslySetInnerHTML={{ __html: content }}></div>
            <div className="flex gap-5 justify-center flex-nowrap">
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 23.18 24" width={14} height={14}>
                  <path
                    id="admin"
                    d="M11.853.266a6.3,6.3,0,0,0-6.177,6.4,6.467,6.467,0,0,0,2.769,5.333A11.976,11.976,0,0,0,.264,23.462a.815.815,0,0,0,.226.569.76.76,0,0,0,.549.234H22.674a.787.787,0,0,0,.77-.8,11.975,11.975,0,0,0-8.179-11.469,6.465,6.465,0,0,0,2.772-5.333A6.3,6.3,0,0,0,11.853.266Zm0,1.594a4.711,4.711,0,0,1,4.637,4.8,4.711,4.711,0,0,1-4.637,4.8,4.706,4.706,0,0,1-4.631-4.8A4.706,4.706,0,0,1,11.853,1.859Zm0,11.2a10.113,10.113,0,0,1,9.9,9.6H1.964A10.107,10.107,0,0,1,11.853,13.062Z"
                    transform="translate(-0.264 -0.266)"
                  />
                </svg>
                {author}
              </div>

              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" width={14} height={14}>
                  <g id="_01_align_center" data-name="01 align center">
                    <path d="M21,2H18V0H16V2H8V0H6V2H3A3,3,0,0,0,0,5V24H24V5A3,3,0,0,0,21,2ZM2,5A1,1,0,0,1,3,4H21a1,1,0,0,1,1,1V8H2ZM2,22V10H22V22Z" />
                    <rect x={15} y={13} width={2} height={2} />
                    <rect x={11} y={13} width={2} height={2} />
                    <rect x={7} y={13} width={2} height={2} />
                    <rect x={15} y={17} width={2} height={2} />
                    <rect x={11} y={17} width={2} height={2} />
                    <rect x={7} y={17} width={2} height={2} />
                  </g>
                </svg>
                <time dateTime={date}>
                  {dateFormated.toLocaleString("en-US", options)}
                </time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCardItem;
