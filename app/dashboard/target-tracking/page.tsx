"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TargetTrackingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Target Tracking</h1>
        <p className="text-muted-foreground">
          Track and monitor your targets in real-time
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Targets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">48</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Achieved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">32</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">16</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Target Tracking Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Content for Target Tracking will be added here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
