import logo from "./logo.svg"
import "./App.css"
import styled from "styled-components"
const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  color: white;
  background-color: black;
  display: flex;
  flex-direction: row;
  padding: 20px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px #555;
  align-items: center;
`
const AppNameComponent = styled.div`
display: flex;
align-items: center;
`
const AppIcon = styled.img`
width: 36px;
height: 36px;
margin: 15px;
`


const SearchComponent = styled.div``
function App() {
  return (
    // <div className="App">
    <Container>
      <Header>
        <AppNameComponent>
          <AppIcon src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Rpb_food_icon.svg/1200px-Rpb_food_icon.svg.png"/> Foodie
        </AppNameComponent>
        <SearchComponent>
          <img src="/search-icon.svg" alt="search icon" style={{color: "blue"}} />
        </SearchComponent>
      </Header>
    </Container>

    // </div>
  )
}

export default App
