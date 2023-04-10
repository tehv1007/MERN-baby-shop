import { BsCloudDownload, BsPrinter } from "react-icons/bs";
import Layout from "../../components/layouts/Layout";
import Invoice from "./Dashboard/Invoice";

const OrderDetail = () => {
  // const handlePrintInvoice = () => {
  // Lấy nội dung HTML của invoice
  //   const invoiceHtml = document.getElementById("invoice").innerHTML;

  //   html2canvas(invoiceHtml).then((canvas) => {
  //     let imgWidth = 208;
  //     let imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     const imgData = canvas.toDataURL("img/png");
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  //     pdf.save("download.pdf");
  //   });
  // };

  // const handleDownloadInvoice = () => {
  //   // Lấy nội dung HTML của invoice
  //   const invoiceHtml = document.getElementById("invoice").innerHTML;

  //   // Tạo đối tượng jsPDF mới
  //   const doc = new jsPDF();

  //   // Thêm nội dung HTML vào file PDF
  //   doc.html(invoiceHtml, {
  //     callback: function () {
  //       // Tải xuống file PDF
  //       doc.save("invoice.pdf");
  //     },
  //   });
  // };

  return (
    <Layout>
      <div>
        <Invoice />
      </div>
      <div className="mb-4 mt-3 flex justify-between items-center text-sm leading-5 font-medium text-white">
        {/* <a
          download="Invoice"
          href="blob:https://dashtar-admin.vercel.app/02321e6a-25a1-4fda-bccc-a3dfbfa88f1c"
        > */}
        <button
          className="flex transition-colors duration-150 focus:outline-none px-5 py-2 rounded-md bg-green-500 border border-transparent hover:bg-green-600 focus:ring focus:ring-purple-300 w-auto"
          onClick={handleDownloadInvoice}
        >
          Download Invoice{" "}
          <span className="ml-2 text-base">
            <BsCloudDownload />
          </span>
        </button>
        {/* </a> */}
        <button
          className="flex transition-colors duration-150 focus:outline-none px-5 py-2 rounded-md bg-green-500 border border-transparent hover:bg-green-600 focus:ring focus:ring-purple-300 w-auto"
          onClick={handlePrintInvoice}
        >
          Print Invoice{" "}
          <span className="ml-2">
            <BsPrinter />
          </span>
        </button>
      </div>
    </Layout>
  );
};

export default OrderDetail;
