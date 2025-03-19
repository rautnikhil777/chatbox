import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/register", formData);
      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw" // ✅ Pure browser width ke liye
      bgcolor="#f0f2f5"
    >
      <Container maxWidth="sm">
        <Box p={4} boxShadow={3} borderRadius={2} bgcolor="white">
          <Typography variant="h4" mb={3} color="primary" textAlign="center">
            Register
          </Typography>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRegister}
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
