"use client";

import { Loader2, Plus } from "lucide-react";

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/data-table";

import {columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete-accounts";
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useState } from "react";
import { UploadButton } from "./upload-button";
import { ImportCard } from "./import-card";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT"
};

const INITIAL_IMPORT_RESULTS = { data: [], errors: [], meta: {} };

const TransactionsPage = () => {
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    console.log(results)
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };
  
  const { onOpen } = useNewTransaction();
  const bulkCreateMutation = useBulkCreateTransactions();
  const bulkDeleteMutation = useBulkDeleteTransactions();
  const transactionsQuery = useGetTransactions();
  const transactionsData = transactionsQuery.data || [];


  const isDisabled =
    transactionsQuery.isLoading || 
    bulkDeleteMutation.isPending;

  if (transactionsQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="h-6 w-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
      <h1>this is for UploadButton</h1>
        {/* <AccountDialog /> */}
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={() => {}}
        />
      </>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
      <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="text-xl line-clamp-1">
          Transaction History
        </CardTitle>
        <div className="flex items-center gap-x-2">
          <Button onClick={onOpen} size="sm" className="w-full lg:w-auto">
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
          <UploadButton onUpload={onUpload} />
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          disabled={isDisabled}
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            bulkDeleteMutation.mutate({ ids });
          }}
          filterKey="payee" 
          columns={columns} 
          data={transactionsData}
        />
      </CardContent>
      </Card>
    </div>
  );
};
 
export default TransactionsPage;
