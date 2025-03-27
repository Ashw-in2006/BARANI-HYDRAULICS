import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
// @ts-ignore
import { Table as JsPDFTable, UserOptions } from 'jspdf-autotable';

// Add type augmentation for jsPDF
declare global {
  interface Window {
    jspdf: any;
  }
}

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: UserOptions) => void;
    lastAutoTable: {
      finalY: number;
    };
  }
}

interface FormData {
  length: string;
  width: string;
  thickness: string;
  steelSpecificWeight: string;
  staticLoad: string;
  toolWeight: string;
}

interface CalculationResult {
  volume: number;
  shaftWeight: number;
  totalLoad: number;
  bearingPressure: number;
  dynamicLoad: number;
  loadBearingArea: number;
}

const PlateCalculator = () => {
  const [formData, setFormData] = useState<FormData>({
    length: "",
    width: "",
    thickness: "",
    steelSpecificWeight: "7.85", // Default from the sheet
    staticLoad: "12500", // Default from the sheet
    toolWeight: "3000", // Default from the sheet
  });

  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const length = parseFloat(formData.length);
    const width = parseFloat(formData.width);
    const thickness = parseFloat(formData.thickness);
    const steelSpecificWeight = parseFloat(formData.steelSpecificWeight);
    const staticLoad = parseFloat(formData.staticLoad);
    const toolWeight = parseFloat(formData.toolWeight);

    if (!length || !width || !thickness) {
      alert("Please enter valid values for length, width, and thickness.");
      return;
    }

    const volume = length * width * thickness;
    const shaftWeight = (volume * steelSpecificWeight) / 1000;
    const dynamicLoad = 600; // Fixed from the sheet
    const loadBearingArea = 110 * 50; // Fixed values from the sheet
    const totalLoad = staticLoad + toolWeight + dynamicLoad;
    const bearingPressure = totalLoad / loadBearingArea;

    setResult({
      volume,
      shaftWeight,
      totalLoad,
      bearingPressure,
      dynamicLoad,
      loadBearingArea,
    });
  };

  const generatePDF = () => {
    if (!result) return;

    const doc = new jsPDF();

    // Add Logo
    const logo = "/logo.png"; // Using public folder path
    doc.addImage(logo, "PNG", 15, 10, 20, 20);

    // Title
    doc.setFontSize(16);
    doc.text("BARANI HYDRAULICS INDIA PRIVATE LIMITED", 40, 20);
    doc.setFontSize(12);
    doc.text("PLATE WEIGHT & FOUNDATION CALCULATIONS", 60, 30);

    // Customer Details Table
    doc.autoTable({
      startY: 40,
      head: [["Customer Details", "Value"]],
      body: [
        ["Customer Name", ""],
        ["Machine Name", ""],
        ["WO. NO", ""],
        ["Assembly Name", ""],
      ],
    });

    const finalY1 = doc.lastAutoTable.finalY;

    // Formulas Used
    doc.autoTable({
      startY: finalY1 + 10,
      head: [["Formulas Used"]],
      body: [
        ["Weight (W) = (Volume × Steel Specific Weight) / 1000"],
        ["Bearing Pressure = Total Load / Load Bearing Area"],
      ],
    });

    const finalY2 = doc.lastAutoTable.finalY;

    // Input Parameters
    doc.autoTable({
      startY: finalY2 + 10,
      head: [["Parameter", "Value"]],
      body: [
        ["Length (cm)", formData.length],
        ["Width (cm)", formData.width],
        ["Thickness (cm)", formData.thickness],
        ["Steel Specific Weight (kg/cm³)", formData.steelSpecificWeight],
        ["Static Load (kgf)", formData.staticLoad],
        ["Tool Weight (kgf)", formData.toolWeight],
      ],
    });

    const finalY3 = doc.lastAutoTable.finalY;

    // Calculation Results
    doc.autoTable({
      startY: finalY3 + 10,
      head: [["Parameter", "Value"]],
      body: [
        ["Plate Volume (cm³)", result.volume.toFixed(2)],
        ["Shaft Weight (kg)", result.shaftWeight.toFixed(2)],
        ["Dynamic Load (kgf)", result.dynamicLoad.toFixed(2)],
        ["Load Bearing Area (cm²)", result.loadBearingArea.toFixed(2)],
        ["Total Load on Foundation (kgf)", result.totalLoad.toFixed(2)],
        ["Bearing Pressure (kgf/cm²)", result.bearingPressure.toFixed(2)],
      ],
    });

    const finalY4 = doc.lastAutoTable.finalY;

    // Footer
    doc.text("Prepared By: ______________", 15, finalY4 + 20);
    doc.text("Checked By: ______________", 80, finalY4 + 20);
    doc.text("Approved By: ______________", 145, finalY4 + 20);
    doc.text("Date: ______________", 15, finalY4 + 30);

    doc.save("Plate_Weight_Calculations.pdf");
  };

  return (
    <Container>
      {/* Header with Logo */}
      <AppBar position="static" sx={{ background: "#003366", mb: 4 }}>
        <Toolbar>
          <img src="/logo.png" alt="Company Logo" style={{ height: "40px", marginRight: "10px" }} />
          <Typography variant="h6">BARANI HYDRAULICS INDIA PRIVATE LIMITED</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          PLATE WEIGHT & FOUNDATION CALCULATIONS
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Length (cm)"
              name="length"
              type="number"
              fullWidth
              value={formData.length}
              onChange={handleChange}
              required
              helperText="Enter length in centimeters"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Width (cm)"
              name="width"
              type="number"
              fullWidth
              value={formData.width}
              onChange={handleChange}
              required
              helperText="Enter width in centimeters"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Thickness (cm)"
              name="thickness"
              type="number"
              fullWidth
              value={formData.thickness}
              onChange={handleChange}
              required
              helperText="Enter thickness in centimeters"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Steel Specific Weight (kg/cm³)"
              name="steelSpecificWeight"
              type="number"
              fullWidth
              value={formData.steelSpecificWeight}
              onChange={handleChange}
              required
              helperText="Default: 7.85 kg/cm³"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Static Load on Foundation (kgf)"
              name="staticLoad"
              type="number"
              fullWidth
              value={formData.staticLoad}
              onChange={handleChange}
              required
              helperText="Default: 12500 kgf"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Tool Weight (kgf)"
              name="toolWeight"
              type="number"
              fullWidth
              value={formData.toolWeight}
              onChange={handleChange}
              required
              helperText="Default: 3000 kgf"
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, textAlign: "center", gap: 2, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!formData.length || !formData.width || !formData.thickness}
          >
            CALCULATE
          </Button>
          {result && (
            <Button
              variant="contained"
              color="secondary"
              onClick={generatePDF}
            >
              DOWNLOAD PDF
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default PlateCalculator;
