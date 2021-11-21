import React from "react";
import { useFieldArray } from "react-hook-form";
import { Header } from "semantic-ui-react";
import NestedArray from "./nestedFieldArray";

// eslint-disable-next-line react/prop-types
export default function Fields({ control, register, setValue, getValues }) {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "envvar",
  });

  return (
    <>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <Header as="h2" content={getValues(`envvar.${index}.name`)} />
            <NestedArray
              nestIndex={index}
              {...{ control, register, getValues }}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
