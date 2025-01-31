import {
    useState,
    useEffect,
    useRef
} from "react";
import {
    Box,
    Paper,
    Button,
    Typography
} from "@mui/material";
import bgimg from "../resources/bg-img-2.jpg";
import { API_ROUTES } from "../apiGateway";
import { useNavigate } from "react-router";

import GuitarContainer from "../components/guitarContainer";
import GuitarDialogDetails from "../components/guitarDialogDetails";

const ViewGuitarsScreen = () => {
    const [guitars, setGuitars] = useState([]);
    const isFetched = useRef(false);

    const navigate = useNavigate();

    const handleBack = async (event) => {
        event.preventDefault();
        navigate("/");
    };

    useEffect(() => {
        if (isFetched.current) return;
        isFetched.current = true;

        const fetchData = async () => {
            const apiCall = API_ROUTES.BASE_URL + API_ROUTES.GET_ALL_GUITARS;
            console.log("Fetching from: ", apiCall);

            try {
                const response = await fetch(apiCall, {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const responseData = await response.json();
                console.log(responseData);

                setGuitars(responseData);
            } catch (e) {
                console.error("Fetching failed: ", e);
            }
        };

        fetchData();
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundImage: `url(${bgimg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: "90%",
                    maxWidth: 600,
                    padding: 4,
                    borderRadius: 2,
                    backgroundColor: "white",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    position: "relative", // Enable relative positioning for the Paper
                }}
            >
                <Button
                    variant="contained"
                    size="small"
                    onClick={handleBack}
                    sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        padding: "4px 8px",
                        fontSize: "0.75rem",
                    }}
                >
                    Back
                </Button>

                <Typography
                    variant="h4"
                    sx={{ marginBottom: 3, fontWeight: "bold", textAlign: "center" }}
                >
                    View all Guitars
                </Typography>

                <Box
                    component="form"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1
                    }}
                >
                    {guitars.map((guitar, index) => (
                        <GuitarContainer key={index} guitar={guitar} />
                    ))}
                </Box>
            </Paper>

        </Box>
    );
}

export default ViewGuitarsScreen