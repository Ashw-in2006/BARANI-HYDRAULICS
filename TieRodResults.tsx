import React, { useState } from 'react';
import { Typography, Button, Paper, Box, Grid, Container, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Document, Page, Text, View, StyleSheet, Image, BlobProvider } from '@react-pdf/renderer';

interface TieRodFormData {
  tieRodDiameter: string;
  area: string;
  workingStress: string;
  FOS: string;
  customerName: string;
  machineName: string;
  woNo: string;
  assemblyName: string;
}

interface CalculationResult {
  load: number;
  inputValues: TieRodFormData;
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
            TIE ROD & THREAD CALCULATIONS
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

        {/* Formula Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Formula Used:</Text>
          <View style={styles.formula}>
            <Text>Load (Tons) = (Area × Working Stress) / (FOS × 1000)</Text>
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
              <View style={styles.tableCell}><Text>Tie Rod Diameter (cm)</Text></View>
              <View style={styles.tableCell}><Text>{result.inputValues.tieRodDiameter}</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}><Text>Area (cm²)</Text></View>
              <View style={styles.tableCell}><Text>{result.inputValues.area || (Math.PI * Math.pow(parseFloat(result.inputValues.tieRodDiameter) / 2, 2)).toFixed(4)}</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}><Text>Working Stress (kg/cm²)</Text></View>
              <View style={styles.tableCell}><Text>{result.inputValues.workingStress}</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}><Text>Factor of Safety</Text></View>
              <View style={styles.tableCell}><Text>{result.inputValues.FOS}</Text></View>
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
              <View style={styles.tableCell}><Text>Load</Text></View>
              <View style={styles.tableCell}><Text>{result.load.toFixed(4)} Tons</Text></View>
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

const TieRodResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState<CalculationResult>(
    location.state?.result || { load: 0, inputValues: {} as TieRodFormData }
  );

  if (!location.state?.result) {
    navigate('/tierod');
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
      [''],
      ['DATE:'],
      [''],
      ['TIE ROD & THREAD CALCULATIONS'],
      [''],
      ['TIE ROD CALCULATIONS'],
      ['Tie Rod Diameter (cm)', result.inputValues.tieRodDiameter],
      ['Area (cm²)', result.inputValues.area || (Math.PI * Math.pow(parseFloat(result.inputValues.tieRodDiameter) / 2, 2)).toFixed(4)],
      ['Working Stress (kg/cm²)', result.inputValues.workingStress],
      ['Load (T)', result.load.toFixed(4)],
      [''],
      ['THREAD CALCULATIONS'],
      ['Thread Diameter (cm)', ''],
      ['Area (cm²)', ''],
      ['Yield Strength (kg/cm²)', ''],
      ['Factor of Safety', result.inputValues.FOS],
      ['Load (T)', ''],
      [''],
      ['Prepared By:', '', 'Checked By:', '', 'Approved By:'],
      ['Date:', '', 'Date:', '', 'Date:']
    ];

    const csv = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'tierod_calculations.csv');
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      ['BARANI HYDRAULICS INDIA PRIVATE LIMITED'],
      [''],
      ['DATE:'],
      [''],
      ['TIE ROD & THREAD CALCULATIONS'],
      [''],
      ['TIE ROD CALCULATIONS'],
      ['Tie Rod Diameter (cm)', result.inputValues.tieRodDiameter],
      ['Area (cm²)', result.inputValues.area || (Math.PI * Math.pow(parseFloat(result.inputValues.tieRodDiameter) / 2, 2)).toFixed(4)],
      ['Working Stress (kg/cm²)', result.inputValues.workingStress],
      ['Load (T)', result.load.toFixed(4)],
      [''],
      ['THREAD CALCULATIONS'],
      ['Thread Diameter (cm)', ''],
      ['Area (cm²)', ''],
      ['Yield Strength (kg/cm²)', ''],
      ['Factor of Safety', result.inputValues.FOS],
      ['Load (T)', ''],
      [''],
      ['Prepared By:', '', 'Checked By:', '', 'Approved By:'],
      ['Date:', '', 'Date:', '', 'Date:']
    ]);

    // Set column widths
    const wscols = [
      { wch: 25 },  // A
      { wch: 15 },  // B
      { wch: 15 },  // C
      { wch: 15 },  // D
      { wch: 15 }   // E
    ];
    ws['!cols'] = wscols;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tie Rod Calculations');
    XLSX.writeFile(wb, 'tierod_calculations.xlsx');
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Tie Rod Calculation Results
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
              <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 2 }}>
                Input Parameters
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Tie Rod Diameter:</strong> {result.inputValues.tieRodDiameter} cm
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Area:</strong> {result.inputValues.area || (Math.PI * Math.pow(parseFloat(result.inputValues.tieRodDiameter) / 2, 2)).toFixed(4)} cm²
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Working Stress:</strong> {result.inputValues.workingStress} kg/cm²
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Factor of Safety:</strong> {result.inputValues.FOS}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 2 }}>
                Calculation Result
              </Typography>
              <Typography variant="h5" color="success.main">
                Load: {result.load.toFixed(4)} Tons
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/tierod')}
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
            color="primary"
            onClick={exportToCSV}
          >
            Download CSV
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={exportToExcel}
          >
            Download Excel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TieRodResults;
