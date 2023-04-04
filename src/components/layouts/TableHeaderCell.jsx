import { BsArrowDown, BsArrowUp } from "react-icons/bs";

const TableHeaderCell = ({
  text,
  title,
  column,
  sortConfig,
  getSortDirection,
  requestSort,
}) => {
  return (
    <th className={`font-normal text-[16px] ${text} uppercase`}>
      <button
        type="button"
        className={getSortDirection(column)}
        onClick={() => requestSort(column)}
      >
        {title}
        {sortConfig.key === column && (
          <span className="ml-2">
            {sortConfig.direction === "ascending" ? (
              <BsArrowUp className="inline-block w-4 h-4" />
            ) : (
              <BsArrowDown className="inline-block w-4 h-4" />
            )}
          </span>
        )}
      </button>
    </th>
  );
};

export default TableHeaderCell;
