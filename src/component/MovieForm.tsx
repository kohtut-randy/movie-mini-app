import React from "react";
import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { MovieFormPayload, Movie } from "../lib/types";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  releaseYear: yup.number().required("Release year is required"),
  price: yup.number().min(0).required("Price is required"),
  genre: yup.string().required("Genre is required"),
});

type Props = {
  mode: "create" | "edit";
  data?: Movie;
  id?: string;
  onSuccess: () => void;
};

const MovieForm = ({ mode, data, id, onSuccess }: Props) => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      releaseYear: data?.releaseYear || 0,
      price: data?.price || 0,
      genre: data?.genre || "",
    },
  });

  const onsubmit = async (data: MovieFormPayload) => {
    if (mode === "create") {
      const response = await fetch("/api/movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        onSuccess();
      }
      if (!response.ok) {
        throw new Error("Submission failed");
      }
    }
    if (mode === "edit") {
      const response = await fetch(`/api/movie/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        onSuccess();
      }
      if (!response.ok) {
        throw new Error("Submission failed");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)} className="m-10 rornded-lg">
      <Typography variant="h6" gutterBottom>
        {mode === "create" ? "Create Movie" : "Edit Movie"}
      </Typography>
      <TextField
        label="Title"
        {...register("title")}
        error={!!errors.title}
        helperText={errors.title?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        {...register("description")}
        error={!!errors.description}
        helperText={errors.description?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Release Year"
        type="number"
        {...register("releaseYear")}
        error={!!errors.releaseYear}
        helperText={errors.releaseYear?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        type="number"
        {...register("price")}
        error={!!errors.price}
        helperText={errors.price?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Genre"
        {...register("genre")}
        error={!!errors.genre}
        helperText={errors.genre?.message}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        {mode === "create" ? "Create" : "Update"}
      </Button>
    </form>
  );
};
export default MovieForm;
