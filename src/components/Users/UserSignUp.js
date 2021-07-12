import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../Api/ApiRoutes";
import { Alert } from "@material-ui/lab";
import FileBase from "react-file-base64";
import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Input,
  Button,
  makeStyles,
  LinearProgress,
  Snackbar,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  blur: {
    backdropFilter: "blur(7px)",
    backgroundColor: "white",
  },
  inputWidth: {
    width: "220px",
  },
}));

const UserLogin = () => {
  const classes = useStyles();
  useEffect(() => {
    setopen(true);
  }, []);
  const [open, setopen] = useState(false);
  const [opensnakc, setopensnakc] = useState(false);
  const [state, setstate] = useState(false);
  const [loading, setloading] = useState(false);
  // signup  a user
  const signup = async () => {
    try {
      setloading(true);

      if (state.email === undefined) {
        toast.error("Don't left any field empty");
      }
      const { data } = await axios.post(`${url}/signup`, state);
      console.log(data.error);
      if (data.passerr) {
        toast.error("Password and confirm password must be same");
      }
      if (data.code) {
        toast.error("User already exists try different one");
        setloading(false);
      }
      if (data.name === "ValidationError") {
        toast.error("Put a valid email");
        setloading(false);
      }
      if (!data.errors && !data.passerr && !data.code) {
        toast.success("Signup successfully!");
        localStorage.setItem("user", data.token);
        setloading(false);
        window.location.reload();
      }
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      toast.error("Please Input correct details");
    }
  };
  return (
    <div>
      <Toaster />
      <Dialog
        open={open}
        BackdropProps={{
          classes: {
            root: classes.blur,
          },
        }}
      >
        <DialogTitle>
          <Snackbar
            open={opensnakc}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            autoHideDuration={6000}
            onClose={() => setopensnakc(false)}
          >
            <Alert onClose={() => setopensnakc(false)} severity="error">
              Internal server error
            </Alert>
          </Snackbar>
          <Box textAlign="center">
            {loading ? <LinearProgress /> : null}
            <Typography style={{ color: "#ff5722" }} variant="h5">
              Sign Up
            </Typography>
            <Box my={1}>
              <Typography variant="body2" style={{ color: "#ff7043" }}>
                Add your details to signup
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        {/* input fields */}
        <DialogContent>
          <Box m={7}>
            <Input
              placeholder="Enter Username"
              className={classes.inputWidth}
              onChange={(e) => setstate({ ...state, username: e.target.value })}
            />{" "}
            <br />
            <Input
              placeholder="Enter Email"
              className={classes.inputWidth}
              onChange={(e) => setstate({ ...state, email: e.target.value })}
            />{" "}
            <br />
            <Input
              placeholder="Enter Password"
              type="password"
              className={classes.inputWidth}
              onChange={(e) => setstate({ ...state, password: e.target.value })}
            />{" "}
            <br />
            <Input
              placeholder="Confirm Password"
              type="password"
              className={classes.inputWidth}
              onChange={(e) =>
                setstate({ ...state, cpassword: e.target.value })
              }
            />{" "}
            <br />
            image:
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setstate({ ...state, selectedFile: base64 })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <Button
              variant="contained"
              disabled
              style={{
                background: "#ff7043",
                color: "whitesmoke",
                borderRadius: "0px",
              }}
            >
              ...
            </Button>
          ) : (
            <Button
              onClick={signup}
              variant="contained"
              style={{
                background: "#ff5722",
                color: "whitesmoke",
                borderRadius: "0px",
              }}
            >
              Signup
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserLogin;
