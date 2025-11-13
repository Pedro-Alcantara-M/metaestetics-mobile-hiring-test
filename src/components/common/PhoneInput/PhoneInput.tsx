import React, { useMemo, useRef } from "react";
import { View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import metadata from "libphonenumber-js/metadata.min.json";
import { Typography } from "../Typography";
import { styles } from "./PhoneInput.styles";

export interface PhoneInputProps {
  label?: string;
  value: string;
  onChangeText: (phone: string) => void;
  onChangeCountryCode: (code: string) => void;
  countryCode: string;
  error?: string;
}

export const PhoneInputComponent: React.FC<PhoneInputProps> = ({
  label,
  value,
  onChangeText,
  onChangeCountryCode,
  countryCode,
  error,
}) => {
  const phoneInputRef = useRef<PhoneInput>(null);

  const getCountryIsoFromCode = () => {
    const callingCode = countryCode.replace("+", "");
    const data = (metadata as any).country_calling_codes;
    if (!data) return undefined;
  
    if (data[callingCode]) {
      const countries = data[callingCode];
      return Array.isArray(countries) && countries.length > 0 ? countries[0] : undefined;
    }
  
    const prefixMatch = Object.keys(data).find((key) => callingCode.startsWith(key));
    if (prefixMatch) {
      const countries = data[prefixMatch];
      return Array.isArray(countries) && countries.length > 0 ? countries[0] : undefined;
    }
  
    return undefined;
  };

  const iso = useMemo(() => getCountryIsoFromCode(), [countryCode]);

  return (
    <View style={styles.container}>
      {label && (
        <Typography variant="body2" style={styles.label}>
          {label}
        </Typography>
      )}
      <PhoneInput
        key={iso}
        defaultCode={(iso as any) || "US"}
        ref={phoneInputRef}
        value={value}
        onChangeText={onChangeText}
        onChangeCountry={(code) => {
          const callingCode = code.callingCode[0];
          if (callingCode) {
            onChangeCountryCode(`+${code.callingCode[0]}`);
          }
        }}
        containerStyle={styles.phoneContainer}
        textContainerStyle={styles.textContainer}
        textInputStyle={styles.textInput}
        codeTextStyle={styles.codeText}
      />
      {error && (
        <Typography variant="caption" style={styles.errorText}>
          {error}
        </Typography>
      )}
    </View>
  );
};
