import SyncLoaderSpinner from "@/UI/Spinner/SyncLoader";
import { Box } from "@/components/MaterialUI/Material-UI";
import PageLoaderSpinner from "@/UI/Spinner/PageLoaderSpinner";

export default function Loading() {
    return (
        <Box sx={{ height: "100vh",  width: "100%", display: "flex", flexDirection: "column", alignItems: "center",  justifyContent: "center" }}>
            <PageLoaderSpinner width={50} height={50} /> 
        </Box>
    );
};