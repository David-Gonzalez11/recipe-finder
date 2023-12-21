import logo from "./logo.svg"
import "./App.css"
import { useState } from "react"
import Axios from "axios"
import styled from "styled-components"

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

const RecipeComponent = (props) => {
  // const [show, setShow] = useState("")
  console.log(props)
  const {recipeObj} = props
  return (
<RecipeContainer>
  <CoverImage src={recipeObj.image} />
  <RecipeaName>{recipeObj.label}</RecipeaName>
  <IngredientsText>{}</IngredientsText>
  <SeeMoreText>See complete recipe</SeeMoreText>
</RecipeContainer>  )

}


function App() {
  const [timeoutId, updateTimeoutId] = useState()
  const [recipeList, updateRecipeList] = useState([])
const fetchRecipe = async  (searchString) => {
  const response =  await Axios.get(
    `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`)
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
        {recipeList.length  && recipeList.map((recipeObj, index) => (
          <RecipeComponent key = {index} recipeObj={recipeObj.recipe} />
))}
        <RecipeContainer>
          <CoverImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Rpb_food_icon.svg/1200px-Rpb_food_icon.svg.png" />
          <RecipeaName>MEtar paneer</RecipeaName>
          <IngredientsText> Ingrediemts</IngredientsText>
          <SeeMoreText>See complete reciple option </SeeMoreText>
        </RecipeContainer>
      </RecipeListContainer>
    </Container>

    // </div>
  )
}

export default App
