import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { InlineShareButtons } from "sharethis-reactjs";
import fetchImage from "../../services/fetchImage";
import axios from "axios";
import { AiOutlineArrowLeft } from "react-icons/ai";
import GlobalSpinner from "../../components/common/GlobalSpinner";
import Loader from "../../components/common/Skeleton/Loader";
import Progress from "../../components/common/Progress";

const SocialSharing = ({ post, postId }) => {
  return (
    <div className="flex justify-center items-center gap-5">
      <h1 className="text-xl font-medium leading-6 mb-3 text-center capitalize">
        Share This Post
      </h1>
      <InlineShareButtons
        config={{
          alignment: "center", // alignment of buttons (left, center, right)
          color: "social", // set the color of buttons (social, white)
          enabled: true, // show/hide buttons (true, false)
          font_size: 16, // font size for the buttons
          labels: "null", // button labels (cta, counts, null)
          language: "en", // which language to use (see LANGUAGES)
          networks: [
            // which networks to include (see SHARING NETWORKS)
            "whatsapp",
            "linkedin",
            "messenger",
            "facebook",
            "twitter",
          ],
          padding: 12, // padding within buttons (INTEGER)
          radius: 4, // the corner radius on each button (INTEGER)
          show_total: false,
          size: 40, // the size of each button (INTEGER)

          // OPTIONAL PARAMETERS
          url: `${import.meta.env.VITE_CLIENT_URL}/blog/${postId}`, // (defaults to current url)
          image: `https://heyfarming.com/wp-content/uploads/2023/01/3.webp`, // (defaults to og:image or twitter:image)
          description: `${post.excerpt.rendered}`, // (defaults to og:description or twitter:description)
          title: `${post.title.rendered}`, // (defaults to og:title or twitter:title)
          message: "custom email text", // (only for email sharing)
          subject: "custom email subject", // (only for email sharing)
          username: "custom twitter handle", // (only for twitter sharing)
        }}
      />
      <hr />
    </div>
  );
};

const ImageRender = ({ post }) => {
  const featureMedia = post.featured_media;
  // console.log(featureMedia);
  const { data: imageSrc, isLoading } = useQuery({
    queryKey: ["media", featureMedia],
    queryFn: () => fetchImage(featureMedia),
  });

  if (isLoading) {
    return <Progress />;
  }

  // console.log(imageSrc);
  return (
    <img className="mx-auto w-full" src={imageSrc} alt={post.title.rendered} />
  );
};

const PostPage = () => {
  const { postId } = useParams();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () =>
      axios.get(`https://heyfarming.com/wp-json/wp/v2/blog/${postId}`),
  });
  if (isLoading) {
    return <GlobalSpinner />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  console.log({ data });
  const { data: post } = data;

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateFormatted = new Date(post.date);

  return (
    <section className="max-w-screen-xl mx-auto flex flex-grow w-full">
      {/* Container */}
      <div className="px-4 flex items-center justify-center">
        {/* Layout */}
        <div className="text-center">
          <h1
            className="text-xl font-medium leading-6 mb-3 capitalize"
            dangerouslySetInnerHTML={{
              __html: post.title.rendered,
            }}
          ></h1>
          <div className="text-center flex gap-5 justify-center mb-5">
            <span className="">
              <time dateTime={post.date}>
                {dateFormatted.toLocaleString("en-US", options)}
              </time>
            </span>
            <span className="font-medium">
              <span>Admin</span>
            </span>
          </div>

          {/* Hero */}
          <div className="mx-auto">
            <ImageRender post={post} />
          </div>

          {/* post content */}
          <div className="text-left">
            <span
              dangerouslySetInnerHTML={{
                __html: post.content.rendered,
              }}
            ></span>
          </div>

          {/* Share */}
          <div className="">
            <SocialSharing post={post} postId={postId} />
          </div>

          {/* Navigation */}
          <div className="mt-10 text-indigo-900 flex text-lg justify-center leading-7 text-center">
            <Link
              to="/blog"
              className="flex items-center gap-2 justify-center text-lg"
            >
              <AiOutlineArrowLeft />
              <span className="w-full">Back to blog</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostPage;
