"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {useState} from "react";

export default function DataUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    // Implement your upload logic here
    console.log("Uploading file:", selectedFile);
    alert("File uploaded (check console for details)");
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Data Upload</h1>
          <p className="text-muted-foreground">
            Upload your model performance data to monitor and analyze.
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
          <CardTitle>Upload Model Performance Data</CardTitle>
          <CardDescription>
            Choose a CSV file containing model metrics data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
              />
            </div>
            <Button type="submit">Upload Data</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
