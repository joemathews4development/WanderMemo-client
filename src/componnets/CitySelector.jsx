import { Autocomplete, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import service from "../services/config.services";

function CitySelector({ value, onChange, disabled }) {

  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState(value?.city || "");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(inputValue);
    }, 400); // delay

    return () => clearTimeout(timer);
  }, [inputValue]);

  // API call
  useEffect(() => {
    if (!debouncedSearch) return;

    const fetchCities = async () => {
      try {
        const res = await service.get(`/cities?search=${debouncedSearch}`)
        setOptions(res.data);
      } catch (error) {
        console.log(error)
      }

    };

    fetchCities();
  }, [debouncedSearch]);

  return (
    <Autocomplete
      options={options}
      value={value || null}
      getOptionLabel={(option) => typeof option === "string" ? option : option?.city || ""}
      filterOptions={(x) => x}
      onInputChange={(event, value) => setInputValue(value)}
      onChange={(event, newValue) => onChange(newValue)}
      renderOption={(props, option) => (
        <li {...props} key={option._id}>
          {option.city}, {option.country}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label="City" fullWidth />
      )}
    />
  );
}

export default CitySelector;