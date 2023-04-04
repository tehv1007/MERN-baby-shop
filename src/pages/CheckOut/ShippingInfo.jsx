const ShippingInfo = ({ user, info, address }) => {
  return (
    <>
      <div
        role="table"
        aria-label="Review your information"
        className="bg-white border-gray-400 rounded border-solid border text-gray-700 text-sm leading-5 mb-10"
      >
        {/* Receiver's information */}
        <div
          role="row"
          className="items-baseline mx-4 py-3 flex justify-between"
        >
          <div className="pr-3 flex justify-between gap-10">
            <div role="cell" className="">
              <span className="text-gray-600">Contact</span>
            </div>
            <div role="cell" className="">
              <bdo className="" dir="ltr">
                {info.name}, {info.phoneNumber}, {info.email}
              </bdo>
            </div>
          </div>
          <div className="pr-3" role="cell">
            <a
              href={`/checkout/${user._id}/information`}
              className=""
              aria-label="Change contact information"
            >
              <span className="text-indigo-900 inline text-xs leading-4">
                Change
              </span>
            </a>
          </div>
        </div>

        {/* Shipping Address */}
        <div
          role="row"
          className="items-baseline border-gray-400 border-t mx-4 py-3 flex justify-between "
        >
          <div className="pr-3 flex justify-between gap-10 ">
            <div role="cell" className="">
              <span className="text-gray-600">Ship to</span>
            </div>
            <div role="cell" className="">
              <div className="">
                <address className="">
                  {info.detailAddress}, {address.ward}, {address.district},{" "}
                  {address.city}
                </address>
              </div>
            </div>
          </div>
          <div className="pr-3" role="cell">
            <a
              href={`/checkout/${user._id}/information`}
              className=""
              aria-label="Change contact information"
            >
              <span className="text-indigo-900 inline text-xs leading-4">
                Change
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingInfo;
