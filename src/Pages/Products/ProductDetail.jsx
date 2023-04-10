import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageSlider from "../../components/common/ImageSlider";
import Rating from "../../components/products/Rating";
import GlobalSpinner from "../../components/common/GlobalSpinner";
import Layout from "../../components/layout/Layout";
import PageTitle from "../../components/common/PageTitle";
import { getProductDetail } from "../../hooks/useProduct";
import DOMPurify from "dompurify";

const ProductDetail = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const { productId } = useParams();
  const { data, isLoading } = getProductDetail(productId);

  if (isLoading) return <GlobalSpinner />;
  const { data: product } = data;

  return (
    <Layout>
      <PageTitle title="Products Detail" />

      <section className="max-w-screen-lg mx-auto px-5 py-4">
        {/* Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Layout */}
          <div className="w-full">
            {/* === Image === */}
            <div>
              {/* main img */}
              <img src={product.photos[imageIndex]} className="rounded-md" />
            </div>
            {/*slider images */}
            <div>
              <span className="lg:mt-2 flex rounded-md md:gap-4 gap-5 py-2">
                <ImageSlider
                  imageIndex={imageIndex}
                  imageList={product.photos}
                  setImageIndex={setImageIndex}
                />
              </span>
            </div>
          </div>
          <div>
            {/* === ContentBox ===*/}
            <div className="md:pl-6 md:w-[480px] lg:w-[500px] xl:w-[590px]">
              {/* Product info */}
              <span>
                {/* title */}
                <h4 className="mb-[10px] text-sm text-gray-500 uppercase">
                  {product.category}
                </h4>
                <h2 className="mb-[10px] font-medium sm:text-lg md:text-xl lg:text-2xl">
                  {product.title}
                </h2>
                <div className="flex gap-1.5">
                  <p className="mb-[10px] font-bold sm:text-xl lg:text-3xl">
                    ${product.price}
                  </p>
                </div>
              </span>

              {/* rating */}
              <div className="mb-[10px] flex gap-1">
                <Rating productId={productId} />
              </div>

              {/* description */}
              <div>
                <p
                  className="mb-[10px] font-[2px] text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product.description),
                  }}
                >
                </p>
              </div>

              {/* Edit product */}
              <Link to={"edit"}>
                <button type="submit" className="btn btn-primary mt-5">
                  <div className="flex items-center gap-2">
                    <span>Edit Product</span>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
