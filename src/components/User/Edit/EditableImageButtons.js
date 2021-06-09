import React, { useState } from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { userProperty } from "../../../state/atoms";
import { uploadImage, updateImage, deleteImage } from "../../../client/client";
import { setLastResponseState } from "../../../state/selectors";
import { currentUserState } from "../../../state/atoms";
import { checkImageEditionAlerts } from "../../../alerts/alertSelectors";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmationDialog from "../../UI/ConfirmationDialog";
import styled, { css } from "styled-components";
import {
  IMAGE_DELETION_CONFIRMATION_MSG,
  MAX_IMAGE_SIZE,
} from "../../../config/Constants";
import {
  INVALID_IMAGE_FORMAT_MSG,
  IMAGE_SIZE_EXCEEDED_MSG,
} from "../../../config/AlertConstants";

const sharedImageButtonStyle = css`
  position: absolute;
  padding: 4px;
  background: ${({ theme }) => theme.customPalette.colors.imageButtonIconBg};
  &:hover {
    background: ${({ theme }) =>
      theme.customPalette.colors.imageButtonIconBgHover};
  }
`;

const ImageUploadButton = styled(IconButton)`
  ${sharedImageButtonStyle}
  bottom: -12%;
  right: -12%;
`;

const ImageDeletionButton = styled(IconButton)`
  ${sharedImageButtonStyle}
  top: -12%;
  left: -12%;
`;

function EditableImageButtons() {
  const login = useRecoilValue(userProperty("login"));
  const [image, setImage] = useRecoilState(userProperty("image"));
  const [dialogOpen, setDialogOpen] = useState(false);
  const setResponse = useSetRecoilState(setLastResponseState);
  const setImageEditionAlerts = useSetRecoilState(checkImageEditionAlerts);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const validateAndReadImage = (file) => {
    if (isImageValid(file)) {
      if (file.size < MAX_IMAGE_SIZE) {
        readAndUpdateImage(file);
      } else {
        displayImageError(IMAGE_SIZE_EXCEEDED_MSG);
      }
    } else {
      displayImageError(INVALID_IMAGE_FORMAT_MSG);
    }
  };

  const isImageValid = (file) => {
    const allowedFormats = ["jpeg", "png", "gif"];
    return (
      file && allowedFormats.some((type) => file.type.match(`image/${type}`))
    );
  };

  const displayImageError = (message) => {
    setResponse({ status: 422, body: message });
    setImageEditionAlerts("imageEdition");
  };

  const readAndUpdateImage = (file) => {
    var reader = new FileReader();
    reader.onload = function (event) {
      updateProfileImage(file, event);
    };
    reader.readAsDataURL(file);
  };

  const updateProfileImage = async (file, event) => {
    const response = image
      ? await updateImage(login, file)
      : await uploadImage(login, file);

    setResponseAndImage(response, event.target.result);
  };

  const deleteProfileImage = async (confirmed) => {
    if (confirmed && image) {
      const response = await deleteImage(login);
      setResponseAndImage(response, null);
    }
    setDialogOpen(false);
  };

  const setResponseAndImage = (response, newImage) => {
    setResponse(response);
    setImageEditionAlerts("imageEdition");
    if (response.status === 200) {
      setImage(newImage);
      setCurrentUser({ ...currentUser, image: newImage });
    }
  };

  const handleFileInputChange = (event) => {
    validateAndReadImage(event.target.files[0]);
    event.target.value = '';
  };

  const cofirmDeletion = () => image !== null && setDialogOpen(true);

  return (
    <>
      <ImageUploadButton component="label" aria-label="add image">
        <PhotoCameraIcon />
        <input
          type="file"
          accept="image/gif, image/jpeg, image/png"
          onChange={handleFileInputChange}
          hidden
        />
      </ImageUploadButton>
      <ImageDeletionButton onClick={cofirmDeletion}>
        <DeleteIcon />
      </ImageDeletionButton>
      <ConfirmationDialog
        open={dialogOpen}
        confirm={deleteProfileImage}
        title={IMAGE_DELETION_CONFIRMATION_MSG}
      />
    </>
  );
}

export default EditableImageButtons;
