// no time
const keyDict = {
  SUCCESS: "✔️ Success!",
  RECIPE_UNPACKING: "⌛ Recipe Unpacking.",
  RECIPE_EXTRACT_FINISHED: "✔️ Recipe Extract Finished.",
  RECIPE_IMPORT_FINISHED: "✔️ Recipe Import Finished.",
  CRAFT_PREPARE: "⌛ Preparing.",
  CRAFT_PULLING_IMAGE: "🖼️ Pulling Images.",
  CRAFT_NETWORK_CREATED: "🌐 Network Created.",
  CRAFT_CONTAINER_CREATED: "📦 Container Created.",
  CRAFT_FINISHED: "✔️ Recipe Deployed!",
  BAD_ZIPFILE: "❌ Bad Zip(might corrupted or wrong file)",
  INCORRECT_RECIPE_STRUCTURE: "❌ Incorrect Recipe Structure.",
  MISSING_RECIPE_FILE: "❌ Missing Recipe File.(Can't find recipe.json)",
  INCORRECT_RECIPE_JSON_FORMAT: "❌ Incorrect Recipe Json Format.",
  NO_SUCH_RECIPE: "❌ no",
  MISSING_VARIABLE: "❌ Missing Variable.",
  BAD_PREFIX_NAME: "❌ Prefix must be [a-z_]+",
};
const formatter = (key, msg = "") => `${keyDict[key]} ${msg}`;

export default formatter;
