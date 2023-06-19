import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Box, Button, TextField, Grid, Typography } from "@mui/material";

export const FriendCreate = () => {
    const { id } = useParams();
    const [friend, setFriend] = useState({
      first_name: "",
      middle_name: "",
      last_name: "",
      suffix: "",
      nickname: "",
      birthday: "",
      age: "",
      email: "",
      address: "",
      phoneNumber: "",
      color: "",
      dish: "",
      fruit: "",
      movie: "",
      anime: "",
      pet: "",
      music: "",
      person: "",
      tvSeries: "",
      celebrity: "",
      crush: "",
      firstLove: "",
      firstRelationship: "",
      firstKiss: "",
      status: "",
      ambitions: "",
      talent: "",
      themeSong: "",
      motto: "",
      moment: "",
      hobbies: "",
      facebook: "",
      instagram: "",
      twitter: "",
      unforgettable: "",
      likes: "",
      message: "",
    });
  
    const navigate = useNavigate();
    const { token } = useAuth();
  
    const handleChanged = (e) => {
      setFriend((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        const controller = new AbortController();
        const url = `http://localhost:5000/api/forms/${id}`;
      
        const requestOptions = {
          signal: controller.signal,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...friend,
          }),
        };
      
        fetch(url, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            const createdFriendId = data._id;
            navigate(`/friend/${createdFriendId}`);
          });
      
        return () => {
          controller.abort();
        };
      };

    return(
        <Box sx= {{ 
        display: "flex",
        justifyContent: "center",
        backgroundImage: "url(/img/cover.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
        position: "fixed"
         }}>
            <Box component="form" onSubmit={handleSubmit} 
            style={{ 
                backgroundColor: "whitesmoke", 
                opacity: "0.9",
                padding: "15px", 
                overflow: "scroll"
                }}>

                <Typography variant="h4">Introduce yourself</Typography>

                <Grid container spacing={2} style={{ marginBottom: "8px" }}>
                    <Grid item lg={3}>
                        <TextField placeholder="First Name" variant="filled" name="first_name" onChange={handleChanged} value={friend.first_name} required></TextField>
                    </Grid>
                    <Grid item lg={3}>
                        <TextField placeholder="Middle Name" variant="filled" name="middle_name" onChange={handleChanged} value={friend.middle_name}></TextField>
                    </Grid>
                    <Grid item lg={3}>
                        <TextField placeholder="Last Name" variant="filled" name="last_name" onChange={handleChanged} value={friend.last_name} required></TextField>
                    </Grid>
                    <Grid item lg={3}>
                        <TextField placeholder="Suffix" variant="filled" type="text" name="suffix" onChange={handleChanged} value={friend.suffix}></TextField>
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid item lg={2}>
                        <TextField placeholder="Nickname" variant="filled" type="text" name="nickname" onChange={handleChanged} value={friend.nickname} required></TextField>
                    </Grid>
                    <Grid item lg={2}>
                        <TextField placeholder="Birthday" variant="filled" type="date" name="birthday" onChange={handleChanged} value={friend.birthday} required></TextField>
                    </Grid>
                    <Grid item lg={2}>
                        <TextField placeholder="Age" variant="filled" type="number" name="age" onChange={handleChanged} value={friend.age} required></TextField>
                    </Grid>
                    <Grid item lg={3}>
                        <TextField placeholder="Address" variant="filled" name="address" onChange={handleChanged} value={friend.address}></TextField>
                    </Grid>
                    <Grid item lg={2}>
                        <TextField placeholder="Contact Number" variant="filled" name="phoneNumber" onChange={handleChanged} value={friend.phoneNumber}></TextField>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>    
                    <Typography variant="h4">Your Favorites</Typography>
                    <Grid container spacing={2} style={{ marginBottom: "8px", marginTop: "4px" }}>
                        <Grid item lg={3}>
                            <TextField placeholder="Favorite Color" variant="filled" name="color" onChange={handleChanged} value={friend.color} required></TextField>
                        </Grid>
                        <Grid item lg={3}>
                            <TextField placeholder="Favorite Dish" variant="filled" name="dish" onChange={handleChanged} value={friend.dish} required></TextField>
                        </Grid>
                        <Grid item lg={3}>
                            <TextField placeholder="Favorite Fruit" variant="filled" name="fruit" onChange={handleChanged} value={friend.fruit} required></TextField>
                        </Grid>
                        <Grid item lg={3}>
                            <TextField placeholder="Favorite Movie" variant="filled" type="text" name="movie" onChange={handleChanged} value={friend.movie} required></TextField>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} style={{ marginBottom: "8px" }}>
                        <Grid item lg={3}>
                            <TextField placeholder="Favorite Anime" variant="filled" name="anime" onChange={handleChanged} value={friend.anime} required></TextField>
                        </Grid>
                        <Grid item lg={3}>
                            <TextField placeholder="Favorite Pet" variant="filled" name="pet" onChange={handleChanged} value={friend.pet} required></TextField>
                        </Grid>
                        <Grid item lg={3}>
                            <TextField placeholder="Favorite Music" variant="filled" name="music" onChange={handleChanged} value={friend.music} required></TextField>
                        </Grid>
                        <Grid item lg={3}>
                            <TextField placeholder="Favorite Person" variant="filled" name="person" onChange={handleChanged} value={friend.person} required></TextField>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} style={{ marginBottom: "8px" }}>
                        <Grid item lg={3}>
                            <TextField placeholder="Favorite TV Series" variant="filled" name="tvSeries" onChange={handleChanged} value={friend.tvSeries} required></TextField>
                        </Grid>
                        <Grid item lg={3}>
                            <TextField placeholder="Favorite Celebrity" variant="filled" name="celebrity" onChange={handleChanged} value={friend.celebrity} required></TextField>
                        </Grid>
                    </Grid>

                </Box>

                <Box sx={{ mt: 3 }}>    
                    <Typography variant="h4">Confession</Typography>
                    <Grid container spacing={2} style={{ marginBottom: "8px", marginTop: "4px" }}>
                        <Grid item lg={3}>
                            <TextField placeholder="Who is your Crush?" variant="filled" name="crush" onChange={handleChanged} value={friend.crush} required></TextField>
                        </Grid>
                        <Grid item lg={3}>
                            <TextField placeholder="Who was your First Love?" variant="filled" name="firstLove" onChange={handleChanged} value={friend.firstLove} required></TextField>
                        </Grid>
                        <Grid item lg={3}>
                            <TextField placeholder="Who was your First Bf/Gf?" variant="filled" name="firstRelationship" onChange={handleChanged} value={friend.firstRelationship} required></TextField>
                        </Grid>
                        <Grid item lg={3}>
                            <TextField placeholder="Who was your First Kiss?" variant="filled" type="text" name="firstKiss" onChange={handleChanged} value={friend.firstKiss} required></TextField>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} style={{ marginBottom: "8px" }}>
                        <Grid item lg={3}>
                            <TextField placeholder="What is your current status?" variant="filled" name="status" onChange={handleChanged} value={friend.status} required></TextField>
                        </Grid>
                        <Grid item lg={3}>
                            <TextField placeholder="Your Ambition in life" variant="filled" name="ambitions" onChange={handleChanged} value={friend.ambitions} required></TextField>
                        </Grid>
                        <Grid item lg={3}>
                            <TextField placeholder="Your Talent" variant="filled" name="talent" onChange={handleChanged} value={friend.talent} required></TextField>
                        </Grid>
                        <Grid item lg={3}>
                            <TextField placeholder="What is your Theme Song in life?" variant="filled" type="text" name="themeSong" onChange={handleChanged} value={friend.themeSong} required></TextField>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} style={{ marginBottom: "8px" }}>
                        <Grid item lg={3}>
                            <TextField placeholder="What is your Motto?" variant="filled" name="motto" onChange={handleChanged} value={friend.motto} required></TextField>
                        </Grid>
                        <Grid item lg={3}>
                            <TextField placeholder="Most Stupid Thing you ever done" variant="filled" name="moment" onChange={handleChanged} value={friend.moment} required></TextField>
                        </Grid>
                        <Grid item lg={3}>
                            <TextField placeholder="Hobbies" variant="filled" name="hobbies" onChange={handleChanged} value={friend.hobbies} required></TextField>
                        </Grid>
                    </Grid>
                </Box>    

                <Box sx={{ mt: 3 }}>    
                    <Typography variant="h4">Social Media</Typography>
                    <Grid container spacing={2} style={{ marginBottom: "8px", marginTop: "4px" }}>
                        <Grid item lg={3}>
                            <TextField placeholder="Facebook" variant="filled" name="facebook" onChange={handleChanged} value={friend.facebook}></TextField>
                        </Grid>
                        <Grid item lg={3}>
                            <TextField placeholder="Instagram" variant="filled" name="instagram" onChange={handleChanged} value={friend.instagram}></TextField>
                        </Grid>
                        <Grid item lg={3}>
                            <TextField placeholder="Twitter" variant="filled" name="twitter" onChange={handleChanged} value={friend.twitter}></TextField>
                        </Grid>
                        <Grid item lg={3}>
                            <TextField placeholder="Email" variant="filled" type="email" name="email" onChange={handleChanged} value={friend.email}></TextField>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ mt: 3 }}>    
                    <Typography variant="h4">To Owner</Typography>
                    <Grid container spacing={2} style={{ marginBottom: "8px", marginTop: "4px" }}>
                        <Grid item lg={3}>
                            <TextField placeholder="What is your unforgettable moment with the owner?" variant="filled" name="unforgettable" onChange={handleChanged} value={friend.unforgettable} required></TextField>
                        </Grid>
                        <Grid item lg={3}>
                            <TextField placeholder="What do you like to the owner?" variant="filled" name="likes" onChange={handleChanged} value={friend.likes} required></TextField>
                        </Grid>
                        <Grid item lg={3}>
                            <TextField placeholder="Message to the owner" variant="filled" name="message" onChange={handleChanged} value={friend.message} required></TextField>
                        </Grid>
                    </Grid>
                </Box>   

                <Button variant="contained" type="submit" value="Save">Submit</Button>
            </Box>
        </Box>
    );
};