import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { useRecoilValue } from "recoil";
import { userIsEditedState, userProperty } from "../../../state/atoms";
import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components";
import EditableImageButtons from "./EditableImageButtons";
import Box from "@material-ui/core/Box";
import {
  IMAGE_BASE64_JPG_PREFIX,
  IMAGE_BASE64_PREFIX,
} from "../../../config/Constants";

const ImageContainer = styled(Box)`
  width: 75px;
  height: 75px;
  position: relative;
`;

const ProfileImage = styled(Avatar)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function EditableImage(props) {
  const edited = useRecoilValue(userIsEditedState);
  const image = useRecoilValue(userProperty("image"));

  return (
    <Grid container spacing={2} direction={"row"} alignItems={props.alignItems}>
      <Grid item>
        <ImageContainer>
          <ProfileImage
            alt={
              typeof props.firstName === "string"
                ? props.firstName
                : props.firstName.props.value
            }
            src={getImageInBase64(image)}
          />
          {edited && <EditableImageButtons />}
        </ImageContainer>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
}

const getImageInBase64 = (image) => {
  return image && image.startsWith(IMAGE_BASE64_PREFIX)
    ? image
    : IMAGE_BASE64_JPG_PREFIX + image;
};

EditableImage.propTypes = {
  firstName: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
};

EditableImage.defaultProps = {
  firstName: "-",
};

export default EditableImage;
