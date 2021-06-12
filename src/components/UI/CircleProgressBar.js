import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

function CircleProgressBar(props) {
  return (
    <Box
      display="flex"
      width="100%"
      height={props.containerHeight}
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size={props.size} />
    </Box>
  );
}

CircleProgressBar.propTypes = {
  size: PropTypes.number,
  containerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

CircleProgressBar.defaultProps = {
  size: 20,
  containerHeight: "100%",
};

export default CircleProgressBar;
