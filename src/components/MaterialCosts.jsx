import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const MaterialCosts = () => {
  const { control, handleSubmit, register, getValues } = useForm({
    defaultValues: {
      materials: [
        { name: "", size: "", coverage: "", amount: "", pricePer: "" },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "materials",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" sx={{ padding: "15px 0px" }}>
        Material Costs
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Material</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Coverage</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Price Per</TableCell>
            <TableCell>Material Total</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>
                <Controller
                  name={`materials[${index}].name`}
                  control={control}
                  render={({ field }) => (
                    <Select {...field} fullWidth size="small">
                      <MenuItem value="">-Select-</MenuItem>
                      {/* Add your other options here */}
                    </Select>
                  )}
                />
              </TableCell>
              <TableCell>
                <TextField
                  {...register(`materials[${index}].size`)}
                  size="small"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  {...register(`materials[${index}].coverage`)}
                  size="small"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  {...register(`materials[${index}].amount`)}
                  size="small"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  {...register(`materials[${index}].pricePer`)}
                  size="small"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                {/* Implement calculation for material total if needed */}
                <TextField
                  size="small"
                  fullWidth
                  value={
                    getValues(`materials[${index}].amount`) *
                    getValues(`materials[${index}].pricePer`)
                  }
                  InputProps={{ readOnly: true }}
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => remove(index)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid container spacing={2} sx={{ width: "60%" }}>
        <Grid item xs={4}>
          {" "}
          <TextField
            label="Mateiral Subtotal"
            size="small"
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
              startAdornment: <Typography>$</Typography>,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          {" "}
          <TextField
            label="Waste and Ship Cost"
            size="small"
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
              startAdornment: <Typography>$</Typography>,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          {" "}
          <TextField
            label="Material Tax"
            size="small"
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
              startAdornment: <Typography>$</Typography>,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          {" "}
          <TextField
            label="Material Cost"
            size="small"
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
              startAdornment: <Typography>$</Typography>,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox {...register("performCalculations")} />}
            label="Perform calculations."
          />
        </Grid>
      </Grid>
      <Button
        startIcon={<AddCircleOutlineIcon />}
        onClick={() =>
          append({ name: "", size: "", coverage: "", amount: "", pricePer: "" })
        }
      >
        Add New
      </Button>
    </form>
  );
};

export default MaterialCosts;
