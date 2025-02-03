import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Divider,
} from "@mui/material";

const GuitarDialogEdit = ({ open, onClose, guitar, onSave }) => {
    const [formData, setFormData] = useState({ ...guitar });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Guitar Details</DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    
                    {/* General Information */}
                    <Divider />
                    <TextField
                        label="Manufacturer"
                        name="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Model"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Serial Number"
                        name="serial"
                        value={formData.serial}
                        onChange={handleChange}
                        fullWidth
                    />

                    {/* Materials */}
                    <Divider />
                    <TextField
                        label="Body Material"
                        name="bodyMaterial"
                        value={formData.bodyMaterial}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Neck Material"
                        name="neckMaterial"
                        value={formData.neckMaterial}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Fretboard Material"
                        name="fretboardMaterial"
                        value={formData.fretboardMaterial}
                        onChange={handleChange}
                        fullWidth
                    />

                    {/* Specifications */}
                    <Divider />
                    <TextField
                        label="Number of Strings"
                        name="numberOfStrings"
                        type="number"
                        value={formData.numberOfStrings}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Number of Frets"
                        name="numberOfFrets"
                        type="number"
                        value={formData.numberOfFrets}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Scale Length (inches)"
                        name="scaleLength"
                        type="number"
                        value={formData.scaleLength}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Tuning"
                        name="tuning"
                        value={formData.tuning}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="String Gauge"
                        name="stringGauge"
                        value={formData.stringGauge}
                        onChange={handleChange}
                        fullWidth
                    />

                    {/* Pickups & Electronics */}
                    <Divider />
                    <FormControl fullWidth>
                        <InputLabel>Pickup Layout</InputLabel>
                        <Select
                            name="pickupLayout"
                            value={formData.pickupLayout}
                            onChange={handleChange}
                        >
                            <MenuItem value="H">H</MenuItem>
                            <MenuItem value="HH">HH</MenuItem>
                            <MenuItem value="SSS">SSS</MenuItem>
                            <MenuItem value="HSS">HSS</MenuItem>
                            <MenuItem value="HS">HS</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Bridge Pickup"
                        name="bridgePickup"
                        value={formData.bridgePickup}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Middle Pickup"
                        name="middlePickup"
                        value={formData.middlePickup}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Neck Pickup"
                        name="neckPickup"
                        value={formData.neckPickup}
                        onChange={handleChange}
                        fullWidth
                    />

                    {/* Notes & Associated Projects */}
                    <Divider />
                    <TextField
                        label="Bridge"
                        name="bridge"
                        value={formData.bridge}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Associated Projects"
                        name="associatedProjects"
                        value={formData.associatedProjects}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Notes"
                        name="notes"
                        multiline
                        rows={3}
                        value={formData.notes}
                        onChange={handleChange}
                        fullWidth
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default GuitarDialogEdit;
