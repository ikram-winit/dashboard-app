"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TONTPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">TONT</h1>
        <p className="text-muted-foreground">
          TONT metrics and analytics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total TONT</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">156</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">98</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">58</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>TONT Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Content for TONT will be added here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
