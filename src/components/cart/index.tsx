import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function createData(
    itemName: string,
    itemPrice: number,
) {
    return {itemName, itemPrice};
}

const rows = [
    createData('Bacon Cheeseburger', 5.99),
    createData('French Fries', 1.99),
];


export const Cart = () => {
    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="sm" sx={{display: 'flex', marginBottom: '20px'}}>
                <Box sx={{
                    bgcolor: '#c4c4c4',
                    height: '90vh',
                    width: '1000px',
                    textAlign: 'center',
                    alignContent: 'center'
                }}>
                    <h2>Checkout</h2>
                    <hr/>
                    <TableContainer component={Paper} sx={{width: '50%', margin: 'auto'}}>
                        <Table sx={{margin: 'auto'}} aria-label="checkoutTable">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Item</b></TableCell>
                                    <TableCell align="right"> <b>Price</b> </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.itemName}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.itemName}
                                        </TableCell>
                                        <TableCell align="right">{row.itemPrice}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell>
                                        Total Price
                                    </TableCell>
                                    <TableCell>
                                        $1,000,000.00
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <hr/>
                    <h2>Card Information</h2>

                    <Box component={Paper} sx={{width: '50%', margin: 'auto', padding: '15px'}}>
                        <TextField label="Card Number" focused sx={{margin: '15px', color: 'black'}}/>
                        <br/>
                        <TextField label="Name on card" color="primary" focused sx={{margin: '15px'}}/>
                        <br/>
                        <TextField label="Security code" color="primary" focused sx={{margin: '15px'}}/>
                        <br/>
                        <TextField label="Expiration date" color="primary" focused sx={{margin: '15px'}}/>
                        <br/>

                    </Box>
                    <Button variant="contained" sx={{margin: '15px'}}>Submit Order</Button>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default Cart;
