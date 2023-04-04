import React from "react";

const SortingFilter = () => {
  const [sortingColumn, setSortingColumn] = useState(null);
  const [sortingDirection, setSortingDirection] = useState("asc");
  const [userInput, setUserInput] = useState("");
  const [rowData, setRowData] = useState([]);

  const sort = (column) => {
    if (sortingColumn === column) {
      setSortingDirection(sortingDirection === "asc" ? "desc" : "asc");
    } else {
      setSortingColumn(column);
      setSortingDirection("asc");
    }
  };

  const sortedAndFilteredData = useMemo(() => {
    const filteredData = filterData(rowData, userInput);
    const sortedData = sortData(filteredData, sortingColumn, sortingDirection);
    return sortedData;
  }, [rowData, userInput, sortingColumn, sortingDirection]);

  function filterData(rowData, userInput) {
    return rowData.filter((row) => {
      return row.name.toLowerCase().includes(userInput.toLowerCase());
    });
  }

  function sortData(rowData, sortingColumn, sortingDirection) {
    if (sortingColumn === null) {
      return rowData;
    }

    return rowData.slice().sort((a, b) => {
      const aValue = a[sortingColumn];
      const bValue = b[sortingColumn];

      if (aValue === bValue) {
        return 0;
      }

      if (sortingDirection === "asc") {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }

  return <div>SortingFilter</div>;
};

export default SortingFilter;
