import { Box, Typography, Button, Grid, Tooltip } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';


export const HomePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);

  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let url = `http://127.0.0.1:5000/api/user/${id}`;

    const controller = new AbortController();

    const requestOptions = {
      method: "GET",
      headers: {
        signal: controller.signal,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("User data fetch failed");
        }
        return response.json();
      })
      .then((json) => {
        setUser(json);
      })
      .catch((error) => {
        console.error("Error:", error);
        navigate("/error"); // Redirect to error page on error
      });

    return () => {
      controller.abort();
    };
  }, [token, id, navigate]);


  async function fetchFriendData() {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/friend/${user._id}`);
      if (!response.ok) {
        throw new Error("Friend data fetch failed");
      }
      const friendsData = await response.json();
      console.log(friendsData); // Log the response to check its content
      setFriends(friendsData);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchFriendData();
  }, [user]);

  const sortedFriends = friends.sort((a,b) => a.last_name.localeCompare(b.last_name));

  const handleDelete = (friendId) => {
    if (window.confirm("Are you sure you want to remove this friend?")) {
      let url = `http://127.0.0.1:5000/api/friend-remove/${friendId}`;
  
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
  
      fetch(url, requestOptions)
        .then(() => {
          fetchFriendData();
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Box sx={{
      backgroundImage: "url(/img/home.png)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      width: "100vw",
      height: "100vh",
      position: "fixed"
    }}>
      <Box sx={{ 
        mt: 5
      }}>
        <Grid container spacing={1} style={{ 
                    display: "center",      
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    }} >
          <Grid item lg={5}>
            {user && (
              <Typography variant="h4"
              style={{ backgroundColor: "white" }}
              key={user._id}>
                Welcome to {user.fullName} slumbook
              </Typography>
            )}
          </Grid>
            <Grid item lg={3}>
              {user && (  
                <Link to={`/fill-out/${user._id}`}>
                  <Tooltip title="Create">
                    <Fab color="secondary" aria-label="edit">
                        <AddIcon />
                    </Fab>
                  </Tooltip>  
                </Link>
               )}
            </Grid>
          </Grid>
      </Box>
      <Box sx={{
        mt: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Lastname</th>
                <th>Firstname</th>
                <th>Middlename</th>
                <th>Suffix</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {sortedFriends.map((friend) => (
              <tr key={friend._id}>
                <td>{friend.last_name}</td>
                <td>{friend.first_name}</td>
                <td>{friend.middle_name}</td>
                <td>{friend.suffix}</td>
                <td>
                  <Link to={`/friend/${friend._id}`}>
                    <button className="btn btn-primary">View</button>
                  </Link>
                </td>
                <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(friend._id)}>Delete</button>
                </td>
              </tr>
                    ))}
            </tbody>
          </table>

      </Box>
    </Box>
  );
};
