import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, styled, Button, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { Pet } from "../../models/Pet";
import ProfileDetails from "./ProfileDetails";
import { useApiStore } from "../../state/apiStore";
import theme from "../../theme";
import DocumentCard from "./DocumentCard";
import MedicalLogCard from "./MedicalLogCard";
import VaccineLogCard from "./VaccineLogCard";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const PetProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [petDetails, setPetDetails] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { getPetById } = useApiStore();

  const medicalLogs = [
    {
      id: 0,
      reason: "Something",
      diagnostic: "nothing",
      treatment: "nothing",
      description: "Annual checkup",
      date: "2022/12/01",
    },
    {
      id: 1,
      reason: "Something else",
      diagnostic: "some disease",
      treatment: "some pills",
      description: "Some disease",
      date: "2023/06/07",
    },
  ];

  const vaccinationLogs = [
    {
      id: 0,
      type: "Rabies Vaccination",
      date: "2022/05/15",
      renewDate: "2023/11/15",
    },
    {
      id: 1,
      type: "DHPPL Booster",
      date: "2022/05/15",
      renewDate: "2025/03/03",
    },
    {
      id: 2,
      type: "Rabies Vaccination",
      date: "2023/11/15",
      renewDate: "2024/05/15",
    },
  ];

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  useEffect(() => {
    const fetchPet = async () => {
      try {
        if (id) {
          const response = await getPetById(id);
          switch (response.status) {
            case 200:
              setPetDetails(response.data);
              setErrorMessage(null);
              break;
            case 400:
              setErrorMessage("Invalid pet ID provided. Please try again.");
              break;
            case 404:
              setErrorMessage("Pet with the specified ID not found.");
              break;
            case 500:
              setErrorMessage("Server encountered an error. Please try again later.");
              break;
            default:
              setErrorMessage("An unexpected error occurred. Please try again.");
          }
        }
      } catch (error) {
        setErrorMessage("Network error or server is unreachable.");
        console.error("Error fetching pet:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id, getPetById]);

  if (loading) {
    return <CircularProgress />;
  }

  if (errorMessage) {
    return <Typography variant="h6" color="error">{errorMessage}</Typography>;
  }

  return petDetails ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          marginTop: "100px",
          alignItems: "center",
          marginLeft: "15rem",
        }}
      >
        <Box
          sx={{
            flex: 1,
            p: 4,
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          <Box sx={{ maxWidth: 1000, width: "100%" }}>
            <Grid container spacing={4}>
              <ProfileDetails petDetails={petDetails} />

              <MedicalLogCard title="Medical Log" logs={medicalLogs} />

              <VaccineLogCard title="Vaccination Log" logs={vaccinationLogs} />

              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  borderBottom={2}
                  marginBottom={2}
                  alignItems="center"
                >
                  <Typography
                    variant="h2"
                    sx={{ fontWeight: "bold", pt: 4, marginBottom: 2 }}
                  >
                    Documents
                  </Typography>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload documents
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(event) => console.log(event.target.files)}
                      multiple
                    />
                  </Button>
                </Box>
              </Grid>

              <Grid container spacing={3} marginLeft={2}>
                {["Rabies", "DHPPL", "Annual Vaccination"].map((doc, index) => (
                  <DocumentCard key={index} title={doc} />
                ))}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  ) : (
    <Typography variant="h6">Pet not found</Typography>
  );
};

export default PetProfile;
