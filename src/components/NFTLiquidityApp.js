import { Typography, Box, Container } from "@material-ui/core";

function NFTLiquidityApp() {

    const [address, setAddress] = useState("");
    const [temp, setTemp] = useState("");
    const [inputAddress, setInputAddress] = useState("");
    const [provider, setProvider] = useState(null);
    const [nfts, setNfts] = useState("");
    const [contractAddresses, setContractAddresses] = useState([]);
    const [contractAddress, setContractAddress] = useState([]);
    const [names, setNames] = useState([]);

    useEffect(() => {
        if (address) {
            getNFTs("0x4B7051619d0AAa0EC056A18eceD5D8E06Dd55F33", setNfts);
            console.log(nfts);
        }
    }, [address]);




    
        return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography
                        variant="h6"
                        style={{ fontFamily: "Arial, sans-serif", fontWeight: "bold" }}
                        color="inherit"
                        noWrap
                    >
                        CroPawn NFT Pawn Shop
                    </Typography>
                    <ConnectWallet setAddress={setAddress} setProvider={setProvider} />
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: "background.paper",
                        pt: 5,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Box
                            component="img"
                            sx={{
                                width: "20%",
                                maxHeight: { xs: 233, md: 167 },
                                maxWidth: { xs: 350, md: 250 },
                                marginLeft: "40%",
                                marginBottom: 2,
                            }}
                            alt="Cool pool"
                            src={cropawn}
                        />
                        <Typography
                            style={{ fontFamily: "Arial, sans-serif", fontWeight: "bold" }}
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            CroPawn NFT PawnShop
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            Appraise your NFTs for a loan
                        </Typography>
                        <LoanAppraisalInfo
                            contractAddresses={contractAddresses}
                            names={names}
                        />
                    </Container>
                </Box>

                    {/* NFT Grid */}
                    <Container maxWidth="md">
                        <Grid container spacing={4}>
                            {nfts && JSON.parse(nfts).map((nft) => (
                                <Grid item key={nft} xs={12} sm={6} md={4}>
                                    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ pt: "56.25%" }}
                                            image={nft.metadata.image}
                                            alt={nft.metadata.name}
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {nft.metadata.name}
                                            </Typography>
                                            <Typography>{nft.metadata.description}</Typography>
                                        </CardContent>
                                        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                                            <Button variant="contained" onClick={() => {
                                                setContractAddresses([...contractAddresses, nft.contract.address]);
                                                setNames([...names, nft.metadata.name]);
                                            }}>
                                                Add
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                     
            
            </main>
           
          </ThemeProvider >


    );
}
