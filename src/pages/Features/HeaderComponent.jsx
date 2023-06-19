import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Box, Typography } from "@mui/material";
import axios from "axios";

export const HeaderComponent = () => {
  const [user, setUser] = useState([]);
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://127.0.0.1:5000/api/user";
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        setLoading(true);
        const response = await axios.get(url, config);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {

    };
  }, []);

  return (
    <Box sx={{ 
        mt: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
        }}>
      {loading ? (
        <Typography variant="h1">Loading ....</Typography>
      ) : (
        user.map((e) => (
          <div key={e.id}>
            <Link to={`/home/${e._id}`}>
              <Typography variant="h6">{e.fullName}</Typography>
            </Link>
          </div>
        ))
      )}
    </Box>
  );
};
