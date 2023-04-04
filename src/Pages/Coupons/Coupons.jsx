import { BiEdit, BiTrash } from "react-icons/bi";
import Layout from "../../components/layout/Layout";

const Coupons = () => {
  return (
    <Layout>
      <div className="container grid px-6 mx-auto">
        <h1 className="my-6 text-lg font-bold text-gray-700">Coupons</h1>
        <div className="rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden min-w-0 shadow-xs bg-white mb-5">
          <div className="p-4">
            <form className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <input
                  className="block w-full px-3 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-green-300 border h-12 bg-gray-100 border-transparent focus:bg-white"
                  type="search"
                  placeholder="Search by coupon code/name"
                />
              </div>
              <div className="w-full md:w-56 lg:w-56 xl:w-56">
                <button
                  className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300 w-full h-12"
                  type="button"
                >
                  Add Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full overflow-hidden border border-gray-200 rounded-lg ring-1 ring-black ring-opacity-5 mb-8">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-100">
                <tr>
                  <td className="px-4 py-3">ID</td>
                  <td className="px-4 py-3">Start Date</td>
                  <td className="px-4 py-3">End Date</td>
                  <td className="px-4 py-3">Campaigns Name</td>
                  <td className="px-4 py-3">Code</td>
                  <td className="px-4 py-3">Percentage</td>
                  <td className="px-4 py-3">Product Type</td>
                  <td className="px-4 py-3">Status</td>
                  <td className="px-4 py-3 text-right">Actions</td>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100 text-gray-700 ">
                <tr className>
                  <td className="px-4 py-3">
                    <span className="font-semibold uppercase text-xs">
                      284b
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm"> Sep 26, 2022</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm"> Apr 29, 2023</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm"> October Gift Voucher</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm"> OCTOBER21</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold"> 10%</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm"> Grocery</span>
                  </td>
                  <td className="px-4 py-3 align-middle ">
                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100">
                      Active
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end text-right">
                      <div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                        <p data-tip="true" data-for="edit" currentitem="false">
                          <BiEdit />
                        </p>
                        <div
                          className=""
                          id="edit"
                          data-id="tooltip"
                          style={{ left: 1410, top: 355 }}
                        >
                          <span className="text-sm font-medium">Edit</span>
                        </div>
                      </div>
                      <div className="p-2 cursor-pointer text-gray-400 hover:text-red-600">
                        <p
                          data-tip="true"
                          data-for="delete"
                          currentitem="false"
                        >
                          <BiTrash />
                        </p>
                        <div
                          className=""
                          id="delete"
                          data-id="tooltip"
                          style={{ left: 1429, top: 468 }}
                        >
                          <span className="text-sm font-medium">Delete</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                {/* item 2 */}
                <tr className>
                  <td className="px-4 py-3">
                    <span className="font-semibold uppercase text-xs">
                      284a
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm"> Sep 26, 2022</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm"> Feb 28, 2023</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm"> Winter Gift Voucher</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm"> WINTER21</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold"> 15%</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm"> Grocery</span>
                  </td>
                  <td className="px-4 py-3 align-middle ">
                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-500 bg-red-100">
                      Expired
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end text-right">
                      <div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                        <p data-tip="true" data-for="edit" currentitem="false">
                          <BiEdit />
                        </p>
                        <div
                          className=""
                          id="edit"
                          data-id="tooltip"
                          style={{ left: 1410, top: 355 }}
                        >
                          <span className="text-sm font-medium">Edit</span>
                        </div>
                      </div>
                      <div className="p-2 cursor-pointer text-gray-400 hover:text-red-600">
                        <p
                          data-tip="true"
                          data-for="delete"
                          currentitem="false"
                        >
                          <BiTrash />
                        </p>
                        <div
                          className=""
                          id="delete"
                          data-id="tooltip"
                          style={{ left: 1429, top: 468 }}
                        >
                          <span className="text-sm font-medium">Delete</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                {/* item 3 */}
                <tr className>
                  <td className="px-4 py-3">
                    <span className="font-semibold uppercase text-xs">
                      2849
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm"> Sep 26, 2022</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm"> Dec 1, 2022</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm"> Summer Gift Voucher</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm"> SUMMER21</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold"> 12%</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm"> Cloths</span>
                  </td>
                  <td className="px-4 py-3 align-middle ">
                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-500 bg-red-100">
                      Expired
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end text-right">
                      <div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                        <p data-tip="true" data-for="edit" currentitem="false">
                          <BiEdit />
                        </p>
                        <div
                          className=""
                          id="edit"
                          data-id="tooltip"
                          style={{ left: 1410, top: 355 }}
                        >
                          <span className="text-sm font-medium">Edit</span>
                        </div>
                      </div>
                      <div className="p-2 cursor-pointer text-gray-400 hover:text-red-600">
                        <p
                          data-tip="true"
                          data-for="delete"
                          currentitem="false"
                        >
                          <BiTrash />
                        </p>
                        <div
                          className=""
                          id="delete"
                          data-id="tooltip"
                          style={{ left: 1429, top: 468 }}
                        >
                          <span className="text-sm font-medium">Delete</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                {/* item 4 */}
                <tr className>
                  <td className="px-4 py-3">
                    <span className="font-semibold uppercase text-xs">
                      2848
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm"> Sep 26, 2022</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm"> Dec 1, 2022</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm"> August Gift Voucher</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm"> AUGUST21</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold"> 20%</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm"> Grocery</span>
                  </td>
                  <td className="px-4 py-3 align-middle ">
                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-500 bg-red-100">
                      Expired
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end text-right">
                      <div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                        <p data-tip="true" data-for="edit" currentitem="false">
                          <BiEdit />
                        </p>
                        <div
                          className=""
                          id="edit"
                          data-id="tooltip"
                          style={{ left: 1410, top: 355 }}
                        >
                          <span className="text-sm font-medium">Edit</span>
                        </div>
                      </div>
                      <div className="p-2 cursor-pointer text-gray-400 hover:text-red-600">
                        <p
                          data-tip="true"
                          data-for="delete"
                          currentitem="false"
                        >
                          <BiTrash />
                        </p>
                        <div
                          className=""
                          id="delete"
                          data-id="tooltip"
                          style={{ left: 1429, top: 468 }}
                        >
                          <span className="text-sm font-medium">Delete</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Coupons;
