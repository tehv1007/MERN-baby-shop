import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Progress from "../../../components/common/Progress";

const CancelModal = ({ id }) => {
  const ref = useRef();
  const btnRef = useRef();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (orderId) => axios.put(`/orders/${orderId}/cancel`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      ref.current.checked = false;
      toast.success("Successfully cancelled your order!");
    },
    onError: (err) => {
      toast.error(`Error: ${err.response.data.message}:`);
      ref.current.checked = false;
    },
  });
  return (
    <div>
      <input type="checkbox" ref={ref} id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className="text-center">
            {/* Warning icon */}
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 text-gray-400 w-14 h-14"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            {/* Title */}
            <h3 className="mb-6 text-lg font-normal text-gray-500">
              Are you sure you want to cancel this order?
            </h3>

            {/* Action buttons */}
            <div className="flex justify-center gap-4">
              <button
                className="btn btn-error text-white"
                onClick={() => mutation.mutate(id)}
              >
                <div className="flex items-center gap-2">
                  {mutation.isLoading && <Progress />}
                  <span>Yes, I'm sure</span>
                </div>
              </button>
              <label ref={btnRef} htmlFor={id} className="btn btn-outline">
                No, cancel
              </label>
            </div>
          </div>
        </label>
      </label>
    </div>
  );
};

export default CancelModal;
