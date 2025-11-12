import React from "react";
import {
  View,
  Image,
} from "react-native";
import { Button, Typography } from "@components/common";
import { RegisterData } from "@types";
import { styles } from "../components/Steps.styles";

export interface Step4ReviewProps {
  formData: RegisterData;
  onPrevious: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const Step4Review: React.FC<Step4ReviewProps> = ({
  formData,
  onPrevious,
  onSubmit,
  isLoading,
}) => {
  return (
    <View style={styles.container}>
      <Typography variant="h3" style={styles.title}>
        Review Your Information
      </Typography>

      <View style={styles.imageReviewontainer}>
        {formData.profileImage ? (
          <Image
            source={{ uri: formData.profileImage }}
            style={styles.profilePhoto}
          />
        ) : (
          <View style={[styles.profilePhoto, styles.imageProfileContainer]}>
            <Typography variant="body1">No Photo</Typography>
          </View>
        )}
      </View>

      {/* User Info */}
      <View style={styles.infoContainer}>
        <Typography variant="h4" style={styles.reviewLabel}>
          Full Name
        </Typography>
        <Typography variant="body1" style={styles.reviewValue}>
          {formData.firstName + formData.lastName || "-"}
        </Typography>

       <Typography variant="h4" style={styles.reviewLabel}>
          Email
        </Typography>
        <Typography variant="body1" style={styles.reviewValue}>
          {formData.email || "-"}
        </Typography>

       <Typography variant="h4" style={styles.reviewLabel}>
          Phone
        </Typography>
        <Typography variant="body1" style={styles.reviewValue}>
          {formData.countryCode + formData.phoneNumber || "-"}
        </Typography>

       <Typography variant="h4" style={styles.reviewLabel}>
          Birth Date
        </Typography>
        <Typography variant="body1" style={styles.reviewValue}>
          {formData.dateOfBirth
            ? new Date(formData.dateOfBirth).toLocaleDateString()
            : "-"}
        </Typography>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          title="Back"
          variant="ghost"
          onPress={onPrevious}
          style={styles.flexOne}
        />

        <Button
          title="Submit"
          onPress={onSubmit}
          style={styles.flexOne}
          loading={isLoading}
        />
      </View>
    </View>
  );
};
