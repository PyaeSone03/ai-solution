import React from "react";
import { Box } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Image from "next/image";

interface ImageData {
  img: string;
  title: string;
  author: string;
}

interface ImageCardTwoProps {
  images: ImageData[];
  maxImages?: number; // Optional max images prop, default is 3
}

const ImageCardTwo: React.FC<ImageCardTwoProps> = ({ images, maxImages = 3 }) => {
  const displayedImages = images.slice(0, maxImages); // Limits images to maxImages count

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <ImageList
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${displayedImages.length}, 1fr)`,
          gap: "16px",
        }}
        cols={displayedImages.length}
      >
        {displayedImages.map((item) => (
          <ImageListItem key={item.img}>
            <Image
              src={item.img}
              alt={item.title}
              width={248}
              height={250}
              style={{
                borderRadius: "12px",
                objectFit: "cover",
                width: "100%",
                height: "250px",
              }}
              priority
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.author}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                  aria-label={`info about ${item.title}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default ImageCardTwo;