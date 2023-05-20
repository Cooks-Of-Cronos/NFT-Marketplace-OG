import React from "react";
import { Box, Button, Typography } from "@material-ui/core";


/*
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * */



const AppraisalPopup = ({ open, onClose, nftName, appraisalAmount, onAgree }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Appraisal Result</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="h5">
                        {nftName} has been appraised for {appraisalAmount} USDC.
                    </Typography>
                    <Typography variant="body1">
                        Do you agree to pawn this NFT for the appraised amount?
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onAgree} color="primary">
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
};
