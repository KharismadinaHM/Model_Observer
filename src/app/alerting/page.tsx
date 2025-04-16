"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {useState} from "react";

export default function AlertingPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Alerting</h1>
          <p className="text-muted-foreground">
            Configure alerts for model performance issues.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Back to Home
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Alerting Configuration</CardTitle>
          <CardDescription>
            Set up alerts to notify you of performance issues.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p>This is a placeholder for alerting configuration options.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
