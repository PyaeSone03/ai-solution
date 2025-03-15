import { Box, Button, Typography, Grid } from "@mui/material";
import Image from "next/image"; // ✅ Import Next.js Image component
import React from "react";
import ContentSection from "../../components/ContentSection";
import CardItem from "../../components/CardItem";
import TextCard from "../../components/TextCard";

// ✅ Public folder images (No import needed)
const imageOne = "/images/image1.jpg";
const imageTwo = "/images/image2.png";
const imageThree = "/images/image3.png";
const imageFour = "/images/image4.png";
const imageFive = "/images/image5.png";
const imageSix = "/images/image6.png";
const imageSeven = "/images/image7.png";
const imageEight = "/images/image8.png";

const Index = () => {
  const AIPoweredItems = [
    {
      image: imageThree,
      title: "Smart Prototyping",
      description:
        "Our AI-driven prototyping solutions enable businesses to develop and test new concepts rapidly. By automating design and analysis, we help reduce development cycles and bring ideas to market faster.",
    },
    {
      image: imageFour,
      title: "Seamless Integration",
      description:
        "Our software seamlessly integrates with third-party applications, ensuring smooth connectivity with existing business tools. AI-powered compatibility enhances efficiency without disrupting workflows.",
    },
    {
      image: imageFive,
      title: "Intelligent Automation",
      description:
        "Leverage AI to automate repetitive tasks, optimize processes, and enhance productivity. Our intelligent automation solutions enable businesses to focus on innovation and growth.",
    },
  ];

  const cardData = [
    {
      title: "Enterprise Resource Planning",
      image: "/static/images/cards/contemplative-reptile.jpg", // ✅ Keep as static path
      description:
        "Our ERP solutions streamline business processes by integrating all facets of an operation, including planning, purchasing, inventory, sales, marketing, finance, and human resources.",
    },
    {
      title: "Customer Relationship Management",
      image: "/static/images/cards/chameleon.jpg", // ✅ Keep as static path
      description:
        "Our CRM systems help businesses manage customer interactions and data throughout the customer lifecycle, improving customer service relationships, assisting in customer retention, and driving sales growth.",
    },
    {
      title: "Business Intelligence Tools",
      image: "/static/images/cards/gecko.jpg", // ✅ Keep as static path
      description:
        "Our Business Intelligence solutions provide organizations with data analysis tools to make informed decisions.",
    },
  ];

  const textCardData = [
    {
      title: "API Access",
      description:
        "Our software solutions come equipped with robust API capabilities, allowing businesses to easily connect and share data with other applications and services.",
    },
    {
      title: "Third-Party Compatibility",
      description:
        "Our solutions seamlessly integrate with third-party applications using industry-standard protocols and connectors.",
    },
    {
      title: "Custom Integration Services",
      description:
        "For businesses with unique requirements, we offer custom integration services.",
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
          backgroundImage: `url(${imageOne})`,
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
          <Typography variant="h3" color="white" fontWeight="bold">
            Innovative Software Solutions
          </Typography>
          <Typography variant="subtitle1" color="white" sx={{ mt: 2, mb: 2 }}>
            Empowering Businesses with Cutting-Edge Technology
          </Typography>
        </Box>
      </Box>

      <Box sx={{ backgroundColor: "white", textAlign: "center", p: { xs: 4, md: 10 } }}>
        <Typography variant="h3" color="black" fontWeight="bold">
          Software Solutions
        </Typography>
        <Typography variant="subtitle1" color="black" sx={{ mt: 2, mb: 4, letterSpacing: "4.5px" }}>
          Driving efficiency and productivity through our bespoke software offerings
        </Typography>
        <Grid container spacing={4}>
          {cardData.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CardItem image={item.image} title={item.title} description={item.description} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* AI-Powered Innovation */}
      <ContentSection
        title="AI-Powered Innovation"
        text="Transforming ideas into reality with intelligent solutions"
        items={AIPoweredItems}
        bgColor="black"
        textColor="white"
      />

      {/* Seamless Integration */}
      <Box sx={{ backgroundColor: "white", textAlign: "center", p: { xs: 4, md: 10 } }}>
        <Typography variant="h3" color="black" fontWeight="bold">
          Seamless Integration
        </Typography>
        <Typography variant="subtitle1" color="black" sx={{ mt: 2, mb: 4, letterSpacing: "4.5px" }}>
          Connecting with your existing infrastructure effortlessly
        </Typography>
        <TextCard items={textCardData} />
      </Box>
    </Box>
  );
};

export default Index;
