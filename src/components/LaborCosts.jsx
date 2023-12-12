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
  Grid,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const LaborCosts = () => {
  const { control, handleSubmit, register, watch } = useForm({
    defaultValues: {
      labor: [
        {
          resourceTitle: "",
          timeFrame: "",
          days: "",
          hoursPerDay: "",
          men: "",
          costPerHour: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "labor",
  });
  const totalManHours = watch("totalManHours");
  const performCalculations = watch("performCalculations");

  const onSubmit = (data) => {
    console.log(data);
  };

  const calculateLaborCost = () => {
    if (!performCalculations) return 0;
    return fields
      .reduce((total, field) => {
        const days = field.days || 0;
        const hoursPerDay = field.hoursPerDay || 0;
        const men = field.men || 0;
        const costPerHour = field.costPerHour || 0;
        return total + days * hoursPerDay * men * costPerHour;
      }, 0)
      .toFixed(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" sx={{ padding: "10px 0px" }}>
        Labor Costs
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Resource Title</TableCell>
            <TableCell>Time Frame (Day/Week Task)</TableCell>
            <TableCell>Days</TableCell>
            <TableCell>Hours Per Day</TableCell>
            <TableCell>Men</TableCell>
            <TableCell>Cost Per Hour</TableCell>
            <TableCell>Labor Cost</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>
                <Controller
                  name={`labor[${index}].resourceTitle`}
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
                  {...register(`labor[${index}].timeFrame`)}
                  size="small"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  {...register(`labor[${index}].days`)}
                  size="small"
                  fullWidth
                  type="number"
                />
              </TableCell>
              <TableCell>
                <TextField
                  {...register(`labor[${index}].hoursPerDay`)}
                  size="small"
                  fullWidth
                  type="number"
                />
              </TableCell>
              <TableCell>
                <TextField
                  {...register(`labor[${index}].men`)}
                  size="small"
                  fullWidth
                  type="number"
                />
              </TableCell>
              <TableCell>
                <TextField
                  {...register(`labor[${index}].costPerHour`)}
                  size="small"
                  fullWidth
                  type="number"
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  fullWidth
                  value={calculateLaborCost(index)}
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
      <Box>
        <FormControlLabel
          control={<Checkbox {...register("performCalculations")} />}
          label="Perform calculations."
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {" "}
            <TextField
              label="Total Man Hours"
              {...register("totalManHours")}
              size="small"
              fullWidth
              margin="normal"
              type="number"
              InputProps={{
                readOnly: true,
              }}
              value={totalManHours}
            />
          </Grid>
          <Grid item xs={6}>
            {" "}
            <TextField
              label="Labor Cost"
              size="small"
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
                startAdornment: <Typography>$</Typography>,
              }}
              value={calculateLaborCost()}
            />
          </Grid>
        </Grid>
      </Box>
      <Button
        startIcon={<AddCircleOutlineIcon />}
        onClick={() =>
          append({
            resourceTitle: "",
            timeFrame: "",
            days: "",
            hoursPerDay: "",
            men: "",
            costPerHour: "",
          })
        }
      >
        Add New
      </Button>
    </form>
  );
};

export default LaborCosts;
