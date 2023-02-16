export default function RatingItem({ avgRating, numReviews = -1 }) {
  return (
    <div className="rating">
      <span>
        <i
          className={
            avgRating >= 1
              ? "fa fa-star"
              : avgRating >= 0.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }></i>
      </span>
      <span>
        <i
          className={
            avgRating >= 2
              ? "fa fa-star"
              : avgRating >= 1.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }></i>
      </span>
      <span>
        <i
          className={
            avgRating >= 3
              ? "fa fa-star"
              : avgRating >= 2.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }></i>
      </span>
      <span>
        <i
          className={
            avgRating >= 4
              ? "fa fa-star"
              : avgRating >= 3.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }></i>
      </span>
      <span>
        <i
          className={
            avgRating >= 5
              ? "fa fa-star"
              : avgRating >= 4.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }></i>
      </span>
      {numReviews >= 0 ? <span>{"(" + numReviews + ")"}</span> : <span></span>}
    </div>
  );
}
