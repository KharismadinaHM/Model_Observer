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
  TableCaption,
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Models</h2>
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Available Models</CardTitle>
          <CardDescription>
            List of available machine learning models and their versions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {models.map(model => (
                <TableRow key={model.id}>
                  <TableCell>{model.name}</TableCell>
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
