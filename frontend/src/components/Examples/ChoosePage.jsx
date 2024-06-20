import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";

const ChoosePage = ({ onNext, selectedSite, onPageSelect }) => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axiosInstance.get(
          `/sites/${selectedSite.id}/pages`
        );
        setPages(response.data);
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };

    fetchPages();
  }, []);

  const handlePageSelect = async (page) => {
    const fetchPage = async () => {
      try {
        console.log("Fetching single page");
        const response = await axiosInstance.get(`/sites/${page.id}/page`);
        setSelectedPage(response.data);
        onPageSelect(response.data);
      } catch (error) {
        console.error("Error fetching page:", error);
      }
    };
    await fetchPage();
    onNext();
  };

  return (
    <div>
      <Typography variant="h6">Choose a Page</Typography>
      <List>
        {pages.map((page) => (
          <ListItem button key={page.id} onClick={() => handlePageSelect(page)}>
            <ListItemText primary={page.title} />
          </ListItem>
        ))}
      </List>
      <Button onClick={onNext} disabled={!selectedPage}>
        Next
      </Button>
    </div>
  );
};

export default ChoosePage;
