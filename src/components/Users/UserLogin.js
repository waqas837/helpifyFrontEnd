import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast'; 
import {url} from "../../Api/ApiRoutes"
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
  const history = useHistory();
  useEffect(() => {
    setopen(true);
  }, []);
  const [open, setopen] = useState(false);
  const [state, setstate] = useState(false);
  const [loading, setloading] = useState(false);
  
 //singn in user
 const userSignsin = async () => {
  setloading(true);
  const { data } = await axios.post(
    `${url}/login`,
    state
  );
  setloading(false);
  if (data.success) {
    localStorage.setItem("user", data.user);
    toast.success("Thanks for login");
    window.location.reload()
  }
  if (data.err) {
    toast.error("Invalid email or passoword");
  }
};


  return (
    <div>
    <Toaster/>
      <Dialog
        open={open}
        BackdropProps={{
          classes: {
            root: classes.blur,
          },
        }}
      >
        <DialogTitle>
          <Box textAlign="center">
            <Typography style={{ color: "#ff5722" }} variant="h5">
              Login
            </Typography>
            <Box my={1}>
              <Typography variant="body2" style={{ color: "#ff7043" }}>
                Add your details to login
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        {/* input fields */}
        <DialogContent>
          <Box m={7}>
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
            <br />
          </Box>
        </DialogContent>
        <DialogActions>
          {loading?<Button
             disabled 
            variant="contained"
            style={{
              background: "#ff5722",
              color: "whitesmoke",
              borderRadius: "0px",
            }}
          >
            ...
          </Button>:<Button
            onClick={userSignsin}
            variant="contained"
            style={{
              background: "#ff5722",
              color: "whitesmoke",
              borderRadius: "0px",
            }}
          >
            Login
          </Button>}
        </DialogActions>
        <Box textAlign="center">
          <Typography variant="body2">Not have an account?</Typography>
          <Button
            variant="outlined"
            style={{
              background: "#ff5722",
              color: "whitesmoke",
              borderRadius: "0px",
            }}
            onClick={() => history.push("/signup")}
          >
            Sign Up
          </Button>{" "}
        </Box>
      </Dialog>
    </div>
  );
};

export default UserLogin;
