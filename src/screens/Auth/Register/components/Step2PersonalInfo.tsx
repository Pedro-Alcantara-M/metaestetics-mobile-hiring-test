import React from "react";
import { View } from "react-native";
import { Formik } from "formik";
import {
  Input,
  Button,
  Typography,
  SelectInput,
  PhoneInput,
  DatePicker,
} from "@components/common";
import { spacing } from "@theme";
import { registerStep2ValidationSchema } from "@utils/validation";
import { RegisterData } from "@types";
import { GENDER_OPTIONS } from "@utils/constants";
import { styles } from "../components/Steps.styles";

export interface Step2PersonalInfoProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const Step2PersonalInfo: React.FC<Step2PersonalInfoProps> = ({
  formData,
  onDataChange,
  onNext,
  onPrevious,
}) => {

  const handlePhoneChange = (
   phone: string,
    setFieldTouched: (field: string, touched?: boolean, shouldValidate?: boolean) => void,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  ) => {
    const cleanPhoneValue = phone.replace(/[^0-9]/g, "");
    setFieldTouched("phoneNumber", true, false);
    setFieldValue("phoneNumber", cleanPhoneValue);
  };

  return (
    <Formik
      initialValues={{
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        countryCode: formData.countryCode ?? "+1",
        phoneNumber: formData.phoneNumber || "",
        dateOfBirth: formData.dateOfBirth || "",
        gender: formData.gender || "male",
      }}
      validationSchema={registerStep2ValidationSchema}
      onSubmit={(values) => {
        onDataChange(values);
        onNext();
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldTouched,
        setFieldValue,
      }) => (
        <View>
          <Typography variant="h3" style={styles.title}>
            Personal Information
          </Typography>

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
            onChangeText={(phone) => handlePhoneChange(phone, setFieldTouched, setFieldValue)}
            onChangeCountryCode={(code) => {
              console.log("Selected country code:", code);
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

          <View
            style={styles.buttonsContainer}
          >
            <Button
              variant="ghost"
              onPress={onPrevious}
              style={styles.flexOne}
              title="Back"
            />

            <Button
              title="Next"
              onPress={handleSubmit as any}
              style={styles.flexOne}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};
