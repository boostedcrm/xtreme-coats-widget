import { useForm, Controller } from "react-hook-form";
import { TextField, Grid } from "@mui/material";

const XtremeQuoteForm = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>

        <Grid item xs={12} sm={6}>
          <Controller
            name="quoteTitle"
            control={control}
            defaultValue="Test"
            render={({ field }) => (
              <TextField
                {...field}
                label="Quote Title"
                variant="outlined"
                size="small"
                margin="normal"
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="Prepare_For"
            control={control}
            defaultValue="Test"
            render={({ field }) => (
              <TextField
                {...field}
                label="Prepare For"
                variant="outlined"
                size="small"
                margin="normal"
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="Account_Name"
            control={control}
            defaultValue="Test"
            render={({ field }) => (
              <TextField
                {...field}
                label="Account Name"
                variant="outlined"
                size="small"
                margin="normal"
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="Contact_Name"
            control={control}
            defaultValue="Test"
            render={({ field }) => (
              <TextField
                {...field}
                label="Contact Name"
                variant="outlined"
                size="small"
                margin="normal"
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="Assigned_To"
            control={control}
            defaultValue="Test"
            render={({ field }) => (
              <TextField
                {...field}
                label="Assigned To"
                variant="outlined"
                size="small"
                margin="normal"
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="Salesperson"
            control={control}
            defaultValue="Test"
            render={({ field }) => (
              <TextField
                {...field}
                label="Sales person"
                variant="outlined"
                size="small"
                margin="normal"
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="vendor_type"
            control={control}
            defaultValue="Test"
            render={({ field }) => (
              <TextField
                {...field}
                label="Vendor Type"
                variant="outlined"
                size="small"
                margin="normal"
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="Quote_Status"
            control={control}
            defaultValue="Test"
            render={({ field }) => (
              <TextField
                {...field}
                label="Quote Status"
                variant="outlined"
                size="small"
                margin="normal"
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="Quote_Type"
            control={control}
            defaultValue="Test"
            render={({ field }) => (
              <TextField
                {...field}
                label="Quote Type"
                variant="outlined"
                size="small"
                margin="normal"
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="Total_Square_Feet"
            control={control}
            defaultValue="Test"
            render={({ field }) => (
              <TextField
                {...field}
                label="Total Square Feet"
                variant="outlined"
                size="small"
                margin="normal"
                fullWidth
              />
            )}
          />
        </Grid>

      </Grid>
      {/* <Button type="submit" variant="contained" color="primary" style={{ marginTop: 16 }}>
        Submit Quote
      </Button> */}
    </form>
  );
};

export default XtremeQuoteForm;
