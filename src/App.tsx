import { registerRootComponent } from "expo";
import RootNavigator from "./navigation/RootNavigator";

function App() {
  return <RootNavigator />;
}

registerRootComponent(App);
