const DashboardCard = ({ imgUrl, name, total }) => {
  return (
    <div className="rounded-md border-2 w-[30%] p-4 bg-gray-200">
      <div className="flex gap-2">
        <img src={imgUrl} alt={name} />
        <div className="text-black">
          <p>{name}</p>
          <p>${total}</p>
        </div>
      </div>
    </div>
  );
};

const DashboardData = [
  {
    id: 1,
    imgUrl: "https://img.icons8.com/doodle/48/shopping-bag--v1.png",
    name: "Total Sale",
    total: "2.456",
  },
  {
    id: 2,
    imgUrl: "https://img.icons8.com/arcade/48/home.png",
    name: "Total Expenses",
    total: "4.912",
  },
  {
    id: 3,
    imgUrl: "https://img.icons8.com/office/48/conference-call.png",
    name: "Total Visitors",
    total: "5,325",
  },
  {
    id: 4,
    imgUrl: "https://img.icons8.com/arcade/48/menu.png",
    name: "Total Orders",
    total: "1,326",
  },
];

const DashboardTotal = () => {
  return (
    <>
      <div className="flex gap-4">
        {DashboardData.map((item) => (
          <DashboardCard
            key={item.id}
            imgUrl={item.imgUrl}
            name={item.name}
            total={item.total}
          />
        ))}
      </div>
    </>
  );
};

export default DashboardTotal;
