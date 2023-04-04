import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { paginate } from "./productsService";
import GlobalSpinner from "../components/common/GlobalSpinner";

const useTableData = (tableName) => {
  const { data, isLoading } = useQuery({
    queryKey: [`${tableName}`],
    queryFn: () => axios.get(`/admin/${tableName}`),
  });
  return { data, isLoading };
};

const sortAndSearch = (tableName, searchFields) => {
  const [searchString, setSearchString] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const debouncedSearch = useDebounce(searchString, 500);

  const { data, isLoading } = useQuery({
    queryKey: [`${tableName}`],
    queryFn: () => {
      setPage(1);
      return axios.get(`/admin/${tableName}`);
    },
  });

  if (isLoading) return <GlobalSpinner />;
  const { data: products } = data;
  console.log(products);

  const sortableData = [...products];
  if (sortConfig.key) {
    sortableData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  const filteredData = sortableData.filter((item) => {
    const searchRegex = new RegExp(debouncedSearch, "i");
    return searchFields.some((field) => searchRegex.test(item[field]));
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortDirection = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending"
        ? "sorted ascending"
        : "sorted descending";
    }
    return "";
  };

  return {
    filteredData,
    requestSort,
    getSortDirection,
    searchString,
    setSearchString,
  };
};

export default sortAndSearch;
