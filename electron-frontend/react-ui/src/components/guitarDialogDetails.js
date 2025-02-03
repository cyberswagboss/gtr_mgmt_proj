import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    Box,
    Divider,
} from "@mui/material";

const GuitarDialogDetails = ({ open, onClose, guitar }) => {
    if (!guitar) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {guitar.instrumentType}: {guitar.manufacturer} {guitar.model}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    
                    {/* General Information */}
                    <Typography variant="h6">General Information</Typography>
                    <Typography><strong>Manufacturer:</strong> {guitar.manufacturer}</Typography>
                    <Typography><strong>Model:</strong> {guitar.model}</Typography>
                    <Typography><strong>Serial:</strong> {guitar.serial}</Typography>
                    <Divider />

                    {/* Materials */}
                    <Typography variant="h6">Materials</Typography>
                    <Typography><strong>Body Material:</strong> {guitar.bodyMaterial}</Typography>
                    <Typography><strong>Neck Material:</strong> {guitar.neckMaterial}</Typography>
                    <Typography><strong>Fretboard Material:</strong> {guitar.fretboardMaterial}</Typography>
                    <Divider />

                    {/* Specifications */}
                    <Typography variant="h6">Specifications</Typography>
                    <Typography><strong>Number of Strings:</strong> {guitar.numberOfStrings}</Typography>
                    <Typography><strong>Number of Frets:</strong> {guitar.numberOfFrets}</Typography>
                    <Typography><strong>Scale Length:</strong> {guitar.scaleLength} inches</Typography>
                    <Typography><strong>Tuning:</strong> {guitar.tuning}</Typography>
                    <Typography><strong>String Gauge:</strong> {guitar.stringGauge}</Typography>
                    <Divider />

                    {/* Pickups & Electronics */}
                    <Typography variant="h6">Pickups & Electronics</Typography>
                    <Typography><strong>Pickup Layout:</strong> {guitar.pickupLayout}</Typography>
                    <Typography><strong>Bridge Pickup:</strong> {guitar.bridgePickup}</Typography>
                    <Typography><strong>Middle Pickup:</strong> {guitar.middlePickup}</Typography>
                    <Typography><strong>Neck Pickup:</strong> {guitar.neckPickup}</Typography>
                    <Divider />

                    {/* Notes & Associated Projects */}
                    <Typography variant="h6">Notes & Projects</Typography>
                    <Typography><strong>Bridge:</strong> {guitar.bridge}</Typography>
                    <Typography><strong>Associated Projects:</strong> {guitar.associatedProjects || "None"}</Typography>
                    <Typography><strong>Notes:</strong> {guitar.notes || "No additional notes"}</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="contained">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default GuitarDialogDetails;
