import React from "react";

const Alert = (props) => {
  const capitalize=(word)=>{
    if(word==="danger"){
      word='wrong';
    }
    let ans=word.toLowerCase();
    return ans.charAt(0).toUpperCase()+ans.slice(1);
}
return (
<>
{props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
    <strong>{capitalize(props.alert.type)}: </strong>{props.alert.message}
  </div>}
</>
);
};

export default Alert;
