import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import MenuItem from "../../classes/menu-item";
import CartClass from "../../classes/cart";
import "./CartStyle.css";

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
    const [itemList, setItemList] = useState<MenuItem[]>([]);
    CartClass.getItems((x) => {
        let list: MenuItem[] = [];
        x.forEach((i) => {
            for (let j = 0; j < i.count; j++) {
                list.push(i.item);
            }
        });
        setInterval(() => setItemList(list), 50);
    });
    return (
        <React.Fragment>
                <div className="cartBody">
                     <h1>Cart</h1>
                          <div className="cartContainer">

                              <Box
                                  sx={{
                                      display: "flex",
                                      flexWrap: "nowrap",
                                      "& > :not(style)": {
                                      m: 1,
                                      width: "auto",
                                      height: "auto",
                                      maxWidth: "600px",
                                      },
                                  }}
                              >

                    <TableContainer component={Paper} sx={{width: '50%', margin: 'auto', display: 'block'}}>
                        <Table sx={{margin: 'auto', fontSize: '5px'}} aria-label="checkoutTable">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Item</b></TableCell>
                                    <TableCell align="right"> <b>Price</b> </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {rows.map((row) => (
                                    <TableRow
                                        key={row.itemName}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.itemName}
                                        </TableCell>
                                        <TableCell align="right">{row.itemPrice}</TableCell>
                                    </TableRow>
                                ))} */}
                                {itemList.map((item) => (
                                    <TableRow
                                        key={item.name}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {item.name}
                                        </TableCell>
                                        <TableCell align="right">${`${Math.floor(item.price / 100)}.${('0' + (item.price % 100)).slice(-2)}`}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell>
                                        Total Price
                                    </TableCell>
                                    <TableCell>
                                        {(() => {
                                            let total = 0;
                                            itemList.forEach((x) => total += x.price);
                                            return `$${Math.floor(total / 100)}.${('0' + (total % 100)).slice(-2)}`;
                                        })()}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                                    <Box component={Paper} sx={{width: '50%', margin: 'auto', padding: '15px', display: 'block'}}>
                                        <TextField className="CartInputBoxes" label="Card Number" sx={{margin: '15px', color: 'black'}}/>
                                        <br/>
                                        <TextField label="Name on card" color="primary" sx={{margin: '15px'}}/>
                                        <br/>
                                        <TextField label="Security code" color="primary" sx={{margin: '15px'}}/>
                                        <br/>
                                        <TextField label="Expiration date" color="primary"  sx={{margin: '15px'}}/>
                                        <br/>
                                        <Button component={Link} variant="contained" sx={{margin: '15px', display: 'block', textAlign: 'center'}} to="/orderconfirmation">Submit</Button>
                                    </Box>

            </Box>

            </div>
            </div>
        </React.Fragment>
    );
};

export default Cart;
