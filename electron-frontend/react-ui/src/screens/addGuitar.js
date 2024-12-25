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
import { useNavigate } from "react-router";

const AddGuitarScreen = () => {

    const navigate = useNavigate();

    const [manufacturer, setManufacturer] = useState("");
    const [model, setModel] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
    const [instrumentType, setInstrumentType] = useState("");
    const [stringCount, setStringCount] = useState("");
    const [tuning, setTuning] = useState("");
    const [stringGauge, setStringGauge] = useState("");
    const [associatedProjects, setAssociatedProjects] = useState("");
    const [bodyMaterial, setBodyMaterial] = useState("");
    const [neckMaterial, setNeckMaterial] = useState("");
    const [fretboardMaterial, setFretboardMaterial] = useState("");
    const [numberOfFrets, setFretCount] = useState("");
    const [scaleLength, setScaleLength] = useState("");
    const [bridge, setBridge] = useState("");
    const [pickupLayout, setPickupLayout] = useState("");
    const [bridgePickup, setBridgePickup] = useState("");
    const [middlePickup, setMiddlePickup] = useState("");
    const [neckPickup, setNeckPickup] = useState("");
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState({});

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
        e.preventDefault();

        let newErrors = {};
        if (!manufacturer) newErrors.manufacturer = "Manufacturer is required";
        if (!model) newErrors.model = "Model is required";
        if (!serialNumber) newErrors.serialNumber = "Serial Number is required";
        if (!instrumentType) newErrors.instrumentType = "Instrument Type is required";
        if (!stringCount) newErrors.stringCount = "Number of Strings is required";
        if (!tuning) newErrors.tuning = "Tuning is required";
        if (!stringGauge) newErrors.stringGauge = "String Gauge is required";
        if (!bodyMaterial) newErrors.bodyMaterial = "Body Material is required";
        if (!neckMaterial) newErrors.neckMaterial = "Neck Material is required";
        if (!fretboardMaterial) newErrors.fretboardMaterial = "Fretboard Material is required";
        if (!numberOfFrets) newErrors.numberOfFrets = "Number of Frets is required";
        if (!scaleLength) newErrors.scaleLength = "Scale Length is required";
        if (!bridge) newErrors.bridge = "Bridge is required";
        if (!pickupLayout) newErrors.pickupLayout = "Pickup Layout is required";

        if ((pickupLayout === "HSH" || pickupLayout === "SSS") && !middlePickup)
            newErrors.middlePickup = "Middle Pickup is required";
        if ((pickupLayout === "HSS" || pickupLayout === "HH") && !neckPickup)
            newErrors.neckPickup = "Neck Pickup is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        const guitarData = {
            manufacturer,
            model,
            serial: serialNumber,
            instrumentType,
            numberOfStrings: parseInt(stringCount),
            tuning,
            stringGauge,
            associatedProjects,
            bodyMaterial,
            neckMaterial,
            fretboardMaterial,
            numberOfFrets: parseInt(numberOfFrets),
            scaleLength: parseFloat(scaleLength),
            bridge,
            pickupLayout,
            bridgePickup,
            middlePickup,
            neckPickup,
            notes,
        };

        try {
            const response = await fetch(API_ROUTES.BASE_URL + API_ROUTES.POST_ADD_GUITAR, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(guitarData),
            });
            console.log(response);
            navigate("/home");
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
                        error={!!errors.manufacturer}
                        helperText={errors.manufacturer}
                        fullWidth
                    />
                    <TextField
                        required
                        label="Model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        error={!!errors.model}
                        helperText={errors.model}
                        fullWidth
                    />
                    <TextField
                        required
                        label="Serial Number"
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                        error={!!errors.serialNumber}
                        helperText={errors.serialNumber}
                        fullWidth
                    />

                    <FormControl fullWidth error={!!errors.instrumentType}>
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
                        <FormControl fullWidth error={!!errors.stringCount}>
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
                        error={!!errors.tuning}
                        helperText={errors.tuning}
                        fullWidth
                    />
                    <TextField
                        required
                        label="String Gauge"
                        value={stringGauge}
                        onChange={(e) => setStringGauge(e.target.value)}
                        error={!!errors.stringGauge}
                        helperText={errors.stringGauge}
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
                        error={!!errors.bodyMaterial}
                        helperText={errors.bodyMaterial}
                        fullWidth
                    />
                    <TextField
                        required
                        label="Neck Material"
                        value={neckMaterial}
                        onChange={(e) => setNeckMaterial(e.target.value)}
                        error={!!errors.neckMaterial}
                        helperText={errors.neckMaterial}
                        fullWidth
                    />
                    <TextField
                        required
                        label="Fretboard Material"
                        value={fretboardMaterial}
                        onChange={(e) => setFretboardMaterial(e.target.value)}
                        error={!!errors.fretboardMaterial}
                        helperText={errors.fretboardMaterial}
                        fullWidth
                    />

                    <FormControl fullWidth error={!!errors.numberOfFrets}>
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
                        error={!!errors.scaleLength}
                        helperText={errors.scaleLength}
                        fullWidth
                    />
                    <TextField
                        required
                        label="Bridge"
                        value={bridge}
                        onChange={(e) => setBridge(e.target.value)}
                        error={!!errors.bridge}
                        helperText={errors.bridge}
                        fullWidth
                    />
                    <FormControl fullWidth error={!!errors.pickupLayout}>
                        <InputLabel>Pickup Layout</InputLabel>
                        <Select
                            value={pickupLayout || ""}
                            onChange={(e) => setPickupLayout(e.target.value)}
                            fullWidth
                        >
                            <MenuItem value="HH">HH (2 Humbuckers)</MenuItem>
                            <MenuItem value="HSH">HSH (Humbucker, Single Coil, Humbucker)</MenuItem>
                            <MenuItem value="SSS">SSS (3 Single Coils)</MenuItem>
                            <MenuItem value="H">H (1 Humbucker)</MenuItem>
                            <MenuItem value="HSS">HSS (Humbucker, Single Coil, Single Coil)</MenuItem>
                        </Select>
                    </FormControl>

                    {pickupLayout === "HH" && (
                        <>
                            <TextField
                                required
                                label="Bridge Pickup"
                                value={bridgePickup}
                                onChange={(e) => setBridgePickup(e.target.value)}
                                error={!!errors.bridgePickup}
                                helperText={errors.bridgePickup}
                                fullWidth
                            />
                            <TextField
                                required
                                label="Neck Pickup"
                                value={neckPickup}
                                onChange={(e) => setNeckPickup(e.target.value)}
                                error={!!errors.neckPickup}
                                helperText={errors.neckPickup}
                                fullWidth
                            />
                        </>
                    )}

                    {pickupLayout === "HSH" && (
                        <>
                            <TextField
                                required
                                label="Bridge Pickup"
                                value={bridgePickup}
                                onChange={(e) => setBridgePickup(e.target.value)}
                                error={!!errors.bridgePickup}
                                helperText={errors.bridgePickup}
                                fullWidth
                            />
                            <TextField
                                label="Middle Pickup"
                                value={middlePickup}
                                onChange={(e) => setMiddlePickup(e.target.value)}
                                error={!!errors.middlePickup}
                                helperText={errors.middlePickup}
                                fullWidth
                            />
                            <TextField
                                required
                                label="Neck Pickup"
                                value={neckPickup}
                                onChange={(e) => setNeckPickup(e.target.value)}
                                error={!!errors.neckPickup}
                                helperText={errors.neckPickup}
                                fullWidth
                            />
                        </>
                    )}

                    {pickupLayout === "SSS" && (
                        <>
                            <TextField
                                label="Bridge Pickup"
                                value={bridgePickup}
                                onChange={(e) => setBridgePickup(e.target.value)}
                                error={!!errors.bridgePickup}
                                helperText={errors.bridgePickup}
                                fullWidth
                            />
                            <TextField
                                label="Middle Pickup"
                                value={middlePickup}
                                onChange={(e) => setMiddlePickup(e.target.value)}
                                error={!!errors.middlePickup}
                                helperText={errors.middlePickup}
                                fullWidth
                            />
                            <TextField
                                label="Neck Pickup"
                                value={neckPickup}
                                onChange={(e) => setNeckPickup(e.target.value)}
                                error={!!errors.neckPickup}
                                helperText={errors.neckPickup}
                                fullWidth
                            />
                        </>
                    )}

                    {pickupLayout === "H" && (
                        <TextField
                            required
                            label="Bridge Pickup"
                            value={bridgePickup}
                            onChange={(e) => setBridgePickup(e.target.value)}
                            error={!!errors.bridgePickup}
                            helperText={errors.bridgePickup}
                            fullWidth
                        />
                    )}

                    {pickupLayout === "HSS" && (
                        <>
                            <TextField
                                required
                                label="Bridge Pickup"
                                value={bridgePickup}
                                onChange={(e) => setBridgePickup(e.target.value)}
                                error={!!errors.bridgePickup}
                                helperText={errors.bridgePickup}
                                fullWidth
                            />
                            <TextField
                                label="Middle Pickup"
                                value={middlePickup}
                                onChange={(e) => setMiddlePickup(e.target.value)}
                                error={!!errors.middlePickup}
                                helperText={errors.middlePickup}
                                fullWidth
                            />
                            <TextField
                                label="Neck Pickup"
                                value={neckPickup}
                                onChange={(e) => setNeckPickup(e.target.value)}
                                error={!!errors.neckPickup}
                                helperText={errors.neckPickup}
                                fullWidth
                            />
                        </>
                    )}

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