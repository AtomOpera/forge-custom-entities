import ForgeUI, { TextField, Form, Select, Option, Fragment, SectionMessage, Text, useState } from '@forge/ui';
import { storage } from '@forge/api'
import { v4 as uuidv4 } from 'uuid';

export default function CreateUser() {
  const [userCreated, setUserCreated] = useState(false);

  const createUser = async (data) => {
    try {
      await storage
        .entity("users")
        .set(`user-${uuidv4()}`, {
          ...data,
          age: parseInt(data.age),
        });
      setUserCreated(true);
    } catch (e) {
      throw e;
    }
  }

  return (
    <Fragment>
      <Form onSubmit={createUser} submitButtonText="Create user">
        <TextField name="name" label="Name" type="text" />
        <TextField name="age" label="Age" type="number" />
        <Select name="country" label="Country">
          <Option label="India" value="India" />
          <Option label="Australia" value="Australia" />
          <Option label="Indonesia" value="Indonesia" />
        </Select>
      </Form>
      {userCreated &&
        <SectionMessage title="Success" appearance="info">
          <Text>User created successfully</Text>
        </SectionMessage>
      }
    </Fragment>
  )
}