import React from "react";
import { TextInput, TextInputProps } from "react-native";

// interface InputProps extends TextInputProps {
//   placeholder: string;
//   value: string;
//   onChangeText: (text: string) => void;
// }

const Input = ({
  placeholder,
  value,
  onChangeText,
  ...rest
}: TextInputProps) => {
  return (
    <TextInput
      className="bg-white/10 border border-white/20 rounded-lg py-3 px-4 mb-4 text-white text-lg"
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      {...rest}
    />
  );
};

export default Input;

{
  /*
<-NOTES->


Keyboard & Input Type:
keyboardType — "default" | "email-address" | "numeric" | "phone-pad" | "url"

inputMode — "text" | "email" | "numeric" | "tel" | "search" (modern replacement for keyboardType)

returnKeyType — "done" | "next" | "send" | "search" | "go" (changes the keyboard's return key label)

secureTextEntry — true / false (hides text, for passwords)

Autofill & Autocomplete
autoComplete — "email" | "password" | "username" | "new-password" | "one-time-code" etc.

textContentType (iOS only) — "emailAddress" | "password" | "username" | "oneTimeCode" (enables iOS keychain autofill)

autoCapitalize — "none" | "sentences" | "words" | "characters"

autoCorrect — true / false

Behavior:
editable — true / false (disables input, like a read-only field)

maxLength — number (e.g. maxLength={100})

multiline — true / false (for chat message input box)

numberOfLines — number (use with multiline)

autoFocus — true / false (auto-focuses when screen opens)

submitBehavior — "blurAndSubmit" | "submit" | "newline"

Event Handlers:
onFocus — fires when user taps the input

onBlur — fires when user leaves the input (great for validation)

onSubmitEditing — fires when user presses the return/done key

onEndEditing — fires when editing ends

Styling:
placeholderTextColor — color string (e.g. "rgba(255,255,255,0.4)")

selectionColor — color of the text cursor/selection highlight

textAlign — "left" | "center" | "right"
    
*/
}
