import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useTableData = (tableName) => {
  const { data, isLoading } = useQuery({
    queryKey: [`${tableName}`],
    queryFn: () => axios.get(`/admin/${tableName}`),
  });
  return { data, isLoading };
};

export default useTableData;
