import { debounce } from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
const RHookForm = ({
  uniqueId,
  children,
  errors = {},
  reduxUpdateFunction = () => {},
  reduxErrorUpdateFunction = () => {},
  searchObj = {},
}) => {
  const dispatch = useDispatch();
  let o = {};

  const onChangeOfValue = React.useCallback(
    debounce(({ values, uniqueId }) => {
      return reduxUpdateFunction(values);
    }, 100),
    [dispatch, uniqueId, o]
  );

  const handleChange = ({ e, uniqueId }) => {
    const { name, value, type, checked } = e.target;
    if (type == "checkbox") {
      o[name] = checked ? "Y" : "N";
    } else {
      if (
        type == "text" &&
        e.target?.attributes?.caseType?.nodeValue === "uppercase"
      ) {
        o[name] = value.toString().toUpperCase();
      } else {
        o[name] = value;
      }
    }
    if (type !== "search") {
      onChangeOfValue({ values: o, uniqueId });
      // onErrorChange({ errors: errors, uniqueId });
    }
    // if(errors && Object.keys(errors).length>0){
    //   let onlyErrors= Object.keys(errors).reduce(
    //     (acc, key) => ({...acc,[key]:errors[key]?.message }), {}
    //     );
    //   onErrorChange({errors:onlyErrors,uniqueId:uniqueId});
    // }
  };

  return (
    <form
      style={{ border: "none" }}
      onChange={(e) => handleChange({ e, uniqueId })}
    >
      {children}
    </form>
  );
};

export { RHookForm };
