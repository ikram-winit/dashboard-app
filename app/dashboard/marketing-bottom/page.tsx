"use client";

import marketingData from "@/lib/marketing-data.json";

interface DataRow {
  row: number;
  brand: string | null;
  brandCode: string;
  rowNum: number | null;
  productCode: string | null;
  sku: string;
  isTotal: boolean;
  rowType: string;
  mar25: number | null;
  toft: number | null;
  tont: number | null;
  horeca: number | null;
  moft: number | null;
  dirs: number | null;
  total: number | null;
  buBrands: number | null;
  buSales: number | null;
  marPlan: number | null;
  aprPlan: number | null;
  mayPlan: number | null;
}

const formatNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return "0";
  return Math.round(value).toLocaleString();
};

export default function MarketingBottomPage() {
  const { totals, data } = marketingData as {
    totals: typeof marketingData.totals;
    data: DataRow[];
  };

  // Group data by brand
  const groupedData: { brand: string; rows: DataRow[] }[] = [];
  let currentGroup: { brand: string; rows: DataRow[] } | null = null;

  data.forEach((row) => {
    if (row.brand) {
      if (currentGroup) {
        groupedData.push(currentGroup);
      }
      currentGroup = { brand: row.brand, rows: [row] };
    } else if (currentGroup) {
      currentGroup.rows.push(row);
    }
  });
  if (currentGroup) {
    groupedData.push(currentGroup);
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Header Section - Fixed */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold">Marketing Bottom Up Plan</h1>
          <p className="text-sm text-muted-foreground">Mar Apr May 2026</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">Total Volume</p>
          <p className="text-2xl font-bold text-primary">
            {formatNumber(totals.totalTotal)}
          </p>
        </div>
      </div>

      {/* Table Container - Scrollable */}
      <div className="flex-1 border rounded-lg overflow-hidden">
        <div className="overflow-auto h-full w-full">
          <table className="text-xs border-collapse min-w-[1400px]">
            {/* Header Row 1 - Main Categories */}
            <thead className="sticky top-0 z-20">
              <tr className="bg-[#4472C4] text-white">
                <th className="sticky left-0 z-30 bg-[#4472C4] border border-[#2F5496] px-2 py-1.5 text-left font-semibold w-[100px] min-w-[100px]" rowSpan={2}>
                  Brand
                </th>
                <th className="sticky left-[100px] z-30 bg-[#4472C4] border border-[#2F5496] px-2 py-1.5 text-left font-semibold w-[110px] min-w-[110px]" rowSpan={2}>
                  Product Code
                </th>
                <th className="sticky left-[210px] z-30 bg-[#4472C4] border border-[#2F5496] px-2 py-1.5 text-left font-semibold w-[130px] min-w-[130px]" rowSpan={2}>
                  SKU
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold bg-[#5B9BD5] w-[80px] min-w-[80px]">
                  Mar-25
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold bg-[#70AD47] text-white w-[480px] min-w-[480px]" colSpan={6}>
                  Bottom-up
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold bg-[#ED7D31] w-[160px] min-w-[160px]" colSpan={2}>
                  Bottom-up
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold bg-[#FFC000] w-[80px] min-w-[80px]">
                  Mar-26
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold bg-[#FFC000] w-[80px] min-w-[80px]">
                  Apr-26
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold bg-[#FFC000] w-[80px] min-w-[80px]">
                  May-26
                </th>
              </tr>
              {/* Header Row 2 - Sub Categories */}
              <tr className="bg-[#5B9BD5] text-white">
                <th className="border border-[#2F5496] px-2 py-1 text-center font-medium text-[10px] w-[80px] min-w-[80px]">
                  Total
                </th>
                <th className="border border-[#2F5496] px-2 py-1 text-center font-medium text-[10px] bg-[#70AD47] w-[80px] min-w-[80px]">
                  TOFT
                </th>
                <th className="border border-[#2F5496] px-2 py-1 text-center font-medium text-[10px] bg-[#70AD47] w-[80px] min-w-[80px]">
                  TONT
                </th>
                <th className="border border-[#2F5496] px-2 py-1 text-center font-medium text-[10px] bg-[#70AD47] w-[80px] min-w-[80px]">
                  HoReCa
                </th>
                <th className="border border-[#2F5496] px-2 py-1 text-center font-medium text-[10px] bg-[#70AD47] w-[80px] min-w-[80px]">
                  MOFT
                </th>
                <th className="border border-[#2F5496] px-2 py-1 text-center font-medium text-[10px] bg-[#70AD47] w-[80px] min-w-[80px]">
                  DIRS
                </th>
                <th className="border border-[#2F5496] px-2 py-1 text-center font-medium text-[10px] bg-[#70AD47] w-[80px] min-w-[80px]">
                  Total
                </th>
                <th className="border border-[#2F5496] px-2 py-1 text-center font-medium text-[10px] bg-[#ED7D31] w-[80px] min-w-[80px]">
                  Brands
                </th>
                <th className="border border-[#2F5496] px-2 py-1 text-center font-medium text-[10px] bg-[#ED7D31] w-[80px] min-w-[80px]">
                  Sales
                </th>
                <th className="border border-[#2F5496] px-2 py-1 text-center font-medium text-[10px] bg-[#FFC000] text-black w-[80px] min-w-[80px]">
                  Plan
                </th>
                <th className="border border-[#2F5496] px-2 py-1 text-center font-medium text-[10px] bg-[#FFC000] text-black w-[80px] min-w-[80px]">
                  Plan
                </th>
                <th className="border border-[#2F5496] px-2 py-1 text-center font-medium text-[10px] bg-[#FFC000] text-black w-[80px] min-w-[80px]">
                  Plan
                </th>
              </tr>
            </thead>

            {/* Totals Row */}
            <tbody>
              <tr className="bg-[#D6DCE4] font-bold">
                <td className="sticky left-0 z-10 bg-[#D6DCE4] border border-gray-300 px-2 py-1">
                  Total Vol:
                </td>
                <td className="sticky left-[100px] z-10 bg-[#D6DCE4] border border-gray-300 px-2 py-1"></td>
                <td className="sticky left-[210px] z-10 bg-[#D6DCE4] border border-gray-300 px-2 py-1"></td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  {formatNumber(totals.mar25Total)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  {formatNumber(totals.toftTotal)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  {formatNumber(totals.tontTotal)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  {formatNumber(totals.horecaTotal)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  {formatNumber(totals.moftTotal)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  {formatNumber(totals.dirsTotal)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  {formatNumber(totals.totalTotal)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  {formatNumber(totals.buBrandsTotal)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  {formatNumber(totals.buSalesTotal)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  {formatNumber(totals.marPlanTotal)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  {formatNumber(totals.aprPlanTotal)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  {formatNumber(totals.mayPlanTotal)}
                </td>
              </tr>

              {/* Data Rows grouped by Brand */}
              {groupedData.map((group, groupIndex) =>
                group.rows.map((row, rowIndex) => {
                  const isFirstInGroup = rowIndex === 0;
                  const rowCount = group.rows.length;
                  const isAlternate = row.rowType === "alternate";
                  const isTotalRow = row.isTotal;

                  const rowBgClass = isTotalRow
                    ? "bg-[#BDD7EE]"
                    : isAlternate
                    ? "bg-[#E4E4E4]"
                    : "bg-white";

                  return (
                    <tr
                      key={`${groupIndex}-${rowIndex}`}
                      className={`${rowBgClass} ${isTotalRow ? "font-semibold" : ""}`}
                    >
                      {/* Brand column - merged for group */}
                      {isFirstInGroup && (
                        <td
                          className="sticky left-0 z-10 bg-[#DDEBF7] border border-gray-300 px-2 py-1 text-left font-medium align-top"
                          rowSpan={rowCount}
                        >
                          {group.brand}
                        </td>
                      )}
                      <td className={`sticky left-[100px] z-10 ${rowBgClass} border border-gray-300 px-2 py-1 text-left`}>
                        {row.productCode}
                      </td>
                      <td className={`sticky left-[210px] z-10 ${rowBgClass} border border-gray-300 px-2 py-1 text-left`}>
                        {row.sku}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-right tabular-nums">
                        {formatNumber(row.mar25)}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-right tabular-nums bg-[#E2EFDA]">
                        {formatNumber(row.toft)}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-right tabular-nums bg-[#E2EFDA]">
                        {formatNumber(row.tont)}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-right tabular-nums bg-[#E2EFDA]">
                        {formatNumber(row.horeca)}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-right tabular-nums bg-[#E2EFDA]">
                        {formatNumber(row.moft)}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-right tabular-nums bg-[#E2EFDA]">
                        {formatNumber(row.dirs)}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-right tabular-nums bg-[#C6E0B4] font-medium">
                        {formatNumber(row.total)}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-right tabular-nums bg-[#FCE4D6]">
                        {formatNumber(row.buBrands)}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-right tabular-nums bg-[#FCE4D6]">
                        {formatNumber(row.buSales)}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-right tabular-nums bg-[#FFF2CC]">
                        {formatNumber(row.marPlan)}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-right tabular-nums bg-[#FFF2CC]">
                        {formatNumber(row.aprPlan)}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-right tabular-nums bg-[#FFF2CC]">
                        {formatNumber(row.mayPlan)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
