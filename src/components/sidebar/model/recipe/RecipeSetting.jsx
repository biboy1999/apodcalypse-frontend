import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { Divider, Form, Header } from "semantic-ui-react";
import { recipesSocket } from "../../../../recoil/Socketio";
import FieldArray from "../../../form/fieldArray";

// eslint-disable-next-line react/prop-types
const RecipeSetting = ({ recipeName, handleClose }) => {
  const recipeSocket = useRecoilValue(recipesSocket);

  const { handleSubmit, control, register, getValues, setValue, reset } =
    useForm();
  const { fields: variablesFields } = useFieldArray({
    control,
    name: "variables",
  });

  const [recipeCanonicalId, setRecipeCanonicalId] = useState("");

  const onSubmit = (data) => {
    const { prefix, variables, envvar } = data;
    const variablesArgs = Object.assign(
      {},
      ...variables.map((vars) => ({
        [vars.key]: vars.value,
      })),
    );

    const envArgs = Object.assign(
      {},
      ...envvar.map((container) => ({
        [container.name]: Object.assign(
          {},
          ...container.nestedArray.flatMap((env) =>
            env.value !== "" ? { [env.key]: env.value } : [],
          ),
        ),
      })),
    );
    console.log("sended");
    recipeSocket.emit(
      "craft",
      recipeCanonicalId,
      prefix,
      variablesArgs,
      envArgs,
    );

    handleClose();
  };

  useEffect(() => {
    if (recipeSocket)
      recipeSocket.emit("get_recipe", recipeName, (ack) => {
        const recipeJson = JSON.parse(ack);
        setRecipeCanonicalId(recipeJson.canonical_id);
        const defaultvalue = {
          variables: recipeJson.variables.map((vars) => ({
            key: vars.key,
            desc: vars.description,
            value: vars.default,
            type: vars.type,
            required: vars.required,
          })),
          envvar: recipeJson.containers.map((c) => ({
            name: c.name,
            nestedArray: c.environment_variables.map((env) => ({
              key: env.key,
              desc: env.description,
              value: env.default,
              type: env.type,
              required: env.required,
            })),
          })),
        };
        reset(defaultvalue);
      });
  }, [recipeSocket]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} id="recipe-form">
      <Header as="h1" content="Recipe Settings" />
      <Divider />
      <Header
        as="h3"
        content="Prefix name"
        subheader="For conatiner group prefix name"
      />
      <input type="text" required {...register(`prefix`)} />
      <Header as="h1" content="Variables" />
      <Divider />
      {variablesFields.map((item, index) => (
        <div key={item.id} className="field">
          <Header as="h3" content={item.key} subheader={item.desc} />
          <input
            type="text"
            placeholder={item.desc}
            {...register(`variables.${index}.value`)}
            required={item.required}
          />
        </div>
      ))}
      <Header as="h1" content="Environment Variables" />
      <Divider />
      <FieldArray {...{ control, register, getValues, setValue }} />
    </Form>
  );
};

export default RecipeSetting;
