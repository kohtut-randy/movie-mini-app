import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Paper,
} from "@mui/material";
import useAuth from "@/hooks/useAuth";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password required"),
});
export default function LoginForm() {
  const router = useRouter();

  const auth = useAuth();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formdata: { email: string; password: string }) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const res = await response.json();
      if (!response.ok) {
        throw new Error("Login failed");
      }
      auth.setProfile({ email: res.data.profile.email });
      router.push("/movie");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)} className="p-20">
        <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minWidth: 100,
            }}
          >
            <TextField
              label="Email"
              margin="normal"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message as string}
            />
            <TextField
              label="Password"
              type="password"
              margin="normal"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message as string}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </form>
    </Container>
  );
}
