import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface ImageCardProps {
  img: string;
  title: string;
  description: string;
  large?: boolean; // Optional: makes some images larger for that quilted look
}

const ImageCard: React.FC<ImageCardProps> = ({ img, title, description, large = false }) => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 2,
        height: large
          ? { xs: 300, sm: 400, md: 500 } // Larger size for featured images
          : { xs: 150, sm: 200, md: 250 }, // Smaller, standard size
        gridColumn: large ? "span 2" : "span 1",
        gridRow: large ? "span 2" : "span 1",
        "&:hover .overlay": {
          opacity: 1,
          transform: "translateY(0)",
        },
      }}
    >
      {/* Image */}
      <Image
        src={img}
        alt={title}
        layout="fill"
        objectFit="cover"
        style={{ borderRadius: "12px" }}
      />

      {/* Description on hover */}
      <Box
        className="overlay"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.7)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.4s ease-in-out, transform 0.4s ease-in-out",
          padding: 2,
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            mb: 1,
            fontSize: { xs: "1.2rem", md: "1.5rem" },
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            lineHeight: 1.5,
            textAlign: "center",
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default ImageCard;
