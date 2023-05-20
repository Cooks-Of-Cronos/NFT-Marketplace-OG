import { useState } from "react";
import { ethers } from "ethers";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import NFTLendingPool from "./contracts/NFTLendingPool.json";



function App() {
    const { account, library } = useWeb3React();
    const [nftName, setNftName] = useState("");
    const [nftId, setNftId] = useState("");
    const [appraisal, setAppraisal] = useState("");
    const [open, setOpen] = useState(false);

    const handleAppraisal = async () => {
        const nftLendingPoolAddress = "0x123456789...";
        const nftLendingPool = new ethers.Contract(
            nftLendingPoolAddress,
            NFTLendingPool.abi,
            library.getSigner(account)
        );
        const appraisal = await nftLendingPool.appraiseNFT(nftName, nftId);
        setAppraisal(appraisal);
        setOpen(true);
    };

    const handleAgree = async () => {
        const nftLendingPoolAddress = "0x123456789...";
        const nftLendingPool = new ethers.Contract(
            nftLendingPoolAddress,
            NFTLendingPool.abi,
            library.getSigner(account)
        );
        await nftLendingPool.createLoan(nftName, nftId, appraisal);
        setOpen(false);
    };

    const handleDisagree = () => {
        setOpen(false);
    };

    return (
        <div>
            <TextField value={nftName} onChange={(e) => setNftName(e.target.value)} label="NFT Name" />
            <TextField value={nftId} onChange={(e) => setNftId(e.target.value)} label="NFT ID" />
            <Button variant="contained" color="primary" onClick={handleAppraisal}>Appraise NFT</Button>
            <Dialog open={open}>
                <DialogTitle>Appraisal Result</DialogTitle>
                <DialogContent>
                    <p>{`The estimated value of your ${nftName} with ID ${nftId} is ${appraisal}`}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDisagree} color="secondary">
                        Disagree
                    </Button>
                    <Button onClick={handleAgree} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default App;
