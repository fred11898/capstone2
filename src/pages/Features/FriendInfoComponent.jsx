import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useParams, Link } from "react-router-dom";
import { Typography, Box, Grid, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';

export const FriendInfoComponent = () => {
  const { id } = useParams();
  const [friend, setFriend] = useState({});
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFriendData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/myinfo/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Friend data fetch failed");
        }

        const friendData = await response.json();
        setFriend(friendData);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendData();
  }, [id, token]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx = {{ 
      mt: 5
     }}>
      <Grid container spacing={1} style={{ display: "flex", justifyContent: "center" }}>
        <Grid item lg={3}>
          <Typography variant="h3">Hi i'm {friend.first_name}</Typography>
        </Grid>
        <Grid item lg={2}>
          <Link to={`/update-info/${id}`}>
            <Tooltip title="EDIT">
              <Fab color="secondary" aria-label="edit">
                <EditIcon />
              </Fab>
            </Tooltip>
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item lg={12}>
          <Typography variant="h4" style={{ fontWeight: "Bold" }}>Introducing Myself</Typography>  
          <Typography variant="body1"><b>Firstname:</b> {friend.first_name}</Typography>
          <Typography variant="body1"><b>Middlename:</b> {friend.middle_name}</Typography>
          <Typography variant="body1"><b>Lastname:</b> {friend.last_name}</Typography>
          <Typography variant="body1"><b>Suffix:</b> {friend.suffix}</Typography>
          <Typography variant="body1"><b>Nickname:</b> {friend.nickname}</Typography>
          <Typography variant="body1"><b>Birthday:</b> {friend.birthday}</Typography>
          <Typography variant="body1"><b>Age:</b> {friend.age}</Typography>
          <Typography variant="body1"><b>Address:</b> {friend.address}</Typography>
          <Typography variant="body1"><b>Contact:</b> {friend.phoneNumber}</Typography>
          <Typography variant="body1"></Typography>
        </Grid>
        {friend?.favorites && (
        <Grid item lg={12}>
        <Typography variant="h4">My Favorites</Typography>
          
            <Typography variant="body1"><b>Color:</b> {friend.favorites.color}</Typography>
            <Typography variant="body1"><b>Dish:</b> {friend.favorites.dish}</Typography>
            <Typography variant="body1"><b>Fruit:</b> {friend.favorites.fruit}</Typography>
            <Typography variant="body1"><b>Movie:</b> {friend.favorites.movie}</Typography>
            <Typography variant="body1"><b>Anime:</b> {friend.favorites.anime}</Typography>
            <Typography variant="body1"><b>Pet:</b> {friend.favorites.pet}</Typography>
            <Typography variant="body1"><b>Music:</b> {friend.favorites.music}</Typography>
            <Typography variant="body1"><b>Person:</b> {friend.favorites.person}</Typography>
            <Typography variant="body1"><b>TV Series:</b> {friend.favorites.tvSeries}</Typography>
            <Typography variant="body1"><b>celebrity:</b> {friend.favorites.celebrity}</Typography>          
        </Grid>
        )}
        {friend?.confession && (
        <Grid item lg={12}>
        <Typography variant="h4">My Secret</Typography>
    
            <Typography variant="body1"><b>My Crush:</b> {friend.confession.crush}</Typography>
            <Typography variant="body1"><b>My First Love was:</b> {friend.confession.firstLove}</Typography>
            <Typography variant="body1"><b>My First Bf/Gf was:</b> {friend.confession.firstRelationship}</Typography>
            <Typography variant="body1"><b>My First Kiss was:</b> {friend.confession.firstKiss}</Typography>
            <Typography variant="body1"><b>My Current Status is:</b> {friend.confession.status}</Typography>
            <Typography variant="body1"><b>My Dream in life is to become:</b> {friend.confession.ambitions}</Typography>
            <Typography variant="body1"><b>My Talent:</b> {friend.confession.talent}</Typography>
            <Typography variant="body1"><b>My Theme song in life:</b> {friend.confession.themeSong}</Typography>
            <Typography variant="body1"><b>My Motto in life:</b> {friend.confession.motto}</Typography>
            <Typography variant="body1"><b>Most Stupid thing i ever done:</b> {friend.confession.moment}</Typography>
            <Typography variant="body1"><b>My Hobbies are:</b> {friend.confession.hobbies}</Typography>
                 
        </Grid>
        )}
        {friend?.socialMedia && (
        <Grid item lg={12}>
        <Typography variant="h4">You Could message/follow/add me on my social media accounts</Typography>
    
            <Typography variant="body1"><b>My Facebook:</b> {friend.socialMedia.facebook}</Typography>
            <Typography variant="body1"><b>My Instagram:</b> {friend.socialMedia.instagram}</Typography>
            <Typography variant="body1"><b>My Twitter:</b> {friend.socialMedia.facebook}</Typography>
            <Typography variant="body1"><b>My Email:</b> {friend.email}</Typography>
        </Grid>
        )}
        {friend?.toOwner && (
        <Grid item lg={12}>
        <Typography variant="h4">To the owner of this Autograph Book</Typography>
    
            <Typography variant="body1"><b>My Unforgettable Moment with the owner:</b> {friend.toOwner.unforgettable}</Typography>
            <Typography variant="body1"><b>What i like about the owner:</b> {friend.toOwner.likes}</Typography>
            <Typography variant="body1"><b>My Message to the owner:</b> {friend.toOwner.message}</Typography>
        </Grid>
        )}
        
      </Grid>
    </Box>
  );
};
