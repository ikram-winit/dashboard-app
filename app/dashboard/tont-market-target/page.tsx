"use client";

import tontData from "@/lib/tont-market-data.json";

interface MarketRow {
  market: string;
  monthly: Record<string, number>;
  target: number;
  confirm: number;
}

const formatNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return "0";
  return Math.round(value).toLocaleString();
};

export default function TontMarketTargetPage() {
  const { months, markets, totals } = tontData as {
    months: string[];
    markets: MarketRow[];
    totals: { monthly: Record<string, number>; target: number; confirm: number };
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Header Section - Fixed */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold">TONT Market Wise Target</h1>
          <p className="text-sm text-muted-foreground">Mar-2026 Confirm</p>
        </div>
        <div className="flex gap-6">
          <div className="text-right">
            <p className="text-sm font-medium">Mar-26 Target</p>
            <p className="text-2xl font-bold text-primary">
              {formatNumber(totals.target)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Confirm</p>
            <p className="text-2xl font-bold text-green-600">
              {formatNumber(totals.confirm)}
            </p>
          </div>
        </div>
      </div>

      {/* Table Container - Scrollable */}
      <div className="flex-1 border rounded-lg overflow-hidden">
        <div className="overflow-auto h-full w-full">
          <table className="text-xs border-collapse min-w-[2200px]">
            {/* Header */}
            <thead className="sticky top-0 z-20">
              <tr className="bg-[#4472C4] text-white">
                <th className="sticky left-0 z-30 bg-[#4472C4] border border-[#2F5496] px-2 py-1.5 text-left font-semibold w-[140px] min-w-[140px]" rowSpan={2}>
                  Market
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold bg-[#5B9BD5]" colSpan={9}>
                  FY 2024-25 (Jul-24 to Mar-25)
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold bg-[#70AD47] text-white" colSpan={9}>
                  FY 2025-26 (Apr-25 to Dec-25)
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold bg-[#ED7D31]" colSpan={2}>
                  Jan-Feb 2026
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold bg-[#FFC000] text-black" colSpan={2}>
                  Target & Confirm
                </th>
              </tr>
              <tr className="bg-[#5B9BD5] text-white">
                {months.map((month, i) => {
                  let bgClass = "bg-[#5B9BD5]";
                  let textClass = "text-white";
                  if (i >= 9 && i < 18) bgClass = "bg-[#70AD47]";
                  if (i >= 18 && i < 20) bgClass = "bg-[#ED7D31]";
                  if (i >= 20) { bgClass = "bg-[#FFC000]"; textClass = "text-black"; }
                  return (
                    <th
                      key={month}
                      className={`border border-[#2F5496] px-2 py-1 text-center font-medium text-[10px] ${bgClass} ${textClass} w-[85px] min-w-[85px]`}
                    >
                      {month}
                    </th>
                  );
                })}
                <th className="border border-[#2F5496] px-2 py-1 text-center font-medium text-[10px] bg-[#FFC000] text-black w-[85px] min-w-[85px]">
                  Confirm
                </th>
              </tr>
            </thead>

            <tbody>
              {/* Totals Row */}
              <tr className="bg-[#D6DCE4] font-bold">
                <td className="sticky left-0 z-10 bg-[#D6DCE4] border border-gray-300 px-2 py-1 font-bold">
                  Total
                </td>
                {months.map((month) => (
                  <td key={month} className="border border-gray-300 px-2 py-1 text-right tabular-nums">
                    {formatNumber(totals.monthly[month])}
                  </td>
                ))}
                <td className="border border-gray-300 px-2 py-1 text-right tabular-nums">
                  {formatNumber(totals.confirm)}
                </td>
              </tr>

              {/* Market Rows */}
              {markets.map((row, index) => {
                const isAlternate = index % 2 === 1;
                const rowBgClass = isAlternate ? "bg-[#E4E4E4]" : "bg-white";

                return (
                  <tr key={row.market} className={rowBgClass}>
                    <td className={`sticky left-0 z-10 ${isAlternate ? "bg-[#DDEBF7]" : "bg-[#D6E4F0]"} border border-gray-300 px-2 py-1 text-left font-medium`}>
                      {row.market}
                    </td>
                    {months.map((month, mi) => {
                      let cellBg = "";
                      if (mi < 9) cellBg = "";
                      else if (mi < 18) cellBg = "bg-[#E2EFDA]";
                      else if (mi < 20) cellBg = "bg-[#FCE4D6]";
                      else cellBg = "bg-[#FFF2CC]";
                      return (
                        <td
                          key={month}
                          className={`border border-gray-300 px-2 py-1 text-right tabular-nums ${cellBg}`}
                        >
                          {formatNumber(row.monthly[month])}
                        </td>
                      );
                    })}
                    <td className="border border-gray-300 px-2 py-1 text-right tabular-nums bg-[#FFF2CC] font-medium">
                      {formatNumber(row.confirm)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
