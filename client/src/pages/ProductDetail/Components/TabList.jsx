import DOMPurify from "dompurify";
import { useState } from "react";
import sizeChart from "../../../assets/img/size_guide_noodoll.webp";

function DescriptionTab({ product }) {
  return (
    <>
      <p
        className="my-4"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(product.description),
        }}
      ></p>
    </>
  );
}

function FabricTab() {
  return (
    <>
      <ul className="my-4 list-disc">
        <li>CE certified for ages 0+.</li>
        <li>Made from soft fibres.</li>
        <li>Embroidered face.</li>
        <li>Machine washable cold.</li>
        <li>Size: 20 x 19 cm.</li>
      </ul>
    </>
  );
}

function SizeChartTab() {
  return (
    <>
      <img className="" src={sizeChart} alt="Size Chart" />
    </>
  );
}

function TabList({ product }) {
  const [activeTab, setActiveTab] = useState("Description");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "Description":
        return <DescriptionTab product={product} />;
      case "Fabric":
        return <FabricTab />;
      case "Size Chart":
        return <SizeChartTab />;
      default:
        return null;
    }
  };

  return (
    <div className="text-gray-900 text-lg leading-7 my-5 max-w-[800px] mx-auto">
      <ul className="text-center border-b-2">
        <li
          className={`tab tab-bordered text-lg mx-5 ${
            activeTab === "Description" ? "tab-active" : ""
          }`}
          onClick={() => handleTabClick("Description")}
        >
          Description
        </li>
        <li
          className={`tab tab-bordered text-lg mx-5 ${
            activeTab === "Fabric" ? "tab-active" : ""
          }`}
          onClick={() => handleTabClick("Fabric")}
        >
          Fabric
        </li>
        <li
          className={`tab tab-bordered text-lg mx-5 ${
            activeTab === "Size Chart" ? "tab-active" : ""
          }`}
          onClick={() => handleTabClick("Size Chart")}
        >
          Size Chart
        </li>
      </ul>
      {getTabContent()}
    </div>
  );
}

export default TabList;
