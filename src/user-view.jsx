import ForgeUI, { Table, Cell, Text, Head, Row, ButtonSet, Button, useState, Code } from '@forge/ui';
import { storage } from '@forge/api';
export default function UsersView({ users }) {
  const [userDetail, setUserDetail] = useState(null);
  const getUserDetail = async (user) => {
    const userDetailResponse = await storage.entity('users').get(user.key);
    setUserDetail({
      key: user.key,
      value: userDetailResponse
    });
  };
  const deleteUser = async (userKey) => {
    await storage.entity('users').delete(userKey);
    setUserDetail(null);
  };
  return (
    <Table>
      <Head>
        <Cell>
          <Text>Name</Text>
        </Cell>
        <Cell>
          <Text>Country</Text>
        </Cell>
        <Cell>
          <Text>Age</Text>
        </Cell>
        <Cell>
          <Text>Actions</Text>
        </Cell>
        <Cell>
          <Text>User details</Text>
        </Cell>
      </Head>
      {
        users.map((user) => (
          <Row>
            <Cell>
              <Text>{user.value.name}</Text>
            </Cell>
            <Cell>
              <Text>{user.value.country}</Text>
            </Cell>
            <Cell>
              <Text>{user.value.age}</Text>
            </Cell>
            <Cell>
              <ButtonSet>
                <Button
                  text='Get details'
                  onClick={async () => {
                    await getUserDetail(user);
                  }}
                />
                <Button
                  text='Delete user'
                  onClick={async () => {
                    await deleteUser(user.key);
                  }}
                />
              </ButtonSet>
            </Cell>
            <Cell>
              {
                (userDetail && userDetail.key === user.key)
                  ? (
                    <Code
                      text={JSON.stringify(userDetail, null, 2)}
                      language="json"
                    />
                  )
                  : null
              }
            </Cell>
          </Row>
        ))
      }
    </Table>
  )
}