import { useEffect, useState } from "react";
import { Modal, Icon, Button } from "semantic-ui-react";
import ModeSelection from "./recipe/ModeSelection";
import RecipesBrowser from "./recipe/RecipesBrowser";
import RecipeSetting from "./recipe/RecipeSetting";

// eslint-disable-next-line react/prop-types
const RecipeModel = ({ trigger }) => {
  const [open, setOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState("");

  const handleRecipeSelectClick = (e, { id }) => {
    setSelectedRecipe(id);
  };

  // clear state
  const handleClose = () => {
    setSelectedRecipe("");
    setOpen(false);
  };

  let view;
  view = <RecipesBrowser handleClick={handleRecipeSelectClick} />;
  if (selectedRecipe !== "")
    view = (
      <RecipeSetting recipeName={selectedRecipe} handleClose={handleClose} />
    );

  return (
    <>
      <Modal
        size="large"
        trigger={trigger}
        onOpen={() => setOpen(true)}
        onClose={() => handleClose()}
        open={open}
      >
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
