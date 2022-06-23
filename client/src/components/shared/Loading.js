import { CircularProgress, Grid } from "@material-ui/core";

const FUN_MESSAGES = [
  "Loading",
  "Gathering our chickens",
  "Just cleaning up...",
  "Hello, Dave. You're looking well today",
  "Hope you brought a towel",
  "So long and thanks for all the fish",
  "Loading...",
];

const Loading = () => {
  const index = Math.floor(Math.random() * FUN_MESSAGES.length);

  return (
    <Grid
      xs
      item
      direction="column"
      container
      justify="center"
      alignItems="center"
    >
      <Grid item xs>
        <h3>{FUN_MESSAGES[index]}</h3>
      </Grid>
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
};

export default Loading;
