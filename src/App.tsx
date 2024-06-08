import { BrowserRouter,Routes,Route } from "react-router-dom"
import Layout from "./layouts/Layout"

type Props = {}
const App = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout>
            <p>Home Page</p>
          </Layout>}
        />
        <Route path="/search" element={
          <Layout>
            <p>Search Page</p>
          </Layout>}
        />
      </Routes>
    </BrowserRouter>
  )
}
export default App