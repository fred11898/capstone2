import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";

export const CreateUserComponent = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        fullName: "",
    });

    const [passwordError, setPasswordError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [serverError, setServerError] = useState("");

    const navigate = useNavigate();
    const { token } = useAuth();

    const handleChanged = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user.password !== user.confirmPassword) {
            setPasswordError("Password not match");
            return;
        }

        const controller = new AbortController();
        let url = `http://127.0.0.1:5000/api/user`;   

    const requestOptions = {
        signal: controller.signal,
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            username: user.username,
            password: user.password,
            fullName: user.fullName,
        }),
      };
  
      fetch(url, requestOptions)
        .then((response) => {
            if (response.ok) {
                navigate(`/`);
            } else if (response.status === 409) {
                setUsernameError("This Username Already Exist");
            } else {
                setServerError("Server Error");
            }
        })
            .catch((error) => {
                console.log(error);
                setServerError("Server Error");
            });
  
      return () => {
        controller.abort();
      };
    };    



    return (
        <Box
        display= "flex"
        justifyContent= "center"
        alignItems= "center"
            sx={{ 
                backgroundImage: "url(/img/home.png)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "100vw",
                height: "100vh"
            }}
        >
            <Grid container spacing={2}>
                <Grid item lg={5}>
                    
                </Grid>
                <Grid item lg={3} sx={{  
                    background: "white",           
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "20px",
                    padding: "20px",
                    opacity: "0.9"
                      }}>
                    <Box
                        component="form"
                        sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <Typography variant="h4">Sign Up</Typography>
                            <div>
                                <TextField
                                label="Enter your Username"
                                placeholder="Username"
                                name="username"
                                onChange={handleChanged}
                                required
                                error={usernameError !== ""}
                                helperText={usernameError}
                                />
                            </div>
                            <div>
                                <TextField 
                                label="Enter your Password"
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChanged}
                                required
                                />
                            </div>
                            <div>
                                <TextField 
                                label="Confirm your Password"
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                onChange={handleChanged}
                                required
                                error={passwordError !== ""}
                                helperText={passwordError}
                                />
                            </div>
                            <div>
                                <TextField 
                                label="Enter your Full Name"
                                placeholder="Your Full Name"
                                name="fullName"
                                onChange={handleChanged}
                                required
                                />
                            </div>
                            {serverError &&  <Typography>{serverError}</Typography>}
                            <Button variant="contained" type="submit" value="submit">Create Account</Button>
                            <div className="mt-3">
                                <p>
                                    <Link to={"/"}>Already have account ? Sign in</Link>
                                </p>
                            </div>
                    </Box>
                </Grid>    
            </Grid>
        </Box>    
    );
};