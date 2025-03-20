import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import OfficeLayOut from "./OfficeLayOut";
import Layout from "./layOut";

interface Props {
  children: ReactNode;
}

const AppLayout = ({ children }: Props) => {
  const router = useRouter();
  const pathname = router.pathname;
  const isOffice = pathname.includes("office");
  if (isOffice) {
    return <OfficeLayOut>{children}</OfficeLayOut>;
  }
  else{
    return <Layout>{children}</Layout>
  }
  
};

export default AppLayout;
