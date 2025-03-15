import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import imageOne from "../../public/image1.jpg";
import imageTwo from "../../public/image2.png";
import imageThree from "../../public/image3.png";
import imageFour from "../../public/image4.png";
import imageFive from "../../public/image5.png";
import imageSix from "../../public/image6.png";
import imageSeven from "../../public/image7.png";
import imageEight from "../../public/image8.png";
import ContentSection from "./components/ContentSection";

const Index = () => {
  const whyChooseUsItems = [
    {
      image: imageThree,
      title: "Tailored Solutions",
      description:
        "Our tailored solutions are crafted to align with your particular challenges and aspirations, thereby enhancing the return on your technology investments.",
    },
    {
      image: imageFour,
      title: "Proven Track Record",
      description:
        "With numerous successful projects across various industries, our expertise is backed by a history of delivering results and exceeding client expectations.",
    },
    {
      image: imageFive,
      title: "Cutting-Edge Technology",
      description:
        "We utilize the latest advancements in AI and machine learning to provide you with powerful tools that enhance productivity and drive growth.",
    },
  ];

  const successStorieItems = [
    {
      image: imageSix,
      title: "Increased Efficiency",
      description:
        "One of our clients reported a 30% increase in operational efficiency after implementing our AI-driven automation tools, allowing them to focus on core business activities.",
    },
    {
      image: imageSeven,
      title: "Enhanced Decision-Making",
      description:
        "Another client leveraged our data analytics capabilities, leading to more informed strategic decisions and a significant boost in revenue growth.",
    },
    {
      image: imageEight,
      title: "Improved Customer Satisfaction",
      description:
        "A retail partner experienced a remarkable improvement in customer satisfaction scores after integrating our AI solutions, resulting in higher retention rates and increased sales.",
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
          position: "relative",
        }}
      >
        <Image
          src={imageOne}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
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
            position: "absolute",
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
            Unlocking the Power of AI for Your Business
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
            At Smart Solution, we harness the capabilities of artificial
            intelligence to deliver innovative software solutions that transform
            industries and drive success.
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              fontWeight: "bold",
              padding: { xs: "8px 16px", md: "10px 20px" },
              fontSize: { xs: "0.8rem", md: "1rem" },
              width: { xs: "100%", sm: "auto" },
              maxWidth: "300px",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Box>

      {/* Software Development Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          height: { xs: "auto", md: "572px" },
          backgroundColor: "primary.main",
          padding: { xs: "20px", md: "60px" },
        }}
      >
        <Image
          src={imageTwo}
          alt="Innovative Software"
          width={500}
          height={400}
          objectFit="cover"
          style={{ borderRadius: "8px" }}
        />
        <Box
          sx={{
            padding: { xs: "20px", md: "40px" },
            textAlign: { xs: "center", md: "left" },
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ marginBottom: "20px", color: "black" }}
          >
            Innovative Software Development
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ marginBottom: "20px", color: "black", lineHeight: 1.5 }}
          >
            Our cutting-edge software solutions are tailored to meet the unique
            needs of your business, ensuring you stay ahead of the curve in a
            competitive landscape.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              padding: { xs: "8px 16px", md: "10px 20px" },
              fontSize: { xs: "0.8rem", md: "1rem" },
              width: { xs: "100%", sm: "auto" },
              maxWidth: "300px",
              "&:hover": {
                backgroundColor: "gray",
              },
            }}
          >
            Explore Solutions
          </Button>
        </Box>
      </Box>

      <ContentSection
        title="Why Choose Us?"
        text="Experience the Smart Solution difference with our commitment to innovation and excellence"
        items={whyChooseUsItems}
      />
      <ContentSection
        title="Our Services"
        text="Explore the wide range of AI-powered solutions we offer"
        items={successStorieItems}
        bgColor="white"
        textColor="black"
      />
    </Box>
  );
};

export default Index;
