import React from "react";
import { useFieldArray } from "react-hook-form";
import { Divider, Header } from "semantic-ui-react";

// eslint-disable-next-line react/prop-types
export default ({ nestIndex, control, register, getValues }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `envvar.${nestIndex}.nestedArray`,
  });

  return (
    <div>
      {fields.map((item, k) => (
        <div key={item.id} className="field">
          <Header
            as="h4"
            content={getValues(`envvar.${nestIndex}.nestedArray.${k}.key`)}
            subheader={getValues(`envvar.${nestIndex}.nestedArray.${k}.desc`)}
          />
          <input {...register(`envvar.${nestIndex}.nestedArray.${k}.value`)} />
        </div>
      ))}
      <Divider />
    </div>
  );
};
