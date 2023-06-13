"use client";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface ITask {
  status: boolean;
  description: string;
}

export default function Home() {
  const [taskStr, setTaskStr] = useState<string>("");
  const [arrTasks, setArrTasks] = useState<Array<ITask>>([]);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const addTask = () => {
    if (taskStr === "") {
      setError(true);
      setErrorMsg("Empty field.");

      setTimeout(() => {
        setError(false);
        setErrorMsg("");
      }, 5000);

      return;
    }
    setArrTasks([
      ...arrTasks,
      { status: false, description: taskStr.toUpperCase() },
    ]);
    setTaskStr("");
  };

  const deleteTask = (index: number) => {
    arrTasks.splice(index, 1);
    setArrTasks([...arrTasks]);
  };

  const checkTask = (index: number) => {
    arrTasks[index].status = !arrTasks[index].status;
    setArrTasks([...arrTasks]);
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Typography
        textAlign="center"
        variant="h1"
        component="h1"
        color="#848484"
        fontWeight={800}
        marginTop={10}
        fontSize={50}
      >
        To do lists
      </Typography>
      <Box
        marginTop={10}
        style={{
          borderRadius: "15px",
          padding: "20px 50px",
          background: "#e0e0e0",
          boxShadow:
            " inset 9px 9px 18px #d0d0d0, inset -9px -9px 18px #f0f0f0",
        }}
      >
        <Box
          // width="1500px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="5px"
          padding="20px"
        >
          <TextField
            error={error}
            id="task"
            helperText={errorMsg}
            label="Task"
            style={{
              marginRight: "20px",
              borderRadius: "10px",
              background: "#e0e0e0",
              border: "none",
              boxShadow:
                " inset 9px 9px 18px #d0d0d0, inset -9px -9px 18px #f0f0f0",
            }}
            value={taskStr}
            onChange={(e) => setTaskStr(e.target.value)}
          />
          <Button
            style={{
              borderRadius: "5px",
              background: "#e0e0e0",
              boxShadow: "9px 9px 18px #d0d0d0,-9px -9px 18px #f0f0f0",
              color: "black",
            }}
            variant="contained"
            onClick={addTask}
          >
            Add to
          </Button>
        </Box>
        <Box>
          {arrTasks.map(({ description, status }, index) => {
            return (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                padding="20px"
                marginBottom="20px"
                justifyContent="space-between"
                style={{
                  boxShadow: "9px 9px 18px #d0d0d0,-9px -9px 18px #f0f0f0",
                }}
              >
                <FormControlLabel
                  control={<Checkbox onChange={() => checkTask(index)} />}
                  style={{ textDecoration: status ? "line-through" : "none" }}
                  label={description}
                />
                <Button
                  onClick={(e) => deleteTask(index)}
                  variant="contained"
                  color="error"
                  style={{
                    boxShadow: "9px 9px 18px #d0d0d0,-9px -9px 18px #f0f0f0",
                  }}
                >
                  X
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
}
