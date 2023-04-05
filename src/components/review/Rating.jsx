import { Link } from "react-scroll";
import { fetchReviews } from "../../services/fetchReviews";

export default function Rating({ productId, type = "type3" }) {
  const { avgRating, numReviews } = fetchReviews(productId);

  const textStyle = { color: "blue" };

  const type1 =
    numReviews >= 0 ? (
      <span className="inline-block pl-2">Based on {numReviews} reviews</span>
    ) : (
      <span></span>
    );

  const type2 =
    numReviews >= 0 ? (
      <span className="inline-block pl-2 underline cursor-pointer">
        <Link to="reviews" smooth={true} duration={500}>
          <span style={textStyle}>{numReviews} reviews</span>
        </Link>
      </span>
    ) : (
      <span></span>
    );

  const type3 =
    numReviews >= 0 ? <span>{"(" + numReviews + ")"}</span> : <span></span>;

  return (
    <>
      {numReviews ? (
        <div className="rating">
          <span>
            <i
              className={
                avgRating >= 1
                  ? "fa fa-star"
                  : avgRating >= 0.5
                  ? "fa fa-star-half-o"
                  : "fa fa-star-o"
              }
            ></i>
          </span>
          <span>
            <i
              className={
                avgRating >= 2
                  ? "fa fa-star"
                  : avgRating >= 1.5
                  ? "fa fa-star-half-o"
                  : "fa fa-star-o"
              }
            ></i>
          </span>
          <span>
            <i
              className={
                avgRating >= 3
                  ? "fa fa-star"
                  : avgRating >= 2.5
                  ? "fa fa-star-half-o"
                  : "fa fa-star-o"
              }
            ></i>
          </span>
          <span>
            <i
              className={
                avgRating >= 4
                  ? "fa fa-star"
                  : avgRating >= 3.5
                  ? "fa fa-star-half-o"
                  : "fa fa-star-o"
              }
            ></i>
          </span>
          <span>
            <i
              className={
                avgRating >= 5
                  ? "fa fa-star"
                  : avgRating >= 4.5
                  ? "fa fa-star-half-o"
                  : "fa fa-star-o"
              }
            ></i>
          </span>
          {type == "type3" ? type3 : type == "type2" ? type2 : type1}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
