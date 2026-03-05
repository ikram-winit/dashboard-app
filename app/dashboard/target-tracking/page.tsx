"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import brandTargetData from "@/lib/brand-target-data.json";

interface DataRow {
  brand: string;
  ly: number;
  lyToft: number;
  lyTont: number;
  lyHoreca: number;
  lyMoft: number;
  lyDirs: number;
  lyTotal: number;
  tgt1: number;
  tgt2: number;
  tgtToft: number;
  tgtTont: number;
  tgtHoreca: number;
  tgtMoft: number;
  tgtDirs: number;
  tgtTotal: number;
}

interface Totals {
  ly: number;
  lyToft: number;
  lyTont: number;
  lyHoreca: number;
  lyMoft: number;
  lyDirs: number;
  lyTotal: number;
  tgt1: number;
  tgt2: number;
  tgtToft: number;
  tgtTont: number;
  tgtHoreca: number;
  tgtMoft: number;
  tgtDirs: number;
  tgtTotal: number;
}

const formatNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined || value === 0) return "0";
  return Math.round(value).toLocaleString();
};

export default function BrandTargetTrackingPage() {
  const { totals, data } = brandTargetData as {
    totals: Totals;
    data: DataRow[];
  };

  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle confirm submission
  const handleConfirm = async () => {
    setIsSubmitting(true);
    setShowLoadingModal(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setShowLoadingModal(false);
    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-2 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold">Brand Target Tracking</h1>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 border rounded-lg overflow-hidden">
        <div className="overflow-auto h-full w-full">
          <table className="text-xs border-collapse min-w-[1200px]">
            <thead className="sticky top-0 z-20">
              {/* Single Header Row - Exactly matching Excel */}
              <tr className="bg-[#4472C4] text-white">
                <th className="sticky left-0 z-30 bg-[#4472C4] border border-[#2F5496] px-3 py-1.5 text-left font-semibold w-[150px] min-w-[150px]">
                  Brand
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold w-[80px]">
                  LY
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold w-[70px]">
                  TOFT
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold w-[70px]">
                  TONT
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold w-[70px]">
                  HoReCa
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold w-[70px]">
                  MOFT
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold w-[70px]">
                  DIRS
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold w-[80px]">
                  Total
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold w-[70px] bg-[#70AD47]">
                  TOFT
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold w-[70px] bg-[#70AD47]">
                  TONT
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold w-[70px] bg-[#70AD47]">
                  HoReCa
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold w-[70px] bg-[#70AD47]">
                  MOFT
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold w-[70px] bg-[#70AD47]">
                  DIRS
                </th>
                <th className="border border-[#2F5496] px-2 py-1.5 text-center font-semibold w-[80px] bg-[#70AD47]">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {/* Totals Row */}
              <tr className="bg-[#D6DCE4] font-bold">
                <td className="sticky left-0 z-10 bg-[#D6DCE4] border border-gray-300 px-3 py-1">
                  Total
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  {formatNumber(totals.ly)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  {formatNumber(totals.lyToft)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  {formatNumber(totals.lyTont)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  {formatNumber(totals.lyHoreca)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  {formatNumber(totals.lyMoft)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  {formatNumber(totals.lyDirs)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right bg-[#BDD7EE]">
                  {formatNumber(totals.lyTotal)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right bg-[#E2EFDA]">
                  {formatNumber(totals.tgtToft)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right bg-[#E2EFDA]">
                  {formatNumber(totals.tgtTont)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right bg-[#E2EFDA]">
                  {formatNumber(totals.tgtHoreca)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right bg-[#E2EFDA]">
                  {formatNumber(totals.tgtMoft)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right bg-[#E2EFDA]">
                  {formatNumber(totals.tgtDirs)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right bg-[#C6E0B4] font-bold">
                  {formatNumber(totals.tgtTotal)}
                </td>
              </tr>

              {/* Data Rows */}
              {data.map((row, index) => {
                const isAlternate = index % 2 === 1;
                const rowBgClass = isAlternate ? "bg-[#E4E4E4]" : "bg-white";

                return (
                  <tr key={index} className={rowBgClass}>
                    <td className={`sticky left-0 z-10 ${rowBgClass} border border-gray-300 px-3 py-1 text-left font-medium`}>
                      {row.brand}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right tabular-nums">
                      {formatNumber(row.ly)}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right tabular-nums">
                      {formatNumber(row.lyToft)}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right tabular-nums">
                      {formatNumber(row.lyTont)}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right tabular-nums">
                      {formatNumber(row.lyHoreca)}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right tabular-nums">
                      {formatNumber(row.lyMoft)}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right tabular-nums">
                      {formatNumber(row.lyDirs)}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right tabular-nums bg-[#DDEBF7] font-medium">
                      {formatNumber(row.lyTotal)}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right tabular-nums bg-[#E2EFDA]">
                      {formatNumber(row.tgtToft)}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right tabular-nums bg-[#E2EFDA]">
                      {formatNumber(row.tgtTont)}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right tabular-nums bg-[#E2EFDA]">
                      {formatNumber(row.tgtHoreca)}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right tabular-nums bg-[#E2EFDA]">
                      {formatNumber(row.tgtMoft)}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right tabular-nums bg-[#E2EFDA]">
                      {formatNumber(row.tgtDirs)}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right tabular-nums bg-[#C6E0B4] font-medium">
                      {formatNumber(row.tgtTotal)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirm Button */}
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
              Please wait while we submit your brand targets.
            </p>
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
              Your brand targets have been submitted successfully.
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
