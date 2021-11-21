import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Card } from "semantic-ui-react";
import { recipesSocket } from "../../../../recoil/Socketio";

// eslint-disable-next-line react/prop-types
const RecipesBrowser = ({ handleClick }) => {
  const recipeSocket = useRecoilValue(recipesSocket);
  const [recipeList, setRecipeList] = useState([]);
  useEffect(() => {
    recipeSocket.emit("list", (ack) => {
      setRecipeList(ack);
    });
  }, [recipeSocket]);
  return (
    <Card.Group>
      {recipeList.map((name) => (
        <Card key={name} id={name} header={name} onClick={handleClick} />
      ))}
    </Card.Group>
  );
};

export default RecipesBrowser;
