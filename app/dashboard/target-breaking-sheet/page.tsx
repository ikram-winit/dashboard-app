"use client";

import breakingData from "@/lib/target-breaking-data.json";

interface SKU {
  col: number;
  sku: string;
  productCode: string;
  doNotPlan: boolean;
}

interface Brand {
  name: string;
  skus: SKU[];
}

interface Outlet {
  market: string;
  rtCode: string;
  lsr: string;
  outletName: string;
  channel: string;
  type: string;
  chain: string;
  tm: string;
  skuVals: Record<string, number>;
  brandTotals: Record<string, number>;
  lbclTotal: number;
  mustHave: Record<string, number>;
  volDrive: Record<string, number>;
}

const formatVal = (v: number | null | undefined): string => {
  if (!v || v === 0) return "-";
  return Math.round(v).toLocaleString();
};

const formatTotal = (v: number | null | undefined): string => {
  if (!v || v === 0) return "0";
  return Math.round(v).toLocaleString();
};

// Color palette for brand groups
const brandColors = [
  { bg: "#D6E4F0", header: "#4472C4" },  // Blue
  { bg: "#E2EFDA", header: "#70AD47" },  // Green
  { bg: "#FCE4D6", header: "#ED7D31" },  // Orange
  { bg: "#FFF2CC", header: "#FFC000" },  // Yellow
  { bg: "#E4DFEC", header: "#7030A0" },  // Purple
  { bg: "#F2DCDB", header: "#C0504D" },  // Red
  { bg: "#DAEEF3", header: "#4BACC6" },  // Teal
  { bg: "#EBF1DE", header: "#9BBB59" },  // Olive
];

export default function TargetBreakingSheetPage() {
  const {
    market,
    lbclTotal,
    lbclTarget,
    brands,
    brandTotalLabels,
    mustHaveLabels,
    volDriveLabels,
    skuTotals,
    brandTargets,
    outlets,
  } = breakingData as {
    market: string;
    totalRD: number;
    lbclTotal: number;
    lbclTarget: number;
    brands: Brand[];
    brandTotalLabels: string[];
    mustHaveLabels: string[];
    volDriveLabels: string[];
    skuTotals: Record<string, number>;
    brandTotals: Record<string, number>;
    brandTargets: Record<string, number>;
    outlets: Outlet[];
  };

  // Total SKU count
  const totalSkus = brands.reduce((sum, b) => sum + b.skus.length, 0);

  // Channel counts
  const channelCounts: Record<string, number> = {};
  outlets.forEach((o) => {
    if (o.channel) channelCounts[o.channel] = (channelCounts[o.channel] || 0) + 1;
  });

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold">Target Breaking Sheet</h1>
          <p className="text-sm text-muted-foreground">Mar 2026 - {market}</p>
        </div>
        <div className="flex gap-6">
          <div className="text-right">
            <p className="text-sm font-medium">Total Outlets</p>
            <p className="text-2xl font-bold text-primary">{outlets.length}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">LBCL Target</p>
            <p className="text-2xl font-bold text-green-600">{formatTotal(lbclTarget)}</p>
          </div>
          {Object.entries(channelCounts).map(([ch, count]) => (
            <div key={ch} className="text-right">
              <p className="text-sm font-medium">{ch}</p>
              <p className="text-lg font-semibold text-muted-foreground">{count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 border rounded-lg overflow-hidden">
        <div className="overflow-auto h-full w-full">
          <table className="text-xs border-collapse">
            <thead className="sticky top-0 z-20">
              {/* Row 1: Main groups */}
              <tr className="bg-[#4472C4] text-white">
                {/* Sticky info cols */}
                <th className="sticky left-0 z-30 bg-[#4472C4] border border-[#2F5496] px-1 py-1.5 text-left font-semibold w-[110px] min-w-[110px]" rowSpan={3}>Market</th>
                <th className="sticky left-[110px] z-30 bg-[#4472C4] border border-[#2F5496] px-1 py-1.5 text-left font-semibold w-[85px] min-w-[85px]" rowSpan={3}>RT Code</th>
                <th className="sticky left-[195px] z-30 bg-[#4472C4] border border-[#2F5496] px-1 py-1.5 text-left font-semibold w-[70px] min-w-[70px]" rowSpan={3}>LSR</th>
                <th className="sticky left-[265px] z-30 bg-[#4472C4] border border-[#2F5496] px-1 py-1.5 text-left font-semibold w-[170px] min-w-[170px]" rowSpan={3}>Outlet Name</th>
                <th className="sticky left-[435px] z-30 bg-[#4472C4] border border-[#2F5496] px-1 py-1.5 text-center font-semibold w-[55px] min-w-[55px]" rowSpan={3}>Channel</th>
                <th className="sticky left-[490px] z-30 bg-[#4472C4] border border-[#2F5496] px-1 py-1.5 text-center font-semibold w-[40px] min-w-[40px]" rowSpan={3}>Type</th>
                <th className="sticky left-[530px] z-30 bg-[#4472C4] border border-[#2F5496] px-1 py-1.5 text-center font-semibold w-[45px] min-w-[45px]" rowSpan={3}>Chain</th>
                <th className="sticky left-[575px] z-30 bg-[#4472C4] border border-[#2F5496] px-1 py-1.5 text-center font-semibold w-[30px] min-w-[30px]" rowSpan={3}>TM</th>

                {/* Brand groups for individual SKUs */}
                {brands.map((brand, bi) => {
                  const color = brandColors[bi % brandColors.length];
                  return (
                    <th
                      key={brand.name}
                      className="border border-[#2F5496] px-1 py-1 text-center font-semibold text-[10px]"
                      style={{ backgroundColor: color.header }}
                      colSpan={brand.skus.length}
                    >
                      {brand.name}
                    </th>
                  );
                })}

                {/* Brand totals group */}
                <th className="border border-[#2F5496] px-1 py-1 text-center font-semibold bg-[#70AD47]" colSpan={brandTotalLabels.length}>
                  Total Brands (Qts)
                </th>

                {/* LBCL */}
                <th className="border border-[#2F5496] px-1 py-1 text-center font-semibold bg-[#ED7D31]" rowSpan={3}>
                  LBCL
                </th>

                {/* Must have */}
                <th className="border border-[#2F5496] px-1 py-1 text-center font-semibold bg-[#5B9BD5]" colSpan={mustHaveLabels.length}>
                  Must Have Base
                </th>

                {/* Volume drive */}
                <th className="border border-[#2F5496] px-1 py-1 text-center font-semibold bg-[#FFC000] text-black" colSpan={volDriveLabels.length}>
                  Volume Drive Outlets
                </th>
              </tr>

              {/* Row 2: SKU totals row (row 8 from excel) */}
              <tr className="bg-[#5B9BD5] text-white">
                {brands.map((brand, bi) => {
                  const color = brandColors[bi % brandColors.length];
                  return brand.skus.map((sku) => (
                    <th
                      key={sku.col}
                      className="border border-[#2F5496] px-1 py-0.5 text-center font-medium text-[9px]"
                      style={{ backgroundColor: color.header, opacity: 0.85 }}
                    >
                      {skuTotals[String(sku.col)] ? formatTotal(skuTotals[String(sku.col)]) : "0"}
                    </th>
                  ));
                })}
                {brandTotalLabels.map((label) => (
                  <th key={label} className="border border-[#2F5496] px-1 py-0.5 text-center font-medium text-[10px] bg-[#70AD47] w-[60px] min-w-[60px]">
                    {label}
                  </th>
                ))}
                {mustHaveLabels.map((label) => (
                  <th key={label} className="border border-[#2F5496] px-1 py-0.5 text-center font-medium text-[10px] bg-[#5B9BD5] w-[65px] min-w-[65px]">
                    {label}
                  </th>
                ))}
                {volDriveLabels.map((label) => (
                  <th key={label} className="border border-[#2F5496] px-1 py-0.5 text-center font-medium text-[10px] bg-[#FFC000] text-black w-[70px] min-w-[70px]">
                    {label}
                  </th>
                ))}
              </tr>

              {/* Row 3: SKU names */}
              <tr className="bg-[#D6E4F0] text-black">
                {brands.map((brand, bi) => {
                  const color = brandColors[bi % brandColors.length];
                  return brand.skus.map((sku) => (
                    <th
                      key={sku.col}
                      className={`border border-gray-400 px-1 py-1 text-center font-medium text-[9px] w-[65px] min-w-[65px] ${sku.doNotPlan ? "text-red-500" : ""}`}
                      style={{ backgroundColor: color.bg }}
                      title={sku.productCode + (sku.doNotPlan ? " (Do Not Plan)" : "")}
                    >
                      {sku.sku}
                    </th>
                  ));
                })}
                {brandTotalLabels.map((label) => (
                  <th key={`bt-${label}`} className="border border-gray-400 px-1 py-1 text-center font-medium text-[9px] bg-[#E2EFDA]">

                  </th>
                ))}
                {mustHaveLabels.map((label) => (
                  <th key={`mh-${label}`} className="border border-gray-400 px-1 py-1 text-center font-medium text-[9px] bg-[#D6E4F0]">

                  </th>
                ))}
                {volDriveLabels.map((label) => (
                  <th key={`vd-${label}`} className="border border-gray-400 px-1 py-1 text-center font-medium text-[9px] bg-[#FFF2CC]">

                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Targets Row */}
              <tr className="bg-[#D6DCE4] font-bold">
                <td className="sticky left-0 z-10 bg-[#D6DCE4] border border-gray-300 px-1 py-1" colSpan={4}>
                  Targets
                </td>
                <td className="sticky left-[435px] z-10 bg-[#D6DCE4] border border-gray-300 px-1 py-1"></td>
                <td className="sticky left-[490px] z-10 bg-[#D6DCE4] border border-gray-300 px-1 py-1"></td>
                <td className="sticky left-[530px] z-10 bg-[#D6DCE4] border border-gray-300 px-1 py-1"></td>
                <td className="sticky left-[575px] z-10 bg-[#D6DCE4] border border-gray-300 px-1 py-1"></td>
                {/* SKU-level targets are empty */}
                {brands.map((brand) =>
                  brand.skus.map((sku) => (
                    <td key={`t-${sku.col}`} className="border border-gray-300 px-1 py-1 text-right tabular-nums text-[9px]">

                    </td>
                  ))
                )}
                {brandTotalLabels.map((label) => (
                  <td key={label} className="border border-gray-300 px-1 py-1 text-right tabular-nums bg-[#E2EFDA]">
                    {formatTotal(brandTargets[label])}
                  </td>
                ))}
                <td className="border border-gray-300 px-1 py-1 text-right tabular-nums bg-[#FCE4D6] font-bold">
                  {formatTotal(lbclTarget)}
                </td>
                {mustHaveLabels.map((label) => (
                  <td key={label} className="border border-gray-300 px-1 py-1"></td>
                ))}
                {volDriveLabels.map((label) => (
                  <td key={label} className="border border-gray-300 px-1 py-1"></td>
                ))}
              </tr>

              {/* Data Rows */}
              {outlets.map((outlet, index) => {
                const isAlt = index % 2 === 1;
                const rowBg = isAlt ? "bg-[#F2F2F2]" : "bg-white";
                const stickyBg = isAlt ? "#DDEBF7" : "#D6E4F0";

                return (
                  <tr key={`${outlet.rtCode}-${index}`} className={rowBg}>
                    <td className="sticky left-0 z-10 border border-gray-300 px-1 py-0.5 text-left text-[10px]" style={{ backgroundColor: stickyBg }}>
                      {outlet.market}
                    </td>
                    <td className="sticky left-[110px] z-10 border border-gray-300 px-1 py-0.5 text-left text-[10px]" style={{ backgroundColor: stickyBg }}>
                      {outlet.rtCode}
                    </td>
                    <td className="sticky left-[195px] z-10 border border-gray-300 px-1 py-0.5 text-left text-[10px]" style={{ backgroundColor: stickyBg }}>
                      {outlet.lsr}
                    </td>
                    <td className="sticky left-[265px] z-10 border border-gray-300 px-1 py-0.5 text-left text-[10px] truncate max-w-[170px]" style={{ backgroundColor: stickyBg }} title={outlet.outletName}>
                      {outlet.outletName}
                    </td>
                    <td className="sticky left-[435px] z-10 border border-gray-300 px-1 py-0.5 text-center" style={{ backgroundColor: stickyBg }}>
                      <span className={`px-1 py-0.5 rounded text-[9px] font-medium ${
                        outlet.channel === "TOFT" ? "bg-blue-100 text-blue-700" :
                        outlet.channel === "TONT" ? "bg-green-100 text-green-700" :
                        outlet.channel === "HoReCa" ? "bg-purple-100 text-purple-700" :
                        outlet.channel === "MOFT" ? "bg-orange-100 text-orange-700" :
                        outlet.channel === "DIRS" ? "bg-red-100 text-red-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {outlet.channel}
                      </span>
                    </td>
                    <td className="sticky left-[490px] z-10 border border-gray-300 px-1 py-0.5 text-center text-[10px]" style={{ backgroundColor: stickyBg }}>
                      {outlet.type}
                    </td>
                    <td className="sticky left-[530px] z-10 border border-gray-300 px-1 py-0.5 text-center text-[10px]" style={{ backgroundColor: stickyBg }}>
                      {outlet.chain}
                    </td>
                    <td className="sticky left-[575px] z-10 border border-gray-300 px-1 py-0.5 text-center text-[10px]" style={{ backgroundColor: stickyBg }}>
                      {outlet.tm}
                    </td>

                    {/* Individual SKU values */}
                    {brands.map((brand, bi) => {
                      const color = brandColors[bi % brandColors.length];
                      return brand.skus.map((sku) => {
                        const val = outlet.skuVals[String(sku.col)] || 0;
                        return (
                          <td
                            key={sku.col}
                            className="border border-gray-300 px-1 py-0.5 text-right tabular-nums text-[10px]"
                            style={{ backgroundColor: val ? color.bg : undefined }}
                          >
                            {formatVal(val)}
                          </td>
                        );
                      });
                    })}

                    {/* Brand totals */}
                    {brandTotalLabels.map((label) => {
                      const val = outlet.brandTotals[label] || 0;
                      return (
                        <td key={label} className={`border border-gray-300 px-1 py-0.5 text-right tabular-nums text-[10px] ${val ? "bg-[#E2EFDA] font-medium" : ""}`}>
                          {formatVal(val)}
                        </td>
                      );
                    })}

                    {/* LBCL Total */}
                    <td className={`border border-gray-300 px-1 py-0.5 text-right tabular-nums text-[10px] ${outlet.lbclTotal ? "bg-[#FCE4D6] font-semibold" : ""}`}>
                      {formatVal(outlet.lbclTotal)}
                    </td>

                    {/* Must Have Base */}
                    {mustHaveLabels.map((label) => {
                      const val = outlet.mustHave[label] || 0;
                      return (
                        <td key={label} className={`border border-gray-300 px-1 py-0.5 text-center text-[10px] ${val === 1 ? "bg-green-100 text-green-700 font-medium" : ""}`}>
                          {val === 1 ? "1" : "-"}
                        </td>
                      );
                    })}

                    {/* Volume Drive */}
                    {volDriveLabels.map((label) => {
                      const val = outlet.volDrive[label] || 0;
                      return (
                        <td key={label} className={`border border-gray-300 px-1 py-0.5 text-center text-[10px] ${val === 1 ? "bg-yellow-100 text-yellow-700 font-medium" : ""}`}>
                          {val === 1 ? "1" : "-"}
                        </td>
                      );
                    })}
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
