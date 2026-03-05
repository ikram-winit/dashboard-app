"use client";

import { useState, useRef } from "react";
import { Upload, X, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  aiForecast: number | null;
  marPlan: number | null;
  aprPlan: number | null;
  mayPlan: number | null;
}

interface Totals {
  mar25Total: number;
  toftTotal: number;
  tontTotal: number;
  horecaTotal: number;
  moftTotal: number;
  dirsTotal: number;
  totalTotal: number;
  buBrandsTotal: number;
  buSalesTotal: number;
  aiForecastTotal: number;
  marPlanTotal: number;
  aprPlanTotal: number;
  mayPlanTotal: number;
}

interface PlanValues {
  [key: string]: {
    marPlan: string;
    aprPlan: string;
    mayPlan: string;
  };
}

const formatNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return "0";
  return Math.round(value).toLocaleString();
};

const formatInputValue = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return "0";
  return Math.round(value).toString();
};

export default function MarketingBottomPage() {
  const { totals, data } = marketingData as {
    totals: Totals;
    data: DataRow[];
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize plan values state
  const [planValues, setPlanValues] = useState<PlanValues>(() => {
    const initial: PlanValues = {};
    data.forEach((row) => {
      initial[row.row] = {
        marPlan: formatInputValue(row.marPlan),
        aprPlan: formatInputValue(row.aprPlan),
        mayPlan: formatInputValue(row.mayPlan),
      };
    });
    return initial;
  });

  // Handle input change - only allow numbers
  const handlePlanChange = (
    rowId: number,
    field: "marPlan" | "aprPlan" | "mayPlan",
    value: string
  ) => {
    // Only allow numbers (and empty string)
    if (value === "" || /^\d*$/.test(value)) {
      setPlanValues((prev) => ({
        ...prev,
        [rowId]: {
          ...prev[rowId],
          [field]: value,
        },
      }));
    }
  };

  // Calculate totals from current input values
  const calculatePlanTotal = (field: "marPlan" | "aprPlan" | "mayPlan"): number => {
    return Object.values(planValues).reduce((sum, row) => {
      const value = parseInt(row[field]) || 0;
      return sum + value;
    }, 0);
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Handle import
  const handleImport = () => {
    if (selectedFile) {
      // Here you would process the file
      console.log("Importing file:", selectedFile.name);
      setShowImportModal(false);
      setSelectedFile(null);
    }
  };

  // Handle confirm submission
  const handleConfirm = async () => {
    setIsSubmitting(true);
    setShowLoadingModal(true);

    // Simulate API call with delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Here you would submit the data
    console.log("Submitting plan values:", planValues);

    setShowLoadingModal(false);
    setIsSubmitting(false);
    setShowSuccessModal(true);
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
    <div className="flex flex-col h-[calc(100vh-80px)]">
      {/* Header Section - Fixed */}
      <div className="flex items-center justify-between mb-2 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold">Marketing Bottom Up Plan</h1>
          <p className="text-sm text-muted-foreground">Mar Apr May 2026</p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setShowImportModal(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <div className="text-right">
            <p className="text-sm font-medium">Total Volume</p>
            <p className="text-2xl font-bold text-primary">
              {formatNumber(totals.totalTotal)}
            </p>
          </div>
        </div>
      </div>

      {/* Table Container - Scrollable */}
      <div className="flex-1 border rounded-lg overflow-hidden">
        <div className="overflow-auto h-full w-full">
          <table className="text-xs border-collapse min-w-[1500px]">
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
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold bg-[#70AD47] text-white" colSpan={6}>
                  Bottom-up
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold bg-[#ED7D31]" colSpan={3}>
                  Bottom-up
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold bg-[#FFC000]">
                  Mar-26
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold bg-[#FFC000]">
                  Apr-26
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold bg-[#FFC000]">
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
                <th className="border border-[#2F5496] px-2 py-1 text-center font-medium text-[10px] bg-[#ED7D31] w-[80px] min-w-[80px]">
                  AI Forecast
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
                <td className="border border-gray-300 px-2 py-1 text-right bg-[#FCE4D6]">
                  {formatNumber(totals.aiForecastTotal)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right bg-[#FFF2CC]">
                  {calculatePlanTotal("marPlan").toLocaleString()}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right bg-[#FFF2CC]">
                  {calculatePlanTotal("aprPlan").toLocaleString()}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right bg-[#FFF2CC]">
                  {calculatePlanTotal("mayPlan").toLocaleString()}
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
                      <td className="border border-gray-300 px-2 py-1 text-right tabular-nums bg-[#FCE4D6]">
                        {formatNumber(row.aiForecast)}
                      </td>
                      <td className="border border-gray-300 p-0.5 bg-[#FFF2CC]">
                        <input
                          type="text"
                          value={planValues[row.row]?.marPlan || "0"}
                          onChange={(e) => handlePlanChange(row.row, "marPlan", e.target.value)}
                          className="w-full px-2 py-0.5 text-right text-xs tabular-nums bg-white border border-gray-400 rounded outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 hover:border-gray-500"
                        />
                      </td>
                      <td className="border border-gray-300 p-0.5 bg-[#FFF2CC]">
                        <input
                          type="text"
                          value={planValues[row.row]?.aprPlan || "0"}
                          onChange={(e) => handlePlanChange(row.row, "aprPlan", e.target.value)}
                          className="w-full px-2 py-0.5 text-right text-xs tabular-nums bg-white border border-gray-400 rounded outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 hover:border-gray-500"
                        />
                      </td>
                      <td className="border border-gray-300 p-0.5 bg-[#FFF2CC]">
                        <input
                          type="text"
                          value={planValues[row.row]?.mayPlan || "0"}
                          onChange={(e) => handlePlanChange(row.row, "mayPlan", e.target.value)}
                          className="w-full px-2 py-0.5 text-right text-xs tabular-nums bg-white border border-gray-400 rounded outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 hover:border-gray-500"
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirm Button - Fixed at bottom */}
      <div className="flex justify-end mt-2 flex-shrink-0">
        <Button
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="px-8 bg-green-600 hover:bg-green-700 disabled:bg-green-400"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            "Confirm"
          )}
        </Button>
      </div>

      {/* Loading Modal */}
      {showLoadingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Submitting...
            </h2>
            <p className="text-sm text-gray-600">
              Please wait while we submit your marketing plan.
            </p>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Import Excel File</h2>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setSelectedFile(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.xlsm"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="h-10 w-10 mx-auto text-gray-400 mb-3" />
              <p className="text-sm text-gray-600 mb-2">
                {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-gray-400 mb-4">
                Excel files only (.xlsx, .xls, .xlsm)
              </p>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Select File
              </Button>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowImportModal(false);
                  setSelectedFile(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleImport}
                disabled={!selectedFile}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Import
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Successfully Submitted!
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Your marketing plan has been submitted successfully.
            </p>
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Done
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
