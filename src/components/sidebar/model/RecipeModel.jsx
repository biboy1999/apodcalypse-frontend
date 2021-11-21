import { useEffect, useState } from "react";
import { Modal, Icon, Button } from "semantic-ui-react";
import ModeSelection from "./recipe/ModeSelection";
import RecipesBrowser from "./recipe/RecipesBrowser";
import RecipeSetting from "./recipe/RecipeSetting";

// eslint-disable-next-line react/prop-types
const RecipeModel = ({ trigger }) => {
  const [mode, setMode] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState("");

  const handleRecipeSelectClick = (e, { id }) => {
    setSelectedRecipe(id);
  };

  let view;
  if (mode === "predefined") {
    view = <RecipesBrowser handleClick={handleRecipeSelectClick} />;
    if (selectedRecipe !== "")
      view = <RecipeSetting recipeName={selectedRecipe} />;
  } else if (mode === "create") view = <div>no</div>;
  else view = <ModeSelection handleModeChoose={setMode} />;

  return (
    <>
      <Modal size="fullscreen" trigger={trigger}>
        <Modal.Header>
          <Icon.Group>
            <Icon name="window restore" />
            <Icon name="add" corner />
          </Icon.Group>
          <span> Recipe Wizard</span>
        </Modal.Header>
        <Modal.Content scrolling>{view}</Modal.Content>
        <Modal.Actions>
          {selectedRecipe !== "" && (
            <Button positive form="recipe-form">
              <Icon name="plus" />
              Create
            </Button>
          )}
        </Modal.Actions>
      </Modal>
    </>
  );
};
export default RecipeModel;
