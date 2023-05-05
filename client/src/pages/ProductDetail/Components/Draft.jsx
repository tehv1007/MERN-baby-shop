import { TbHeart, TbTruckDelivery } from "react-icons/tb";
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
} from "react-share";

const Draft = ({ product }) => {
  return (
    <>
      <div className="product-detail__detail sticky-element">
        {/* Additional information */}
        <div className="product-detail__vendor">
          by
          <a
            className="link link-accent pl-2"
            href="/collections/vendors?q=Noodoll"
          >
            Noodoll
          </a>
        </div>
        <div className="product-detail__type type-wrapper">
          Type:
          <a
            className="link link-accent pl-2"
            href="/collections/types?q=Plush%20Toy"
          >
            Plush Toy
          </a>
        </div>
        <div>
          SKU:
          <span className="pl-2">T99677</span>
        </div>

        {/* Information */}
        <div
          tabIndex={0}
          className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
        >
          <div className="collapse-title text-lg font-medium">
            <div className="flex gap-2 items-center">
              <TbTruckDelivery />
              <span className="content-with-icon__beside">
                Shipping &amp; Delivery
              </span>
            </div>
          </div>
          <div className="collapse-content">
            <p>
              To guarantee next day delivery please select Express Delivery at
              checkout and place your order before 13:00
            </p>
          </div>
        </div>

        <div
          tabIndex={0}
          className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
        >
          <div className="collapse-title text-lg font-medium">
            <div className="flex gap-2 items-center">
              <TbHeart />
              <span className="content-with-icon__beside">
                Plush toy care guide
              </span>
            </div>
          </div>
          <div className="collapse-content">
            <p>
              Out plush toys are machine washable on a cold (30º max) and gentle
              cycle. Make sure to&nbsp;air-dry your toy to keep it in the best
              condition.
            </p>
          </div>
        </div>

        <div className="text-lg font-medium my-4">
          <p>
            <strong>Is this a gift?</strong>
            <br />
            Add a gift message in the basket
          </p>
        </div>

        {/* Social Sharing */}
        <div className="sharing social-links">
          <span className="sharing-label">Share</span>
          <ul className="sharing-list flex gap-3">
            <FacebookShareButton url={window.location.href}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>

            <TwitterShareButton url={window.location.href}>
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>

            <PinterestShareButton
              url={window.location.href}
              media={product.photos[0]}
            >
              <PinterestIcon size={32} round={true} />
            </PinterestShareButton>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Draft;
