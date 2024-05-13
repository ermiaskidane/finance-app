"use client";

import { Loader2, Plus } from "lucide-react";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
// import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete-accounts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/data-table";

import { Payment, columns } from "./columns";
import { Button } from "@/components/ui/button";

 const accounts: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  }
]

const AccountsPage = () => {
  const newAccount = useNewAccount();

 

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
      <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="text-xl line-clamp-1">
          Accounts
        </CardTitle>
        <Button onClick={newAccount.onOpen} size="sm" className="w-full lg:w-auto">
          <Plus className="size-4 mr-2" />
          Add new
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable
          disabled
          onDelete={() => {}}
          filterKey="email" 
          columns={columns} 
          data={accounts}
        />
      </CardContent>
      </Card>
    </div>
  );
};
 
export default AccountsPage;
