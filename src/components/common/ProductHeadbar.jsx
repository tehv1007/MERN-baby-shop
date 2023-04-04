import ColumnDisplayIcon from "./icons/ColumnDisplayIcon";
import FilterIcon from "./icons/FilterIcon";
import RowDisplayIcon from "./icons/RowDisplayIcon";

const ProductHeadbar = () => {
  return (
    <div>
      {/* Container */}
      <div className="mt-6 mx-6 py-2 px-3 lg:py-3 flex justify-between border border-gray-200 rounded-lg">
        {/* Layout */}
        <div className="flex gap-3">
          {/* display */}
          <button>
            <ColumnDisplayIcon />
          </button>
          <button>
            <RowDisplayIcon />
          </button>
        </div>
        <div>
          {/* Filter */}
          <button className="flex gap-2 px-3 items-center md:hidden">
            <FilterIcon />
            <p>Fiter and sort</p>
          </button>
        </div>
        <div className="hidden md:flex gap-2 items-center">
          {/* Sort by */}
          <p>Sort by:</p>
          <select
            name="Sorting"
            defaultValue="default"
            className="select select-bordered border rounded-lg p-1"
          >
            <option value="default" disabled>
              Choose your option
            </option>
            <option value="lowtohigh">Price: low to high</option>
            <option value="hightolow">Price: high to low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductHeadbar;
