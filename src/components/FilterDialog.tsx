import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Grid, MenuItem, TextField } from '@mui/material';
import { Source } from '../interfaces/Source';
import { storageService } from '../services/storage.service';
import { DATE_FORMATE, STORAGE_KEYS } from '../constant/app.constant';
import dayjs from 'dayjs';

export default function FilterDialog({ handleClose, onSubmit }: { handleClose: any, onSubmit: any }) {
  const [fromDate, setFromDate] = React.useState<any>()
  const [toDate, SetToDate] = React.useState<any>()
  const [sources, setSources] = React.useState<Source[]>([])
  const [source, setSource] = React.useState<string>('')
  const [keyword, setKeyword] = React.useState<string>('')

  const onHandleClose = (open: Boolean) => {
    handleClose(open)
  };

  const onFilter = () => {
    const payload = {
      ...(fromDate && { fromDate: dayjs(fromDate).format(DATE_FORMATE) }),
      ...(toDate && { toDate: dayjs(toDate).format(DATE_FORMATE) }),
      ...(source && { source }),
      ...(keyword && { keyword }),
    }
    if (Object.keys(payload).length == 0) return;
    onSubmit(payload)
  }

  React.useEffect(() => {
    const storage = storageService.getItem(STORAGE_KEYS.SOURCE_LIST)
    if (storage) {
      const source = JSON.parse(storage)
      setSources(source)
    }

  }, [])

  return (
    <React.Fragment>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Advance Search"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <TextField fullWidth value={keyword} name="keyword" onChange={(e) => setKeyword(e.target.value)} label="Keword" variant="outlined" />
            </Grid>
            <Grid item md={6}>
              <TextField
                select
                fullWidth
                label="Select Source"
                value={source}
                onChange={(e) => { setSource(e.target.value) }}
              >
                {sources.map((item: Source) => (
                  <MenuItem key={item.id} value={item.url}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="From" minDate={dayjs('2024-07-02')} className='datepicker' value={fromDate} onChange={(newValue) => setFromDate(newValue)} />
              </LocalizationProvider>
            </Grid>
            <Grid item md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker disableFuture={true} minDate={fromDate} label="To" className='datepicker' value={toDate} onChange={(newValue) => SetToDate(newValue)} />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>

          <Button onClick={() => onHandleClose(false)} autoFocus>
            Close
          </Button>
          <Button onClick={onFilter}>Filter</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
