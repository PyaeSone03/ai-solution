import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/front/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
