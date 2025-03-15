import { Box, Typography, Grid } from "@mui/material";
import Image from "next/image";
import ContentSection from "../../components/ContentSection";
import TextCard from "../../components/TextCard";

const Index = () => {
  const AIPoweredItems = [
    {
      image: "/images/CFTwo.png",
      title: "Transformative Experience",
      description:
        "Our clients frequently highlight how our software has transformed their operations, enabling greater efficiency and productivity.",
    },
    {
      image: "/images/CFThree.png",
      title: "Exceptional Support",
      description:
        "Feedback consistently praises our dedicated support team for their responsiveness and expertise in addressing client needs.",
    },
    {
      image: "/images/CFFour.png",
      title: "Innovative Solutions",
      description:
        "Clients commend us for our innovative software solutions that tackle industry-specific challenges with precision and creativity.",
    },
  ];

  const textCardData = [
    {
      title: "Overall Satisfaction",
      description:
        "An impressive 95% of our clients report being satisfied with our services, reflecting our commitment to quality.",
    },
    {
      title: "Service Reliability",
      description:
        "98% of clients acknowledge the reliability of our software solutions, emphasizing our focus on delivering consistent performance.",
    },
    {
      title: "Repeat Business",
      description:
        "Over 85% of our clients choose to engage with us for additional projects, demonstrating their trust in our expertise and solutions.",
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
          src="/images/CFOne.png"
          alt="Client Feedback"
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
            letterSpacing: "4.5px",
            position: "absolute",
          }}
        >
          <Typography
            variant="h3"
            color="white"
            fontWeight="bold"
            sx={{ fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" } }}
          >
            What Our Clients Are Saying
          </Typography>
          <Typography
            variant="subtitle1"
            color="white"
            sx={{ marginTop: "20px", marginBottom: "20px", lineHeight: 1.5, fontSize: { xs: "1rem", md: "1.2rem" } }}
          >
            Discover how our AI solutions have impacted businesses positively
          </Typography>
        </Box>
      </Box>

      {/* White Section */}
      <ContentSection
        title="Client Testimonials"
        text="Hear firsthand accounts of our clients' experiences with Smart Solution"
        items={AIPoweredItems}
        bgColor="#140e0b"
        textColor="white"
      />

      <Box
        sx={{ backgroundColor: "white", textAlign: "center", padding: { xs: "40px 20px", md: "100px 60px" } }}
      >
        <Box>
          <Typography
            variant="h3"
            color="black"
            fontWeight="bold"
            sx={{ fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" } }}
          >
            Client Satisfaction Metrics
          </Typography>
          <Typography
            variant="subtitle1"
            color="black"
            sx={{ marginTop: "20px", marginBottom: "40px", lineHeight: 1.5, fontSize: { xs: "1rem", md: "1.2rem" }, letterSpacing: "4.5px" }}
          >
            Explore how our clients rate our services and solutions
          </Typography>
          <TextCard items={textCardData} />
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
