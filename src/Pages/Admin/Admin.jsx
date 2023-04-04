import AdminTable from "./AdminTable";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import Layout from "../../components/layout/Layout";
import PageTitle from "../../components/common/PageTitle";
import { Link } from "react-router-dom";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";

const Admin = () => {
  const [searchString, setSearchString] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const debouncedSearch = useDebounce(searchString, 500);
  const searchFields = ["username", "name", "email"];

  const [data, setData] = useState([]);

  useEffect(() => {
    // LISTEN (REALTIME) - Get all user documents
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // Sorting, filtering, searching
  const sortableData = [...data];
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

  const getSortDirection = (column) => {
    if (!sortConfig.key) {
      return "text-gray-400 hover:text-gray-600";
    }
    return sortConfig.key === column && sortConfig.direction === "ascending"
      ? "text-gray-900 font-semibold"
      : "text-gray-400 hover:text-gray-600";
  };

  return (
    <Layout>
      <PageTitle title="Admins" />
      <div className="flex justify-between items-center my-2">
        <div className="flex items-center">
          <input
            onChange={(e) => setSearchString(e.target.value)}
            type="text"
            value={searchString}
            placeholder="Search admin user here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <Link to="new" className="btn btn-outline btn-accent">
          Add New
        </Link>
      </div>
      <AdminTable
        users={filteredData}
        sortConfig={sortConfig}
        getSortDirection={getSortDirection}
        requestSort={requestSort}
        handleDelete={handleDelete}
      />
    </Layout>
  );
};

export default Admin;
