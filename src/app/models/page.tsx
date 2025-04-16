"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const models = [
  {
    id: "1",
    name: "Model A",
    version: "1.0",
    description: "First version of Model A",
    status: "Active",
  },
  {
    id: "2",
    name: "Model B",
    version: "2.0",
    description: "Second version of Model B",
    status: "Inactive",
  },
  {
    id: "3",
    name: "Model C",
    version: "1.5",
    description: "Intermediate version of Model C",
    status: "Active",
  },
];

export default function ModelsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Models</h1>
          <p className="text-muted-foreground">
            Manage and monitor your machine learning models.
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
          <CardTitle>Available Models</CardTitle>
          <CardDescription>
            A list of all available machine learning models.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {models.map(model => (
                <TableRow key={model.id} className="hover:bg-accent">
                  <TableCell className="font-medium">{model.name}</TableCell>
                  <TableCell>{model.version}</TableCell>
                  <TableCell>{model.description}</TableCell>
                  <TableCell>{model.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
