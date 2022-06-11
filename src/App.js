import logo from "./logo.svg";
import "./App.css";
// import Body from './components/body/Body';
import CustomizedTables from "./components/table/Table";
import EditForm from "./components/editForm/EditForm";
import { EditFormRenderPage } from "./components/editForm/EditFormToRender";
import Body from "./components/body/Body";
import NotEnoughStarter from "./components/dialogueBox/notEnoughStarter/NotEnoughStarter";
import ImporterDialogue from "./components/dialogueBox/importerDialogue/importerDialogue";
import RoasterDetails from "./components/roasterDetails/RoasterDetails";

function App() {
  return (
    <div>
      {/* <CustomizedTables /> */}
      {/* <EditForm />
      <EditFormRenderPage />
      <Body />
      <ImporterDialogue /> */}
      {/* <RoasterDetails /> */}
      <EditFormRenderPage />
      {/* <EditForm /> */}
    </div>
  );
}

export default App;
