import { useState } from "react";

function selectInput(data) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    if (checked) {
      setSelectedRows(data);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (event, row) => {
    const checked = event.target.checked;
    if (checked) {
      setSelectedRows([...selectedRows, row]);
    } else {
      setSelectedRows(selectedRows.filter((r) => r._id !== row._id));
      setSelectAll(false);
    }
  };

  const numSelected = selectedRows.length;

  return {
    handleSelectAll,
    handleSelectRow,
    numSelected,
    selectedRows,
    setSelectedRows,
    selectAll,
  };
}

export default selectInput;
