import React, { useState , useEffect} from "react";
import { useSelector } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function HeartTable() {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const axios = require("axios");
  const [patients, setPatients] = useState([]);
  const config = {
    headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
    }
  }
  const getDiabetesData = async () =>{
    try{
        const data = await axios.get("http://127.0.0.1:8000/api/diabetes/listall", config)
        console.log(data.data);
        setPatients(data.data);
    }catch(e){
        console.log(e);
    }
  }
  useEffect(() => {
    getDiabetesData();
  }, []);



  return (<div>
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Patient name</TableCell>
            <TableCell align="right">Phone Number</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Disease</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.patient_name}
              </TableCell>
              <TableCell align="right">{row.patient_phone}</TableCell>
              <TableCell align="right">{row.patient_gender}</TableCell>
              <TableCell align="right">{row.patient_status}</TableCell>
              <TableCell align="right">{row.disease}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>);
}

export default HeartTable;
