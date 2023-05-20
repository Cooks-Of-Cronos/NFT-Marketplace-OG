import React, { useState } from 'react';
import styled from 'styled-components';

const InfoSection = () => {
    const [imageIndex, setImageIndex] = useState(0);
    const images = ['image1.png', 'image2.png', 'image3.png'];

    const handleSliderChange = (e) => {
        setImageIndex(parseInt(e.target.value));
    }

    return (
        <Container>
            <Header>Information Section</Header>
            <Subheader>Some details and statistics</Subheader>
            <ImageContainer>
                <Image src={images[imageIndex]} alt="Image" />
                <SliderContainer>
                    <Slider type="range" min="0" max="2" value={imageIndex} onChange={handleSliderChange} />
                </SliderContainer>
            </ImageContainer>
            <ButtonContainer>
                <ButtonEarn>Earn cGOLD</ButtonEarn>
                <ButtonDeposit>Deposit MTD</ButtonDeposit>
            </ButtonContainer>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Header = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Subheader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const SliderContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
`;

const Slider = styled.input`
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const ButtonEarn = styled.button`
  background-color: #f9a11b;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  
  &:hover {
    background-color: #e38c16;
  }
`;

const ButtonDeposit = styled.button`
  background-color: #3e7dff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  padding: 10px 20px;
  cursor: pointer;
  
  &:hover {
    background-color: #2f5dcf;
  }
`;

export default InfoSection;
