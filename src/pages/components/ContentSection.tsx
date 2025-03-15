import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { StaticImageData } from 'next/image';

interface ContentSectionProps {
  title: string;
  text: string;
  items: {
    image: string | StaticImageData;
    title: string;
    description: string;
  }[];
  bgColor?: string;
  textColor?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  text,
  items,
  bgColor = "black",
  textColor = "white",
}) => {
  return (
    <Box
      sx={{
        backgroundColor: bgColor,
        textAlign: "center",
        padding: { xs: "40px 20px", md: "100px 60px" },
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{
          color: textColor,
          marginBottom: "20px",
          fontSize: { xs: "2rem", md: "2.5rem" },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: textColor,
          marginBottom: "40px",
          fontSize: { xs: "1rem", md: "1.2rem" },
          letterSpacing: "4.5px",
        }}
      >
        {text}
      </Typography>

      {items.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: index % 2 === 0 ? "row" : "row-reverse",
            },
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: "20px", md: "60px" },
            marginBottom: "40px",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: { xs: "100%", md: "30%" },
              height: { xs: "150px", sm: "200px", md: "250px" },
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <Image
              src={item.image}
              alt={item.title}
              layout="fill"
              objectFit="cover"
            />
          </Box>

          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", md: "left" },
              padding: { xs: "20px", md: "0" },
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: textColor,
                marginBottom: "20px",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: textColor,
                lineHeight: 1.5,
                marginBottom: "0",
              }}
            >
              {item.description}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ContentSection;
