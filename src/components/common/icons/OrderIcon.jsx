const OrderIcon = (props) => {
  return (
    <svg
      {...props}
      stroke="currentColor"
      fill="none"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
      aria-hidden="true"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={12} cy={12} r={10} />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
};

export default OrderIcon;
