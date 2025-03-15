import ContentSection from "@/pages/components/ContentSection";
import ImageCard from "@/pages/components/ImageCard";
import { Box, Button, Typography, Grid, ImageList, ImageListItem } from "@mui/material";
import React from "react";
import ISOne from "../../../../public/ISOne.png"
import ISTwo from "../../../../public/ISTwo.png"
import ISThree from "../../../../public/ISThree.png"
import ISFour from "../../../../public/ISFour.png"
import ISFive from "../../../../public/ISFive.png"
import ISSix from "../../../../public/ISSix.png"
import ISSeven from "../../../../public/ISSeven.png"


const Index = () => {
  const AIPoweredItems = [
    {
      image: ISFive,
      title: "Retail Revamp Project",
      description:
        "By integrating our AI solutions, a retail chain saw a 40% increase in online sales through personalized marketing and efficient inventory management.",
    },
    {
      image: ISSix,
      title: "Finance Analytics Update",
      description:
        "We partnered with a major bank to implement a predictive analytics system, resulting in a 25% increase in fraud detection rate and enhanced customer profiling.",
    },
    {
      image: ISSeven,
      title: "SmartHealth Initiative",
      description:
        "In collaboration with a leading hospital, we developed an AI system that reduced patient wait times by 30% while improving care coordination among departments.",
    },
  ];

  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
      title: "Cozy Bed",
      description: "A warm and inviting bed for the perfect night’s sleep.",
    },
    {
      img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
      title: "Books",
      description: "A beautiful collection of books to inspire your mind.",
    },
    {
      img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
      title: "Modern Sink",
      description: "A sleek and stylish sink for a contemporary bathroom.",
    },
    {
      img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
      title: "Spacious Kitchen",
      description: "A dream kitchen with modern appliances and lots of space.",
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: { xs: "400px", md: "572px" },
          backgroundImage: `url(${ISOne})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          sx={{
            padding: { xs: "20px", sm: "40px", md: "60px 170px" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            backgroundColor: "rgba(0, 0, 0, 0.71)",
            width: "100%",
            height: "100%",
            letterSpacing: "4.5px",
          }}
        >
          <Typography
            variant="h3"
            color="white"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            Industries We Serve
          </Typography>
          <Typography
            variant="subtitle1"
            color="white"
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
              lineHeight: 1.5,
              fontSize: { xs: "1rem", md: "1.2rem" },
            }}
          >
            Explore the industries we have worked with and the solutions we have
            provided
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: "100%", maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
        <ImageList variant="masonry" cols={2} gap={20}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <ImageCard img={item.img} title={item.title} description={item.description} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      {/* White Section */}
      <ContentSection
        title="Success Stories"
        text="Innovative solutions transforming industries and driving success"
        items={AIPoweredItems}
        bgColor="black"
        textColor="white"
      />
    </Box>
  );
};

export default Index;

