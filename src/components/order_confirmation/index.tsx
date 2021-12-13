import React from "react";
import "./OrderConfStyle.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const OrderConfirmation = () => {
    return (
        <>
            <div className="orderConfBody">
                <h1>Order Confirmed!</h1>
                <div className="orderConfContainer">
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            "& > :not(style)": {
                                m: 1,
                                width: "auto",
                                height: "auto",
                                maxWidth: "600px",
                            },
                        }}
                    >
                        <Paper elevation={3} sx={{ color: "black", bgcolor: "#d0d1d6" }}>
                            <Box className="OrderConfBoxes" sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="h5" gutterBottom sx={{ margin: "10px" }}>
                                    Order Confirmed
                                </Typography>
                                <Box className="orderConfFields">
                                    <p>12:00pm 9/23/2022</p>
                                </Box>
                            </Box>

                            <Box className="OrderConfBoxes" sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="h5" gutterBottom sx={{ margin: "10px" }}>
                                    Estimated Wait Time
                                </Typography>
                                <Box className="orderConfFields">
                                    <p>22 minutes</p>
                                </Box>
                            </Box>

                            <Box className="OrderConfBoxes" sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="h5" gutterBottom sx={{ margin: "10px" }}>
                                    Estimated Pickup Time
                                </Typography>
                                <Box className="orderConfFields">
                                    <p>12:00pm 9/23/2022</p>
                                </Box>
                            </Box>

                            <Box className="OrderConfBoxes"
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography variant="h5" gutterBottom sx={{ margin: "auto" }}>
                                    Your order is ready for pickup!
                                </Typography>
                                <Box className="orderConfFields"
                                    sx={{
                                        backgroundColor: "white",
                                        margin: "auto",
                                        textAlign: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography variant="body1" sx={{ margin: "auto" }}>
                                        12:01:01 9/23/2021
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </div>
            </div>
        </>
    );
};

export default OrderConfirmation;
