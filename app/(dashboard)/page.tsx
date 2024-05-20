"use client"

import { Button } from "@/components/ui/button";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { DataGrid } from "@/components/data-grid";
// import { UserButton } from "@clerk/nextjs";

export default function Home() {

  // const { data: accounts, isLoading }  = useGetAccounts()
  const { onOpen } = useNewAccount()

  // if(isLoading) {
  //   return (
  //     <div>Loading...</div>
  //   )
  // }
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <DataGrid />
      {/* <DataCharts /> */}
    </div>
  )
}