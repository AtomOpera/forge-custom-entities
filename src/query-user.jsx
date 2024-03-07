import ForgeUI, { Fragment, TextField, Form, useState, Select, Option } from '@forge/ui';
import { storage, WhereConditions } from '@forge/api';
import UsersView from './user-view';

export default function QueryUsers({ }) {
  const [searchResultsByName, setSearchResultsByName] = useState([]);
  const searchByName = async (data) => {
    try {
      let queryBuilder = storage
        .entity("users")
        .query()
        .index('by-country-name', {
          partition: [data.country]
        })
      if (data.name) {
        queryBuilder = queryBuilder
          .where(WhereConditions.beginsWith(data.name));
      }
      const results = await queryBuilder
        .getMany();
      setSearchResultsByName(results.results);
    } catch (e) {
      throw e;
    }
  }
  return (
    <Fragment>
      <Form onSubmit={searchByName} submitButtonText="Search">
        <Select isRequired name="country" label="Country">
          <Option label="India" value="India" />
          <Option label="Australia" value="Australia" />
          <Option label="Indonesia" value="Indonesia" />
        </Select>
        <TextField name="name" label="Search by name beginning with" type="text" />
      </Form>
      <UsersView users={searchResultsByName} />
    </Fragment>
  )
}