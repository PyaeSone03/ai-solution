import React from "react";
import Image from "next/image";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { StaticImageData } from "next/image";

interface CardItemProps {
  image: string | StaticImageData;
  title: string;
  description: string;
}

const CardItem: React.FC<CardItemProps> = ({ image, title, description }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: "0 auto", height: "100%" }}> 
      <CardActionArea sx={{ height: "100%" }}> 
        <CardMedia
          component={() => (
            <Image 
              src={image} 
              alt={title} 
              width={345} 
              height={200} 
              style={{ objectFit: "cover", width: "100%", height: "200px" }}
            />
          )}
        />
        <CardContent sx={{ textAlign: "start" }}> 
          <Typography
            gutterBottom
            variant="body1"
            sx={{ textAlign: "start", fontWeight:"bold" }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", textAlign: "start" }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardItem;
