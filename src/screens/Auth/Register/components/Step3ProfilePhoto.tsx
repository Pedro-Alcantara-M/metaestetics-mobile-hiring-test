import React, { useState } from "react";
import { View } from "react-native";
import { Typography, Button } from "@components/common";
import { ImagePickerComponent } from "@components/common/ImagePickerComponent";
import { spacing } from "@theme";
import { RegisterData } from "@types";
import { styles } from "../components/Steps.styles";

export interface Step3ProfilePhotoProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const Step3ProfilePhoto: React.FC<Step3ProfilePhotoProps> = ({
  formData,
  onDataChange,
  onNext,
  onPrevious,
}) => {
  const [photo, setPhoto] = useState<string | undefined>(formData.profileImage);

  const handleImageSelected = (uri: string) => {
    setPhoto(uri);
    onDataChange({ profileImage: uri });
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <View style={styles.profilePage}>
      <Typography variant="h3" style={styles.title}>
        Profile Photo
      </Typography>

      <Typography variant="body2" style={styles.profileSubtitle}>
        Add a profile picture to personalize your account.
      </Typography>

      <ImagePickerComponent
        currentImage={photo}
        onImageSelected={handleImageSelected}
        size={150}
      />

      <View
        style={styles.imageProfileContainer}
      >
        <Button
          title="Back"
          variant="ghost"
          onPress={onPrevious}
          style={styles.flexOne}
        />
        <Button
          title="Next"
          onPress={handleNext}
          style={styles.flexOne}
          disabled={!photo}
        />
      </View>
    </View>
  );
};
