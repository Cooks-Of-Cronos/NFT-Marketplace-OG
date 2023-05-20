import React from "react";

const MintedRewardedTotalVolume = ({ minted, rewarded, totalVolume }) => {
    return (
        <Container>
            <Column>
                <Title>Minted</Title>
                <Value>{minted}</Value>
            </Column>
            <Column>
                <Title>Rewarded</Title>
                <Value>{rewarded}</Value>
            </Column>
            <Column>
                <Title>Total Volume</Title>
                <Value>{totalVolume}</Value>
                <Subtitle>24h</Subtitle>
            </Column>
        </Container>
    );
};

export default MintedRewardedTotalVolume;
