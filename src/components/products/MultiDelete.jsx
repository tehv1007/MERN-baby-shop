import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { deleteMultiProduct } from "../../services/productsService";
import Loader from "../common/Loader";
import { toast } from "react-toastify";

const MultiDelete = ({
  selectedProducts,
  setSelectedProducts,
  numSelected,
}) => {
  const ref = useRef();
  const btnRef = useRef();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (productIds) => deleteMultiProduct(productIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      ref.current.checked = false;
      toast.success("Successfully deleted all products!");
      setSelectedProducts([]);
    },
    onError: (err) => {
      toast.error(`Error deleting products: ${err}`);
    },
  });

  return (
    <div>
      <input type="checkbox" ref={ref} id="my-modal" className="modal-toggle" />
      <label htmlFor="my-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className="text-center">
            {/* Warning icon */}
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
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
            <h3 className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete these {numSelected} products?
            </h3>

            {/* Action buttons */}
            <div className="flex justify-center gap-4">
              <button
                className="btn btn-error text-white"
                onClick={() => mutation.mutate(selectedProducts)}
              >
                <div className="flex items-center gap-2">
                  {mutation.isLoading && <Loader />}
                  <span>Yes, I'm sure</span>
                </div>
              </button>
              <label
                ref={btnRef}
                htmlFor="my-modal"
                className="btn btn-outline"
              >
                No, cancel
              </label>
            </div>
          </div>
        </label>
      </label>
    </div>
  );
};

export default MultiDelete;
