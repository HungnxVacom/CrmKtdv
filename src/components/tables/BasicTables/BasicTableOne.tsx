import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getPageCustomerGroup } from '../../../store/actions/authenticationActions'

interface DataItem {
  id: any;
  name: string;
  note: string;
}

export default function BasicTableOne() {
  // State quản lý trang hiện tại và số lượng dòng trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataItem[]>([]);

  // Tính toán phạm vi các trang cần hiển thị
  const pageNumbers = [];
  const maxVisiblePages = 5; // Số trang hiển thị tối đa

  let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  // Đảm bảo các trang không bị cắt ngắn
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const setMetaData = (data: any) => {
    setTotalPages(data.totalPages);
  }
  useEffect(() => {
    const getDataTable = async () => {
      setLoading(true);
      try {
        const data = await getPageCustomerGroup(currentPage, pageSize, "");
        setMetaData(data.metaData);
        setData(data.items);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getDataTable();
  }, [currentPage, pageSize]);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Name</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Note</TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading ? (
                <TableRow>
                  <td className="text-center py-4" colSpan={2}>
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                  </td>
                </TableRow>
              ) : data?.length > 0 ? (
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div>
                          <span className="block font-medium">{item.name}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.note}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <td className="text-center py-4" colSpan={2}>Không có dữ liệu</td>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between p-4">
            {/* Chọn số lượng dòng hiển thị */}
            <div>
              <label className="mr-2">Rows per page:</label>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1); // Reset về trang đầu
                }}
                className="border rounded px-2 py-1"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            {/* Điều hướng trang */}
            <div className="flex items-center space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                <FaChevronLeft />
              </button>

              {pageNumbers.map((page) => (
                <button
                  key={page}
                  className={`px-3 py-1 border rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-white"}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
