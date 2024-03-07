import ForgeUI, { render, Fragment, Macro, Tabs, Tab } from "@forge/ui";
import CreateUser from "./create-user";
import QueryUsers from "./query-user"

const App = () => {
  return (
    <Fragment>
      <Tabs>
        <Tab label="Create users">
          <CreateUser />
        </Tab>
        <Tab label="Query users">
          <QueryUsers />
        </Tab>
      </Tabs>
    </Fragment>
  );
};

export const run = render(
  <Macro
    app={<App />}
  />
);