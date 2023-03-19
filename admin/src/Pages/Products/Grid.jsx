import { useEffect, useState } from "react";
import { Grid } from "yaa-grid";

import "yaa-grid/dist/style.css";

const TestGrid = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetch(
        `http://localhost:5000/products?skip=${(pageNumber - 1) * 10}&limit=10`
      );

      const result = await data.json();

      setData(result);
      setLoading(false);
    };

    fetchData();
  }, [pageNumber]);
  console.log(data);

  /*
   * Column width is measured by pixels
   */
  const columns = [
    { field: "_id", header: "ID", width: "100" },
    // { field: "brand", header: "Brand", width: "100" },
    { field: "category", header: "Category", width: "100" },
    { field: "photos", header: "Description", width: "200" },
    { field: "price", header: "Price", width: "100" },
    { field: "rating", header: "Rating", width: "100" },
    { field: "title", header: "Title", width: "200" },
  ];

  const onView = (e) => alert(`View ${e}`);
  const onEdit = () => alert("edit");
  const onDelete = () => alert("delete");

  return (
    <Grid
      data={data}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
      loading={loading}
      columns={columns}
      pageSize={10}
      totalRecords={data?.total}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
    />
  );
};

export default TestGrid;
