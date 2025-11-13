import React from "react";
import { View, ScrollView, Text, Alert } from "react-native";
import { Formik } from "formik";
import {
  Input,
  Button,
  SelectInput,
  DatePicker,
  PhoneInput,
} from "@components/common";
import { ImagePickerComponent } from "@components/common/ImagePickerComponent";
import { editProfileValidationSchema } from "@utils/validation";
import { GENDER_OPTIONS } from "@utils/constants";
import { spacing } from "@theme";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { styles } from "./EditProfile.styles";
import { updateThunkProfile } from "@store/auth/authThunks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "@types";
import { useNavigation } from "@react-navigation/native";

interface EditProfileValues {
  firstName: string;
  lastName: string;
  gender: "male" | "female" | "other";
  countryCode: string;
  phoneNumber: string;
  profileImage?: string;
  dateOfBirth: string;
}

type NavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  "EditProfile"
>;

export const EditProfile: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();

  const handlePhoneChange = (
    phone: string,
    setFieldTouched: (
      field: string,
      touched?: boolean,
      shouldValidate?: boolean
    ) => void,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  ) => {
    const cleanPhoneValue = phone.replace(/[^0-9]/g, "");
    setFieldTouched("phoneNumber", true, false);
    setFieldValue("phoneNumber", cleanPhoneValue);
  };

  const handleSave = async (values: EditProfileValues) => {
    try {
      await dispatch(
        updateThunkProfile({
          userId: user?.id as string,
          updates: { ...values },
        })
      );

      Alert.alert(
        "Profile Updated",
        "Your profile has been successfully updated!",
        [{ text: "OK", onPress: () => navigation.navigate("Profile") }]
      );
    } catch (submitError) {
      Alert.alert(
        "Update Failed",
        "Something went wrong while updating your profile.",
        [{ text: "Try Again" }]
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Formik
        initialValues={{
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          countryCode: user?.countryCode ?? "+1",
          phoneNumber: user?.phoneNumber || "",
          dateOfBirth: user?.dateOfBirth || "",
          gender: user?.gender || "male",
          profileImage: user?.profileImage || "",
        }}
        validationSchema={editProfileValidationSchema}
        onSubmit={handleSave}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
          setFieldTouched,
        }) => (
          <View style={{ gap: spacing.xs }}>
            <View style={{ alignItems: "center", marginBottom: spacing.lg }}>
              <ImagePickerComponent
                currentImage={values?.profileImage}
                onImageSelected={(uri) => setFieldValue("profileImage", uri)}
                size={120}
              />

              <Text style={styles.emailText}>{user?.email ?? ""}</Text>
            </View>

            <Input
              label="First Name"
              placeholder="Enter your first name"
              value={values.firstName}
              onChangeText={handleChange("firstName")}
              onBlur={() => handleBlur("firstName")}
              error={touched.firstName ? errors.firstName : undefined}
            />

            <Input
              label="Last Name"
              placeholder="Enter your last name"
              value={values.lastName}
              onChangeText={handleChange("lastName")}
              onBlur={() => handleBlur("lastName")}
              error={touched.lastName ? errors.lastName : undefined}
            />

            <PhoneInput
              label="Phone Number"
              value={values.phoneNumber}
              countryCode={values.countryCode}
              onChangeText={(phone) =>
                handlePhoneChange(phone, setFieldTouched, setFieldValue)
              }
              onChangeCountryCode={(code) => {
                setFieldValue("countryCode", code);
              }}
              error={
                touched.phoneNumber && errors.phoneNumber
                  ? errors.phoneNumber
                  : undefined
              }
            />

            <View>
              <DatePicker
                label="Date of Birth"
                value={values.dateOfBirth ? new Date(values.dateOfBirth) : null}
                onChange={(date) => {
                  setFieldTouched("dateOfBirth", true, false);
                  setFieldValue("dateOfBirth", date.toISOString());
                }}
                error={
                  touched.dateOfBirth && errors.dateOfBirth
                    ? errors.dateOfBirth
                    : undefined
                }
              />
            </View>

            <SelectInput
              label="Gender"
              value={values.gender}
              onChange={(value: any) => setFieldValue("gender", value)}
              options={GENDER_OPTIONS}
              error={touched.gender ? errors.gender : undefined}
            />

            <View style={styles.buttonRow}>
              <Button
                title="Save"
                onPress={handleSubmit as any}
                style={styles.flexOne}
              />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};
