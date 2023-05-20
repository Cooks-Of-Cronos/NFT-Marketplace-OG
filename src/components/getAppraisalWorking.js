import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    CircularProgress,
} from "@material-ui/core";

import { FaIcon } from 'react-icons/fa';



import styled from "styled-components";
const StyledAppraisal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  background-color: #f1f1f1;
`;

const StyledText = styled(Typography)`
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

const StyledLink = styled.a`
  margin-left: 10px;
  color: #00bfff;
  text-decoration: none;
  cursor: pointer;
`;



const ExampleAppraisal = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [nftData, setNftData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleAppraisal = () => {
        setDialogOpen(true);
        setLoading(true);
        // Simulating API call
        setTimeout(() => {
            setLoading(false);

            setNftData({
                amountOffered: 10,
                collectionVolume: 50,
                floorPrice: 0.5
            });
            /*alert(
                `Amount Of CRO Offered: ${Math.floor(Math.random() * 100)}\nNFT Collection Volume: ${Math.floor(
                    Math.random() * 1000
                )}\nFloor Price: ${Math.floor(Math.random() * 10)} CRO`
            );*/
        }, 4000);
    };

    //PSEUDO FOR APPRAISAL 

        // Calculate Floor Price
        // Get Volume
        // Use both to calc Average Price 
        // Use all to calculate Appraisal Loan Amount Offer
        // Display Offer back to User


    //Function HandleApproval 
        // if user clicks approve,
        // approve the NFT by user for us
        // transer the NFT to lending pool 
        // transfer cGOLD out to User.


    const handleClose = () => {
        setDialogOpen(false);
    };

    return (
        <StyledAppraisal>
            <img src="/path/to/icon.png" alt="Leroy's Cajun CroPawn" className="section-icon" />
            <StyledText variant="h4">Get an NFT Appraisal Today</StyledText>
            <StyledText variant="body1">
                Need cash for your NFTs? Get an instant appraisal with our NFT Appraisal
                application and receive a crypto loan in minutes. Check out our{" "}
                <StyledLink href="/terms">terms of conditions</StyledLink> and{" "}
                <StyledLink href="/legal">legal</StyledLink> pages for more information.
            </StyledText>
            <Button variant="contained" onClick={handleAppraisal}>
                Get Appraisal
            </Button>
            <Dialog open={dialogOpen} onClose={handleClose}>
                <DialogTitle>NFT Appraisal</DialogTitle>
                <DialogContent>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <>
                                <img src="https://i.imgur.com/Kz83Itp.jpg" alt="NFT Placeholder" />
                                <div>
                                    <p>Amount Of CRO Offered: 300</p>
                                    <p>NFT Collection Volume: 4000</p>
                                    <p>Floor Price: 100</p>
                                </div>
                            </>
                        )}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick="" color="primary">
                        Get Appraisal
                    </Button>
                </DialogActions>
            </Dialog>
        </StyledAppraisal>
    );
};


export default ExampleAppraisal;
