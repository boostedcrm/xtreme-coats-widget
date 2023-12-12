import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

export default function SelectChecklist({setPage}) {
  const handleCardClick = (data) => {
    setPage(data)
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Card
          sx={{ cursor: "pointer", width: 310, height: 120, bgcolor: "#4CAF50"  }}
          onClick={() => handleCardClick("Concreate-Checklist")}
        >
          <CardContent sx={{ width: "100%"}}>
            <Typography sx={{ fontSize: 18,color:"#fff" }}>
              Concrete Checklist
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card
         sx={{ cursor: "pointer", width: 310, height: 120, bgcolor: "#2196F3" }}
          onClick={() => handleCardClick("Coating-Checklist")}
        >
          <CardContent>
            <Typography sx={{ fontSize: 18,color:"#fff" }}>
              Coating Checklist
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card
          sx={{ cursor: "pointer", width: 310, height: 120, bgcolor: "#FF9800"  }}
          onClick={() => handleCardClick("Honing-Checklist")}
        >
          <CardContent sx={{ width: "100%" }}>
            <Typography sx={{ fontSize: 18,color:"#fff" }}>
              Hoaning Checklist
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
