"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardHome() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/marketing-bottom");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-lg">Redirecting...</div>
    </div>
  );
}
