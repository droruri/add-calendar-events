import * as React from 'react';
import MaskedInput from "react-text-mask";

export default function TimePickerLocal(props) {
  const { inputRef, ...other } = props;
  const myMask = function(rawValue) {
    if (["0", "1"].includes(rawValue[0])) {
      return [/[01]/, /\d/, ":", /[0-5]/, /\d/];
    } else {
      return [/[2]/, /[0-3]/, ":", /[0-5]/, /\d/];
    }
  };

  return (
    <MaskedInput {...other} style={{textAlign: 'center'}} inputMode="numeric" mask={myMask} />
  );
}
