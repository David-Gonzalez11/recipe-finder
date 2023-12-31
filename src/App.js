import logo from "./logo.svg"
import "./App.css"
import { useState } from "react"
import Axios from "axios"
import styled from "styled-components"
import Dialog from "@mui/material/Dialog"
import { DialogTitle } from "@mui/material"
import { DialogActions } from "@mui/material"
import { DialogContent } from "@mui/material"
import {
  Header,
  AppIcon,
  SearchComponent,
  SearchInput,
  AppNameComponent,
  SearchIcon,
} from "./components/headerComponent"

const APP_ID = "3eb6f612"

const APP_KEY = "a8b42ab8cc62a2fabaf73db8260bf10f"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const RecipeListContainer = styled.div`
display: flex;
flex-direction: row;
padding: 30px;
justify-content: space-evenly;
flex-wrap: wrap;
justify-content space-evenly
`

const RecipeContainer = styled.div`
display: flex;
flex-direction: column;
padding: 10px;
width: 300px;
box-shadow: 0 3px 10px 0 #aaa
gap: 20px;
padding: 30px;
`
const CoverImage = styled.img`
  height: 200px;
  object-fit: cover;
`

const RecipeaName = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: black;
  margin: 10px 0;
`

const IngredientsText = styled.span`
font-size: 18px;
border: solid 1px green;
color: black;
cursor: pointer;
padding: 10px 15px;
border-radius: 4px;
color: green;
text-align: center
margin-bottom: 12px;
`

const SeeMoreText = styled(IngredientsText)`
  color: #eb3300;
  border: solid 1px #eb3300;
`

const Placeholder =  styled.img `
width: 120px;
margin: 200px;
height: 200px;
opacity: 50%;
`

const RecipeComponent = (props) => {
  const [show, setShow] = useState(false)
  console.log(props)
  const { recipeObj } = props
  return (
    <>
      <Dialog open={show}>
        <DialogTitle id="Alert">Ingredients</DialogTitle>
        <DialogContent>
          <tabel>
            <thead>
              <th>Ingredients</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {recipeObj.ingredients.map((ingredientsObj) => (
                <tr>
                  <td>{ingredientsObj.text}</td>
                  <td>{ingredientsObj.weight}</td>
                </tr>
              ))}
            </tbody>
          </tabel>
        </DialogContent>
        <DialogActions>
          <IngredientsText onClick={() => window.open(recipeObj.url)}>
            See More
          </IngredientsText>
          <SeeMoreText onClick={() => setShow(false)}>Close</SeeMoreText>
        </DialogActions>
      </Dialog>
      <RecipeContainer>
        <CoverImage src={recipeObj.image} />
        <RecipeaName>{recipeObj.label}</RecipeaName>
        <IngredientsText onClick={() => setShow(true)}>
          Ingredients
        </IngredientsText>
        <SeeMoreText onClick={() => window.open(recipeObj.url)}>
          See complete recipe
        </SeeMoreText>
      </RecipeContainer>
    </>
  )
}

function App() {
  const [timeoutId, updateTimeoutId] = useState()
  const [recipeList, updateRecipeList] = useState([])
  const fetchRecipe = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`
    )
    console.log(response)
    updateRecipeList(response.data.hits)
  }

  const onTextChange = (e) => {
    clearTimeout(timeoutId)
    const timeout = setTimeout(() => fetchRecipe(e.target.value), 500)
    updateTimeoutId(timeout)
  }

  return (
    // <div className="App">
    <Container>
      <Header>
        <AppNameComponent>
          <AppIcon src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Rpb_food_icon.svg/1200px-Rpb_food_icon.svg.png" />{" "}
          Foodie
        </AppNameComponent>
        <SearchComponent>
          <SearchIcon
            src="/search-icon.svg"
            alt="search icon"
            style={{ color: "blue" }}
          />
          <SearchInput placeholder="Search Recipe" onChange={onTextChange} />
          {/* <input /> */}
        </SearchComponent>
      </Header>
      <RecipeListContainer>
        {recipeList.length ?
          recipeList.map((recipeObj, index) => (
            <RecipeComponent key={index} recipeObj={recipeObj.recipe} />
          )): <Placeholder src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Rpb_food_icon.svg/1200px-Rpb_food_icon.svg.png"></Placeholder> }
        {/* <RecipeContainer>
          <CoverImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Rpb_food_icon.svg/1200px-Rpb_food_icon.svg.png" />
          <RecipeaName>MEtar paneer</RecipeaName>
          <IngredientsText> Ingrediemts</IngredientsText>
          <SeeMoreText>See complete reciple option </SeeMoreText>
        </RecipeContainer> */}
      </RecipeListContainer>
    </Container>

    // </div>
  )
}

export default App
