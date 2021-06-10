import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

function CircleProgressBar(props) {
  return (
    <Box
      display="flex"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size={props.size} />
    </Box>
  );
}

CircleProgressBar.propTypes = {
  size: PropTypes.number,
};

CircleProgressBar.defaultProps = {
  size: 20,
};

export default CircleProgressBar;
