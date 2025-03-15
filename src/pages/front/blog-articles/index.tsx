import { Box, Typography, Grid } from "@mui/material";
import Image from "next/image";
import CardItem from "../../components/CardItem";
import ImageCardTwo from "../../components/ImageCardTwo";

// Correct way to use images from the public folder
const BAOne = "/images/BAOne.png";
const BAFive = "/images/BAFive.png";
const BASix = "/images/BASix.png";
const BASeven = "/images/BASeven.png";

const Index = () => {
  const cardData = [
    {
      title: "Navigating the AI Landscape",
      image: BAFive,
      description:
        "In this insightful piece, industry leader Jane Doe shares her perspective on the challenges and opportunities presented by the rapidly evolving AI landscape.",
    },
    {
      title: "The Ethics of AI: A Crucial Conversation",
      image: BASix,
      description:
        "Dr. John Smith discusses the moral dilemmas associated with artificial intelligence technologies and emphasizes the need for ethical frameworks.",
    },
    {
      title: "Future Trends in AI: What to Expect",
      image: BASeven,
      description:
        "Tech futurist Emily Johnson explores the upcoming trends that will define the next decade of AI, providing a comprehensive overview.",
    },
  ];

  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
      author: "@bkristastucchio",
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
      author: "@rollelflex_graphy726",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
      author: "@helloimnik",
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
        <Image src={BAOne} alt="Hero Image" layout="fill" objectFit="cover" />
        <Box
          sx={{
            position: "absolute",
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
            Insights and Innovations
          </Typography>
          <Typography
            variant="subtitle1"
            color="white"
            sx={{
              marginTop: "20px",
              lineHeight: 1.5,
              fontSize: { xs: "1rem", md: "1.2rem" },
            }}
          >
            Explore the latest in AI technology and solutions
          </Typography>
        </Box>
      </Box>

      {/* Unveiling the Future of AI */}
      <Box sx={{ backgroundColor: "white", textAlign: "center", padding: { xs: "40px 20px", md: "40px 20px" } }}>
        <Typography variant="h3" color="black" fontWeight="bold" sx={{ fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" } }}>
          Unveiling the Future of AI
        </Typography>
        <Typography variant="subtitle1" color="black" sx={{ marginTop: "20px", marginBottom: "40px", lineHeight: 1.5, fontSize: { xs: "1rem", md: "1.2rem" }, letterSpacing: "4.5px" }}>
          Stay ahead with the latest advancements in artificial intelligence
        </Typography>
        <ImageCardTwo images={itemData} maxImages={3} />
      </Box>

      {/* Voices of Authority */}
      <Box sx={{ backgroundColor: "white", textAlign: "center", padding: { xs: "40px 20px", md: "40px 20px" } }}>
        <Typography variant="h3" color="black" fontWeight="bold" sx={{ fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" } }}>
          Voices of Authority
        </Typography>
        <Typography variant="subtitle1" color="black" sx={{ marginTop: "20px", marginBottom: "40px", lineHeight: 1.5, fontSize: { xs: "1rem", md: "1.2rem" }, letterSpacing: "4.5px" }}>
          Gain knowledge from the experts leading the AI revolution
        </Typography>
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {cardData.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CardItem image={item.image} title={item.title} description={item.description} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Index;
