import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './Combobox.css'


export default function SelectSmall({combobox, status, setStatus, contextStatus}) {
  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  return (
    <div className="Combobox">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">{contextStatus}</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Trạng thái đơn hàng"
                onChange={handleChange}
                value={status}
            >
              {
                combobox.map((item) =>{
                  return (<MenuItem value={item}>{item}</MenuItem>)
                })
              }
            </Select>
        </FormControl>
    </div>
    
  );
}
