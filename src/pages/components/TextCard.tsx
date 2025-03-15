import React from "react";
import { Box, Typography } from "@mui/material";

interface CardData {
  title: string;
  description: string;
}

interface TextCardProps {
  items: CardData[];
}

const TextCard: React.FC<TextCardProps> = ({ items }) => {
  const groupedRows = [];

  for (let i = 0; i < items.length; i += 2) {
    groupedRows.push(items.slice(i, i + 2));
  }

  return (
    <Box>
      {groupedRows.map((row, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{
            display: "flex",
            justifyContent: row.length === 1 ? "center" : "space-evenly",
            gap: "40px",
            marginTop: rowIndex > 0 ? "30px" : "0",
            flexWrap: "wrap",
          }}
        >
          {row.map((item, itemIndex) => (
            <CardItem key={itemIndex} {...item} />
          ))}
        </Box>
      ))}
    </Box>
  );
};

// card item
const CardItem: React.FC<CardData> = ({ title, description }) => (
  <Box
    sx={{
      width: "100%",
      maxWidth: "500px",
      textAlign: "start",
      padding: "32px",
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.05)",
      borderRadius: "12px",
      border: "1px solid rgba(0, 0, 0, 0.1)",
      backgroundColor: "white",
      transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.1)",
      },
    }}
  >
    <Typography
      variant="h5"
      fontWeight="bold"
      sx={{
        marginBottom: "16px",
        fontSize: { xs: "1.6rem", md: "1.8rem" },
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        color: "black",
      }}
    >
      {title}
    </Typography>
    <Typography
      variant="body1"
      sx={{
        color: "text.secondary",
        fontSize: { xs: "1.1rem", md: "1.2rem" },
        lineHeight: 1.6,
        letterSpacing: "0.5px",
      }}
    >
      {description}
    </Typography>
  </Box>
);

export default TextCard;
