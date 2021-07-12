import React, { useState } from "react";
// we will setup token at last to make our api secure
import axios from "axios";
import { url } from "../../Api/ApiRoutes";
import {
  Box,
  Button,
  Container,
  Paper,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Input,
  TextareaAutosize,
  IconButton,
} from "@material-ui/core";
import useStylesCreateAdd from "./CreateAddStyles";
import {
  DriveEta,
  BrushOutlined,
  LocalLaundryServiceOutlined,
  Home,
  PowerOutlined,
  Gavel,
  LineStyle,
  Close,
} from "@material-ui/icons";
const CreateAdd = () => {
  const [value, setvalue] = useState("");
  const [file1, setfile1] = useState("");
  const [file2, setfile2] = useState("");
  const [file3, setfile3] = useState("");
  const [file4, setfile4] = useState("");
  const [file5, setfile5] = useState("");
  const [file6, setfile6] = useState("");
  const [state, setstate] = useState([]);
  const [open, setopen] = useState(false);
  const user = localStorage.getItem("user")
  const classes = useStylesCreateAdd();
  // 1.select a category
  const submitTitle = (val) => {
    setvalue(val);
    setopen(true);
  };
  //2.files onCHANGE
  const fileOnchange1 = (e) => {
    setfile1(e.target.files[0]);
  };
  //2.files onCHANGE
  const fileOnchange2 = (e) => {
    setfile2(e.target.files[0]);
  };
  //3.files onCHANGE
  const fileOnchange3 = (e) => {
    setfile3(e.target.files[0]);
  };
  //4.files onCHANGE
  const fileOnchange4 = (e) => {
    setfile4(e.target.files[0]);
  };
  //5.files onCHANGE
  const fileOnchange5 = (e) => {
    setfile5(e.target.files[0]);
  };
  //6.files onCHANGE
  const fileOnchange6 = (e) => {
    setfile6(e.target.files[0]);
  };
  //3.after all submit form
  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("uploadedImages1", file1);
    formData.append("uploadedImages2", file2);
    formData.append("uploadedImages3", file3);
    formData.append("uploadedImages4", file4);
    formData.append("uploadedImages5", file5);
    formData.append("uploadedImages6", file6);
    formData.append("category", value);
    formData.append("title", state.title);
    formData.append("description", state.description);
    formData.append("time", state.time);
    formData.append("startofflocation", state.pickupaddress);
    formData.append("dropofflocation", state.dropoffaddress);
    await axios.post(`${url}/createAdd/${user}`, formData);
  };
  // time conversion logic
  //time logic
  function tConv24(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = H % 12 || 12;
    h = h < 10 ? "0" + h : h; // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    setstate({ ...state, time: ts });
  }

  return (
    <div>
      <Container maxWidth="xs">
        <form onSubmit={submitForm} encType="multipart/form-data" method="post">
          <Typography variant="h5" style={{ color: "#ff5722" }}>
            Make Your Add:
          </Typography>

          <Container>
            <Box my={2}>
              {/* <Grid container>
        <Grid item xs={6} sm={6} md={4} lg={4} xl={4}> */}
              <input
                type="file"
                name="uploadedImages"
                onChange={fileOnchange1}
              />
              <input
                type="file"
                name="uploadedImages"
                onChange={fileOnchange2}
              />
              <input
                type="file"
                name="uploadedImages"
                onChange={fileOnchange3}
              />
              <input
                type="file"
                name="uploadedImages"
                onChange={fileOnchange4}
              />
              <input
                type="file"
                name="uploadedImages"
                onChange={fileOnchange5}
              />
              <input
                type="file"
                name="uploadedImages"
                onChange={fileOnchange6}
              />
              {/* </Grid>
      </Grid> */}
            </Box>
          </Container>
          {/* title */}
          <Box my={2}>
            <Container maxWidth="sm">
              <Input
                onChange={(e) => setstate({ ...state, title: e.target.value })}
                fullWidth
                type="text"
                placeholder="Title"
              />
            </Container>
          </Box>
          {/* description */}
          <Container maxWidth="sm">
            <Box>
              <TextareaAutosize
                onChange={(e) =>
                  setstate({ ...state, description: e.target.value })
                }
                style={{ height: "100px", width: "99%" }}
                type="text"
                placeholder="Description"
              />
            </Box>
            {/* time */}
            <Box>
              <Input
                onChange={(e) => tConv24(e.target.value)}
                type="time"
                style={{ height: "100px", width: "99%" }}
              />
            </Box>
            {/* startlocation */}
            <Box>
              <Input
                onChange={(e) =>
                  setstate({ ...state, pickupaddress: e.target.value })
                }
                style={{ height: "100px", width: "99%" }}
                type="text"
                placeholder="startlocation"
              />
            </Box>
            {/* end location */}
            <Box>
              <Input
                onChange={(e) =>
                  setstate({ ...state, dropoffaddress: e.target.value })
                }
                style={{ height: "100px", width: "99%" }}
                type="text"
                placeholder="endLocation"
              />
            </Box>
          </Container>

          <input
            type="submit"
            value="Continue"
            style={{ background: "#ff5722", color: "white" }}
          ></input>
        </form>
      </Container>
      <Box textAlign="center" my={2}>
        <Typography variant="h4" style={{ color: "#ff5722" }}>
          Create Add
        </Typography>
      </Box>
      {/* categories */}
      <Container maxWidth="md">
        <Grid container>
          {/* item 1 */}
          <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
            <Button onClick={() => submitTitle("moveanddeliver")}>
              <Paper p={2} elevation={3} component={Box}>
                <DriveEta className={classes.iconColor} />
                <Typography variant="subtitle2">Move and deliver</Typography>
              </Paper>
            </Button>
          </Grid>
          {/* item 2 */}
          <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
            <Button onClick={() => submitTitle("cleaning")}>
              <Paper elevation={3} p={2} component={Box}>
                <LocalLaundryServiceOutlined className={classes.iconColor} />
                <Typography variant="subtitle2">Cleaning</Typography>
              </Paper>
            </Button>
          </Grid>
          {/* item 3 */}
          <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
            <Button onClick={() => submitTitle("homeandgarder")}>
              <Paper p={2} elevation={3} component={Box}>
                <Home className={classes.iconColor} />
                <Typography variant="subtitle2">Home and Garden</Typography>
              </Paper>
            </Button>
          </Grid>
          {/* item 4 */}
          <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
            <Button onClick={() => submitTitle("electrician")}>
              <Paper p={2} component={Box} elevation={3}>
                <PowerOutlined className={classes.iconColor} />
                <Typography variant="subtitle2">Electrician</Typography>
              </Paper>
            </Button>
          </Grid>
          {/* item 5 */}
          <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
            <Button onClick={() => submitTitle("hammer")}>
              <Paper p={2} component={Box} elevation={3}>
                <Gavel className={classes.iconColor} />
                <Typography variant="subtitle2">Hammer</Typography>
              </Paper>
            </Button>
          </Grid>
          {/* item 6 */}
          <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
            <Button onClick={() => submitTitle("painter")}>
              <Paper p={2} component={Box} elevation={3}>
                <BrushOutlined className={classes.iconColor} />
                <Typography variant="subtitle2">Painter</Typography>
              </Paper>
            </Button>
          </Grid>
          {/* item 7 */}
          <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
            <Button>
              <Paper p={2} component={Box} elevation={3}>
                <LineStyle className={classes.iconColor} />
                <Typography variant="subtitle2">Others</Typography>
              </Paper>
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CreateAdd;
