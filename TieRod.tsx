import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Box,
  Card,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface TieRodFormData {
  tieRodDiameter: string;
  area: string;
  workingStress: string;
  FOS: string;
}

interface CalculationResult {
  load: number;
  inputValues: TieRodFormData & {
    customerName: string;
    machineName: string;
    woNo: string;
    assemblyName: string;
  };
}

const TieRod = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TieRodFormData>({
    tieRodDiameter: "",
    area: "",
    workingStress: "",
    FOS: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateArea = (diameter: number) => {
    return Math.PI * Math.pow(diameter / 2, 2);
  };

  const handleSubmit = () => {
    try {
      const diameter = parseFloat(formData.tieRodDiameter);
      const workingStress = parseFloat(formData.workingStress);
      const fos = parseFloat(formData.FOS);
      
      // Calculate area if not provided
      const area = formData.area ? parseFloat(formData.area) : calculateArea(diameter);
      
      // Calculate load
      const load = (area * workingStress) / (fos * 1000); // Convert to tons

      const result: CalculationResult = {
        load,
        inputValues: {
          ...formData,
          // Empty customer details for manual filling
          customerName: "",
          machineName: "",
          woNo: "",
          assemblyName: ""
        }
      };

      // Navigate to results page with data
      navigate("/tierod/results", { state: { result } });
    } catch (error) {
      console.error("Error calculating:", error);
    }
  };

  const validateInputs = () => {
    return formData.tieRodDiameter && formData.workingStress && formData.FOS;
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
          TIE ROD & THREAD CALCULATIONS
        </Typography>

        <Card variant="outlined" sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
            Technical Specifications
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tie Rod Diameter (cm)"
                name="tieRodDiameter"
                type="number"
                fullWidth
                value={formData.tieRodDiameter}
                onChange={handleChange}
                required
                helperText="Enter tie rod diameter in centimeters"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Area (cm²)"
                name="area"
                type="number"
                fullWidth
                value={formData.area}
                onChange={handleChange}
                helperText="Optional: Will be calculated from diameter if not provided"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Working Stress (kg/cm²)"
                name="workingStress"
                type="number"
                fullWidth
                value={formData.workingStress}
                onChange={handleChange}
                required
                helperText="Enter working stress in kg/cm²"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Factor of Safety (FOS)"
                name="FOS"
                type="number"
                fullWidth
                value={formData.FOS}
                onChange={handleChange}
                required
                helperText="Enter factor of safety"
              />
            </Grid>
          </Grid>
        </Card>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!validateInputs()}
            sx={{
              minWidth: 200,
              fontSize: "1.1rem",
              textTransform: "none"
            }}
          >
            Calculate
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TieRod;
