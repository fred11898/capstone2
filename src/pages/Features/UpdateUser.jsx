    import React, { useState, useEffect } from "react";
    import { useNavigate, useParams } from "react-router-dom";
    import { useAuth } from "../../contexts/AuthContext";
    import { Box, Button, TextField, Grid, Typography } from "@mui/material";

    export const FriendEdit = () => {
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
    
        useEffect(() => {
            const fetchFriend = async () => {
            try {
                const url = `http://localhost:5000/api/myinfo/${id}`;
                const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                });
                const data = await response.json();
        
                if (response.ok) {
                // Assuming the response data contains the friend object
                setFriend(data);
                } else {
                throw new Error("Failed to fetch friend data");
                }
            } catch (error) {
                console.error(error);
            }
            };
        
            fetchFriend();
        }, [id, token]);
    
        const handleChanged = (e) => {
            setFriend((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            };
          
            const handleFavoritesChanged = (e) => {
              setFriend((prev) => ({
                ...prev,
                favorites: {
                  ...prev.favorites,
                  [e.target.name]: e.target.value,
                },
              }));
            };
          
            const handleConfessionChanged = (e) => {
              setFriend((prev) => ({
                ...prev,
                confession: {
                  ...prev.confession,
                  [e.target.name]: e.target.value,
                },
              }));
            };
          
            const handleSocialMediaChanged = (e) => {
              setFriend((prev) => ({
                ...prev,
                socialMedia: {
                  ...prev.socialMedia,
                  [e.target.name]: e.target.value,
                },
              }));
            };
          
            const handleToOwnerChanged = (e) => {
              setFriend((prev) => ({
                ...prev,
                toOwner: {
                  ...prev.toOwner,
                  [e.target.name]: e.target.value,
                },
              }));
            };
        const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const url = `http://localhost:5000/api/friend-update/${id}`;
            const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                first_name: friend.first_name,
                middle_name: friend.middle_name,
                last_name: friend.last_name,
                suffix: friend.suffix,
                nickname: friend.nickname,
                birthday: friend.birthday,
                age: friend.age,
                email: friend.email,
                address: friend.address,
                phoneNumber: friend.phoneNumber,
                color: friend.favorites.color,
                dish: friend.favorites.dish,
                fruit: friend.favorites.fruit,
                movie: friend.favorites.movie,
                anime: friend.favorites.anime,
                pet: friend.favorites.pet,
                music: friend.favorites.music,
                person: friend.favorites.person,
                tvSeries: friend.favorites.tvSeries,
                celebrity: friend.favorites.celebrity,
                crush: friend.confession.crush,
                firstLove: friend.confession.firstLove,
                firstRelationship: friend.confession.firstRelationship,
                firstKiss: friend.confession.firstKiss,
                status: friend.confession.status,
                ambitions: friend.confession.ambitions,
                talent: friend.confession.talent,
                themeSong: friend.confession.themeSong,
                motto: friend.confession.motto,
                moment: friend.confession.moment,
                hobbies: friend.confession.hobbies,
                facebook: friend.socialMedia.facebook,
                instagram: friend.socialMedia.instagram,
                twitter: friend.socialMedia.twitter,
                unforgettable: friend.toOwner.unforgettable,
                likes: friend.toOwner.likes,
                message: friend.toOwner.message
            }),
            });
    
            if (response.ok) {
            const data = await response.json();
            const createdFriendId = data._id;
            navigate(`/friend/${createdFriendId}`);
            } else {
            throw new Error("Failed to update friend data");
            }
        } catch (error) {
            console.error(error);
        }
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
                            <TextField placeholder="Birthday" variant="filled" type="date" name="birthday" onChange={handleChanged} value={friend.birthday ? new Date(friend.birthday).toISOString().split('T')[0] : ''} required></TextField>
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
                                <TextField placeholder="Favorite Color" variant="filled" name="color" onChange={handleFavoritesChanged} value={friend?.favorites?.color || ''} required></TextField>
                            </Grid>
                            <Grid item lg={3}>
                                <TextField placeholder="Favorite Dish" variant="filled" name="dish" onChange={handleFavoritesChanged} value={friend?.favorites?.dish || ''} required></TextField>
                            </Grid>
                            <Grid item lg={3}>
                                <TextField placeholder="Favorite Fruit" variant="filled" name="fruit" onChange={handleFavoritesChanged} value={friend?.favorites?.fruit || ''} required></TextField>
                            </Grid>
                            <Grid item lg={3}>
                                <TextField placeholder="Favorite Movie" variant="filled" type="text" name="movie" onChange={handleFavoritesChanged} value={friend?.favorites?.movie || ''} required></TextField>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} style={{ marginBottom: "8px" }}>
                            <Grid item lg={3}>
                                <TextField placeholder="Favorite Anime" variant="filled" name="anime" onChange={handleFavoritesChanged} value={friend?.favorites?.anime || ''} required></TextField>
                            </Grid>
                            <Grid item lg={3}>
                                <TextField placeholder="Favorite Pet" variant="filled" name="pet" onChange={handleFavoritesChanged} value={friend?.favorites?.pet || ''} required></TextField>
                            </Grid>
                            <Grid item lg={3}>
                                <TextField placeholder="Favorite Music" variant="filled" name="music" onChange={handleFavoritesChanged} value={friend?.favorites?.music || ''} required></TextField>
                            </Grid>
                            <Grid item lg={3}>
                                <TextField placeholder="Favorite Person" variant="filled" name="person" onChange={handleFavoritesChanged} value={friend?.favorites?.person || ''} required></TextField>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} style={{ marginBottom: "8px" }}>
                            <Grid item lg={3}>
                                <TextField placeholder="Favorite TV Series" variant="filled" name="tvSeries" onChange={handleFavoritesChanged} value={friend?.favorites?.tvSeries || ''} required></TextField>
                            </Grid>
                            <Grid item lg={3}>
                                <TextField placeholder="Favorite Celebrity" variant="filled" name="celebrity" onChange={handleFavoritesChanged} value={friend?.favorites?.celebrity || ''} required></TextField>
                            </Grid>
                        </Grid>

                    </Box>

                    <Box sx={{ mt: 3 }}>    
                        <Typography variant="h4">Confession</Typography>
                        <Grid container spacing={2} style={{ marginBottom: "8px", marginTop: "4px" }}>
                            <Grid item lg={3}>
                                <TextField placeholder="Who is your Crush?" variant="filled" name="crush" onChange={handleConfessionChanged} value={friend?.confession?.crush || ''} required></TextField>
                            </Grid>
                            <Grid item lg={3}>
                                <TextField placeholder="Who was your First Love?" variant="filled" name="firstLove" onChange={handleConfessionChanged} value={friend?.confession?.firstLove || ''} required></TextField>
                            </Grid>
                            <Grid item lg={3}>
                                <TextField placeholder="Who was your First Bf/Gf?" variant="filled" name="firstRelationship" onChange={handleConfessionChanged} value={friend?.confession?.firstRelationship || ''} required></TextField>
                            </Grid>
                            <Grid item lg={3}>
                                <TextField placeholder="Who was your First Kiss?" variant="filled" type="text" name="firstKiss" onChange={handleConfessionChanged} value={friend?.confession?.firstKiss || ''} required></TextField>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} style={{ marginBottom: "8px" }}>
                            <Grid item lg={3}>
                                <TextField placeholder="What is your current status?" variant="filled" name="status" onChange={handleConfessionChanged} value={friend?.confession?.status || ''} required></TextField>
                            </Grid>
                            <Grid item lg={3}>
                                <TextField placeholder="Your Ambition in life" variant="filled" name="ambitions" onChange={handleConfessionChanged} value={friend?.confession?.ambitions || ''} required></TextField>
                            </Grid>
                            <Grid item lg={3}>
                                <TextField placeholder="Your Talent" variant="filled" name="talent" onChange={handleConfessionChanged} value={friend?.confession?.talent || ''} required></TextField>
                            </Grid>
                            <Grid item lg={3}>
                                <TextField placeholder="What is your Theme Song in life?" variant="filled" type="text" name="themeSong" onChange={handleConfessionChanged} value={friend?.confession?.themeSong || ''} required></TextField>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} style={{ marginBottom: "8px" }}>
                            <Grid item lg={3}>
                                <TextField placeholder="What is your Motto?" variant="filled" name="motto" onChange={handleConfessionChanged} value={friend?.confession?.motto || ''} required></TextField>
                            </Grid>
                            <Grid item lg={3}>
                                <TextField placeholder="Most Stupid Thing you ever done" variant="filled" name="moment" onChange={handleConfessionChanged} value={friend?.confession?.moment || ''} required></TextField>
                            </Grid>
                            <Grid item lg={3}>
                                <TextField placeholder="Hobbies" variant="filled" name="hobbies" onChange={handleConfessionChanged} value={friend?.confession?.hobbies || ''} required></TextField>
                            </Grid>
                        </Grid>
                    </Box>    

                    <Box sx={{ mt: 3 }}>    
                        <Typography variant="h4">Social Media</Typography>
                        <Grid container spacing={2} style={{ marginBottom: "8px", marginTop: "4px" }}>
                            <Grid item lg={3}>
                                <TextField placeholder="Facebook" variant="filled" name="facebook" onChange={handleSocialMediaChanged} value={friend?.socialMedia?.facebook || ''}></TextField>
                            </Grid>
                            <Grid item lg={3}>
                                <TextField placeholder="Instagram" variant="filled" name="instagram" onChange={handleSocialMediaChanged} value={friend?.socialMedia?.instagram || ''}></TextField>
                            </Grid>
                            <Grid item lg={3}>
                                <TextField placeholder="Twitter" variant="filled" name="twitter" onChange={handleSocialMediaChanged} value={friend?.socialMedia?.twitter || ''}></TextField>
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
                                <TextField placeholder="What is your unforgettable moment with the owner?" variant="filled" name="unforgettable" onChange={handleToOwnerChanged} value={friend?.toOwner?.unforgettable || ''} required></TextField>
                            </Grid>
                            <Grid item lg={3}>
                                <TextField placeholder="What do you like to the owner?" variant="filled" name="likes" onChange={handleToOwnerChanged} value={friend?.toOwner?.likes || ''} required></TextField>
                            </Grid>
                            <Grid item lg={3}>
                                <TextField placeholder="Message to the owner" variant="filled" name="message" onChange={handleToOwnerChanged} value={friend?.toOwner?.message || ''} required></TextField>
                            </Grid>
                        </Grid>
                    </Box>   

                    <Button variant="contained" type="submit" value="Save">Submit</Button>
                </Box>
            </Box>
        );
    };