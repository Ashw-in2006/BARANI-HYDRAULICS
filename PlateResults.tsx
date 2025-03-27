import { useState } from "react";
import { Typography, Button, Container, Box, Grid, Paper, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Document, Page, Text, View, StyleSheet, Image, BlobProvider } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

interface PlateFormData {
  length: string;
  width: string;
  thickness: string;
  steelSpecificWeight: string;
  staticLoad: string;
  toolWeight: string;
  customerName: string;
  machineName: string;
  woNo: string;
  assemblyName: string;
}

interface CalculationResult {
  volume: number;
  shaftWeight: number;
  totalLoad: number;
  bearingPressure: number;
  dynamicLoad: number;
  loadBearingArea: number;
  inputValues: PlateFormData;
}

const PDFDocument = ({ result }: { result: CalculationResult }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 12,
    },
    header: {
      backgroundColor: '#003366',
      padding: 10,
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      width: 60,
      height: 60,
      marginRight: 10,
      objectFit: 'contain',
    },
    headerText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      flex: 1,
    },
    section: {
      marginBottom: 15,
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    tableContainer: {
      width: '100%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000',
      marginBottom: 10,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      borderBottomStyle: 'solid',
      minHeight: 25,
      alignItems: 'center',
    },
    tableHeader: {
      backgroundColor: '#f0f0f0',
    },
    tableCell: {
      flex: 1,
      padding: 5,
      borderRightWidth: 1,
      borderRightColor: '#000',
      borderRightStyle: 'solid',
    },
    formula: {
      padding: 8,
      marginBottom: 10,
      backgroundColor: '#f5f5f5',
      borderRadius: 4,
    },
    footer: {
      marginTop: 30,
    },
    signatureLine: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with Logo */}
        <View style={styles.header}>
          <Image 
            style={styles.logo} 
            src="/logo.png"
          />
          <Text style={styles.headerText}>BARANI HYDRAULICS INDIA PRIVATE LIMITED</Text>
        </View>

        {/* Title */}
        <View style={styles.section}>
          <Text style={[styles.title, { textAlign: 'center' }]}>
            PLATE WEIGHT & FOUNDATION CALCULATIONS
          </Text>
        </View>

        {/* Customer Details */}
        <View style={styles.tableContainer}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.tableCell}><Text>Customer Details</Text></View>
            <View style={styles.tableCell}><Text>Value</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}><Text>Customer Name</Text></View>
            <View style={styles.tableCell}><Text>{result.inputValues.customerName || '_____________'}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}><Text>Machine Name</Text></View>
            <View style={styles.tableCell}><Text>{result.inputValues.machineName || '_____________'}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}><Text>WO. NO</Text></View>
            <View style={styles.tableCell}><Text>{result.inputValues.woNo || '_____________'}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}><Text>Assembly Name</Text></View>
            <View style={styles.tableCell}><Text>{result.inputValues.assemblyName || '_____________'}</Text></View>
          </View>
        </View>

        {/* Formulas Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Formulas Used:</Text>
          <View style={styles.formula}>
            <Text>Volume (V) = Length × Width × Thickness</Text>
          </View>
          <View style={styles.formula}>
            <Text>Shaft Weight = Volume × Steel Specific Weight</Text>
          </View>
          <View style={styles.formula}>
            <Text>Total Load = Static Load + Tool Weight</Text>
          </View>
          <View style={styles.formula}>
            <Text>Bearing Pressure = Total Load / (Length × Width)</Text>
          </View>
        </View>

        {/* Input Parameters */}
        <View style={styles.section}>
          <Text style={styles.title}>INPUT PARAMETERS</Text>
          <View style={styles.tableContainer}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={styles.tableCell}><Text>Parameter</Text></View>
              <View style={styles.tableCell}><Text>Value</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}><Text>Length (cm)</Text></View>
              <View style={styles.tableCell}><Text>{result.inputValues.length}</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}><Text>Width (cm)</Text></View>
              <View style={styles.tableCell}><Text>{result.inputValues.width}</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}><Text>Thickness (cm)</Text></View>
              <View style={styles.tableCell}><Text>{result.inputValues.thickness}</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}><Text>Steel Specific Weight (kg/cm³)</Text></View>
              <View style={styles.tableCell}><Text>{result.inputValues.steelSpecificWeight}</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}><Text>Static Load (kgf)</Text></View>
              <View style={styles.tableCell}><Text>{result.inputValues.staticLoad}</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}><Text>Tool Weight (kgf)</Text></View>
              <View style={styles.tableCell}><Text>{result.inputValues.toolWeight}</Text></View>
            </View>
          </View>
        </View>

        {/* Results */}
        <View style={styles.section}>
          <Text style={styles.title}>CALCULATION RESULTS</Text>
          <View style={styles.tableContainer}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={styles.tableCell}><Text>Parameter</Text></View>
              <View style={styles.tableCell}><Text>Value</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}><Text>Volume</Text></View>
              <View style={styles.tableCell}><Text>{result.volume.toFixed(2)} cm³</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}><Text>Shaft Weight</Text></View>
              <View style={styles.tableCell}><Text>{result.shaftWeight.toFixed(2)} kg</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}><Text>Total Load</Text></View>
              <View style={styles.tableCell}><Text>{result.totalLoad.toFixed(2)} kgf</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}><Text>Bearing Pressure</Text></View>
              <View style={styles.tableCell}><Text>{result.bearingPressure.toFixed(2)} kgf/cm²</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}><Text>Dynamic Load</Text></View>
              <View style={styles.tableCell}><Text>{result.dynamicLoad.toFixed(2)} kgf</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}><Text>Load Bearing Area</Text></View>
              <View style={styles.tableCell}><Text>{result.loadBearingArea.toFixed(2)} cm²</Text></View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.signatureLine}>
            <Text>Prepared By: __________</Text>
            <Text>Checked By: __________</Text>
            <Text>Approved By: __________</Text>
          </View>
          <View style={styles.signatureLine}>
            <Text>Date: __________</Text>
            <Text>Date: __________</Text>
            <Text>Date: __________</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const PlateResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState<CalculationResult>(
    location.state?.result || { volume: 0, shaftWeight: 0, totalLoad: 0, bearingPressure: 0, dynamicLoad: 0, loadBearingArea: 0, inputValues: {} as PlateFormData }
  );

  if (!location.state?.result) {
    navigate('/plate');
    return null;
  }

  const handleCustomerDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResult({
      ...result,
      inputValues: {
        ...result.inputValues,
        [e.target.name]: e.target.value
      }
    });
  };

  const exportToCSV = () => {
    const data = [
      ['BARANI HYDRAULICS INDIA PRIVATE LIMITED'],
      ['PLATE WEIGHT & FOUNDATION CALCULATIONS'],
      [''],
      ['Customer Details'],
      ['Customer Name', result.inputValues.customerName || ''],
      ['Machine Name', result.inputValues.machineName || ''],
      ['WO. NO', result.inputValues.woNo || ''],
      ['Assembly Name', result.inputValues.assemblyName || ''],
      [''],
      ['Input Parameters'],
      ['Length', `${result.inputValues.length} cm`],
      ['Width', `${result.inputValues.width} cm`],
      ['Thickness', `${result.inputValues.thickness} cm`],
      ['Steel Specific Weight', `${result.inputValues.steelSpecificWeight} kg/cm³`],
      ['Static Load', `${result.inputValues.staticLoad} kgf`],
      ['Tool Weight', `${result.inputValues.toolWeight} kgf`],
      [''],
      ['Calculation Results'],
      ['Volume', `${result.volume.toFixed(2)} cm³`],
      ['Shaft Weight', `${result.shaftWeight.toFixed(2)} kg`],
      ['Total Load', `${result.totalLoad.toFixed(2)} kgf`],
      ['Bearing Pressure', `${result.bearingPressure.toFixed(2)} kgf/cm²`],
      ['Dynamic Load', `${result.dynamicLoad.toFixed(2)} kgf`],
      ['Load Bearing Area', `${result.loadBearingArea.toFixed(2)} cm²`],
      [''],
      [''],
      ['Prepared By:'],
      ['Checked By:'],
      ['Approved By:']
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Plate Calculations');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(dataBlob, 'plate_calculations.xlsx');
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Plate Weight & Foundation Results
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom color="primary">
                Customer Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Customer Name"
                    name="customerName"
                    fullWidth
                    value={result.inputValues.customerName}
                    onChange={handleCustomerDetailsChange}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Machine Name"
                    name="machineName"
                    fullWidth
                    value={result.inputValues.machineName}
                    onChange={handleCustomerDetailsChange}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="WO. NO"
                    name="woNo"
                    fullWidth
                    value={result.inputValues.woNo}
                    onChange={handleCustomerDetailsChange}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Assembly Name"
                    name="assemblyName"
                    fullWidth
                    value={result.inputValues.assemblyName}
                    onChange={handleCustomerDetailsChange}
                    sx={{ mb: 2 }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom color="primary">
                Input Parameters
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Length:</strong> {result.inputValues.length} cm</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Width:</strong> {result.inputValues.width} cm</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Thickness:</strong> {result.inputValues.thickness} cm</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Steel Specific Weight:</strong> {result.inputValues.steelSpecificWeight} kg/cm³</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Static Load:</strong> {result.inputValues.staticLoad} kgf</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Tool Weight:</strong> {result.inputValues.toolWeight} kgf</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom color="primary">
                Calculation Results
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Volume:</strong> {result.volume.toFixed(2)} cm³</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Shaft Weight:</strong> {result.shaftWeight.toFixed(2)} kg</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Total Load:</strong> {result.totalLoad.toFixed(2)} kgf</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Bearing Pressure:</strong> {result.bearingPressure.toFixed(2)} kgf/cm²</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Dynamic Load:</strong> {result.dynamicLoad.toFixed(2)} kgf</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Load Bearing Area:</strong> {result.loadBearingArea.toFixed(2)} cm²</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/plate')}
          >
            Calculate Another
          </Button>
          
          <BlobProvider document={<PDFDocument result={result} />}>
            {({ url }) => (
              <Button
                variant="contained"
                color="secondary"
                href={url as string}
                target="_blank"
              >
                Export to PDF
              </Button>
            )}
          </BlobProvider>

          <Button
            variant="contained"
            color="success"
            onClick={exportToCSV}
          >
            Export to Excel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PlateResults;
