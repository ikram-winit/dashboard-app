"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TargetBreakingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Target Breaking</h1>
        <p className="text-muted-foreground">
          Analyze and manage target breakdowns
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Broken Targets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">8</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recovery Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">75%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Avg Recovery Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2.5 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Target Breaking Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Content for Target Breaking will be added here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
