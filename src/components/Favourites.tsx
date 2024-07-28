import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Avatar, Button, Stack } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

export default function AlignItemsList() {
  return (
    <ul>
      <li> <Stack direction={"row"} ><Avatar sx={{ bgcolor: deepOrange[500], height: 30, width: 30 }}>R</Avatar><Button>Mike Hayesman</Button></Stack> </li>
      <li> <Stack direction={"row"} ><Avatar sx={{ bgcolor: deepOrange[500], height: 30, width: 30 }}>A</Avatar><Button>Mike Hayesman</Button></Stack> </li>
      <li> <Stack direction={"row"} ><Avatar sx={{ bgcolor: deepOrange[500], height: 30, width: 30 }}>B</Avatar><Button>Mike Hayesman</Button></Stack> </li>
      <li> <Stack direction={"row"} ><Avatar sx={{ bgcolor: deepOrange[500], height: 30, width: 30 }}>B</Avatar><Button>Mike Hayesman</Button></Stack> </li>
    </ul>
  );
}
