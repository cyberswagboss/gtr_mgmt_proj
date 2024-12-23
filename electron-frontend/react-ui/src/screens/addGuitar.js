import { useState } from "react";
import {
    Box,
    TextField,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Typography,
    Paper,
    Button,
} from "@mui/material";
import bgimg from "../resources/bg-img-2.jpg";
import { API_ROUTES } from "../apiGateway";

const AddGuitarScreen = () => {
    // State Hooks for All Inputs
    const [manufacturer, setManufacturer] = useState("");
    const [model, setModel] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
    const [instrumentType, setInstrumentType] = useState("");
    const [stringCount, setStringCount] = useState(null);
    const [tuning, setTuning] = useState("");
    const [stringGauge, setStringGauge] = useState("");
    const [associatedProjects, setAssociatedProjects] = useState("");
    const [bodyMaterial, setBodyMaterial] = useState("");
    const [neckMaterial, setNeckMaterial] = useState("");
    const [fretboardMaterial, setFretboardMaterial] = useState("");
    const [numberOfFrets, setFretCount] = useState(null);
    const [scaleLength, setScaleLength] = useState(null);
    const [bridge, setBridge] = useState("");
    const [pickupLayout, setPickupLayout] = useState("");
    const [bridgePickup, setBridgePickup] = useState("");
    const [middlePickup, setMiddlePickup] = useState("");
    const [neckPickup, setNeckPickup] = useState("");
    const [notes, setNotes] = useState("");

    const handleInstrumentChange = (event) => {
        setInstrumentType(event.target.value);
        setStringCount(""); // Reset string count when instrument type changes
    };

    const handleStringCountChange = (event) => {
        setStringCount(event.target.value);
    };

    const handleFretChange = (event) => {
        setFretCount(event.target.value);
    };

    const getStringOptions = () => {
        if (instrumentType === "Guitar") {
            return [6, 7, 8, 9, 12];
        } else if (instrumentType === "Bass") {
            return [4, 5, 6];
        }
        return [];
    };

    const submitForm = async (e) => {
        const guitarData = {
            manufacturer,
            model,
            serial: serialNumber,
            instrumentType,
            numberOfStrings: stringCount,
            tuning,
            stringGauge,
            associatedProjects,
            bodyMaterial,
            neckMaterial,
            fretboardMaterial,
            numberOfFrets,
            scaleLength: parseFloat(scaleLength),
            bridge,
            pickupLayout,
            bridgePickup,
            middlePickup,
            neckPickup,
            notes
        };

        console.log("Guitar Data Submitted:", guitarData);

        const api_path = API_ROUTES.BASE_URL + API_ROUTES.POST_ADD_GUITAR;
        console.log("API-Path: ", api_path);
        try {
            const repsonse = await fetch(API_ROUTES.BASE_URL + API_ROUTES.POST_ADD_GUITAR, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(guitarData)
            })

        } catch (error) {
            console.error("Failed Posting: ", error);
        }


    };

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
                }}
            >
                <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold" }}>
                    Add Guitar
                </Typography>

                <Box
                    component="form"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <TextField
                        required
                        label="Manufacturer"
                        value={manufacturer}
                        onChange={(e) => setManufacturer(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        required
                        label="Model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        required
                        label="Serial Number"
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                        fullWidth
                    />

                    <FormControl fullWidth>
                        <InputLabel>Instrument Type</InputLabel>
                        <Select
                            value={instrumentType}
                            onChange={handleInstrumentChange}
                            fullWidth
                        >
                            <MenuItem value="Bass">Bass</MenuItem>
                            <MenuItem value="Guitar">Guitar</MenuItem>
                        </Select>
                    </FormControl>

                    {instrumentType && (
                        <FormControl fullWidth>
                            <InputLabel>Number of Strings</InputLabel>
                            <Select
                                value={stringCount}
                                onChange={handleStringCountChange}
                                fullWidth
                            >
                                {getStringOptions().map((count) => (
                                    <MenuItem key={count} value={count}>
                                        {count}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                    <TextField
                        required
                        label="Tuning"
                        value={tuning}
                        onChange={(e) => setTuning(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        required
                        label="String Gauge"
                        value={stringGauge}
                        onChange={(e) => setStringGauge(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Associated Projects"
                        value={associatedProjects}
                        onChange={(e) => setAssociatedProjects(e.target.value)}
                        fullWidth
                    />

                    <TextField
                        required
                        label="Body Material"
                        value={bodyMaterial}
                        onChange={(e) => setBodyMaterial(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        required
                        label="Neck Material"
                        value={neckMaterial}
                        onChange={(e) => setNeckMaterial(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        required
                        label="Fretboard Material"
                        value={fretboardMaterial}
                        onChange={(e) => setFretboardMaterial(e.target.value)}
                        fullWidth
                    />

                    <FormControl fullWidth>
                        <InputLabel>Number of Frets</InputLabel>
                        <Select
                            value={numberOfFrets}
                            onChange={handleFretChange}
                            fullWidth
                        >
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={21}>21</MenuItem>
                            <MenuItem value={22}>22</MenuItem>
                            <MenuItem value={24}>24</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        required
                        label="Scale Length"
                        value={scaleLength}
                        onChange={(e) => setScaleLength(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        required
                        label="Bridge"
                        value={bridge}
                        onChange={(e) => setBridge(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        required
                        label="Pickup Layout"
                        value={pickupLayout}
                        onChange={(e) => setPickupLayout(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        required
                        label="Bridge Pickup"
                        value={bridgePickup}
                        onChange={(e) => setBridgePickup(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Middle Pickup"
                        value={middlePickup}
                        onChange={(e) => setMiddlePickup(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        required
                        label="Neck Pickup"
                        value={neckPickup}
                        onChange={(e) => setNeckPickup(e.target.value)}
                        fullWidth
                    />

                    <TextField
                        label="Notes"
                        multiline
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        fullWidth
                    />

                    <Button
                        variant="contained"
                        size="large"
                        onClick={submitForm}
                        sx={{ marginTop: 2 }}
                        fullWidth
                    >
                        Save Guitar
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default AddGuitarScreen;
