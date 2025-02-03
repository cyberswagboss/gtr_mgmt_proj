import {
    Box,
    Button,
    Typography,
    Stack
} from "@mui/material";

import GuitarDialogDetails from "./guitarDialogDetails";
import GuitarDialogEdit from "./guitarDialogEdit";
import { API_ROUTES } from "../apiGateway";
import { useState } from "react";

const GuitarContainer = ({ guitar }) => {
    const [openDetials, setOpenDetails] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [guitarData, setGuitarData] = useState(guitar);

    const closeDetails = async (event) => {
        event.preventDefault();
        setOpenDetails(false);

    }

    const closeEdit = async (event) => {
        event.preventDefault();
        setOpenEdit(false);
    }

    const handleSave = async (guitar) => {
        setGuitarData(guitar);

        const apiCall = API_ROUTES.BASE_URL + API_ROUTES.PUT_UPDATE_GUITAR + guitar.id;
        try {
            const response = await fetch(apiCall, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(guitarData),
            });

            console.log(response);
        } catch (e) {
            console.error("Failed Putting:", e);
        }

    }

    const handleEdit = async (event) => {
        event.preventDefault();
        console.log(`Edit presed on ${guitar.manufacturer} ${guitar.model}`);
        setOpenEdit(true);
    };

    const handleDetails = async (event) => {
        event.preventDefault();
        console.log(`View details for ${guitar.manufacturer} ${guitar.model}`);
        setOpenDetails(true);

    };

    const handleDelete = async (event) => {
        event.preventDefault();
        console.log(`Delete pressed on Guitar ${guitar.id}`);

        const apiCall = API_ROUTES.BASE_URL + API_ROUTES.DELETE_GUITAR + guitar.id;
        try{
            const response = await fetch(apiCall, {
                method: "DELETE"
            })
            console.log(response);
        } catch(e) {
            console.error("Failed deleting: ", e);
        }
        window.location.reload();
    };

    return (
        <>
            <Box
                sx={{
                    borderRadius: 2,
                    border: 1,
                    borderColor: "grey.400",
                    padding: 1.5,
                    backgroundColor: "white",
                    boxShadow: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    maxWidth: "100%",
                    marginY: 0,
                }}
            >
                {/* Left Side: Guitar Info */}
                <Box sx={{ flex: 1, minWidth: 0, marginRight: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {guitar.manufacturer} {guitar.model}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Serial: {guitar.serial}
                    </Typography>
                </Box>

                {/* Right Side: Buttons */}
                <Stack direction="row" spacing={1}>
                    <Button variant="contained" color="primary" size="small" onClick={handleEdit}>
                        Edit
                    </Button>
                    <Button variant="outlined" color="info" size="small" onClick={handleDetails}>
                        Details
                    </Button>
                    <Button variant="contained" color="error" size="small" onClick={handleDelete}>
                        Delete
                    </Button>
                </Stack>
            </Box>
            <GuitarDialogDetails open={openDetials} onClose={closeDetails} guitar={guitar} />
            <GuitarDialogEdit open={openEdit} onClose={closeEdit} guitar={guitar} onSave={handleSave} />
        </>
    );
};

export default GuitarContainer;
