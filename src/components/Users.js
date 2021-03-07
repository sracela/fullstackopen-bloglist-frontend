import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { filter } from 'fuzzaldrin-plus';
import { Pane, Table, Heading, Paragraph, Avatar, Text, Popover, Position, Menu, TextDropdownButton, ArrowUpIcon, ArrowDownIcon, CaretDownIcon } from "evergreen-ui";

const Order = {
  NONE: "NONE",
  ASC: "ASC",
  DESC: "DESC",
};

const getIconForOrder = (order) => {
  switch (order) {
    case Order.ASC:
      return ArrowUpIcon;
    case Order.DESC:
      return ArrowDownIcon;
    default:
      return CaretDownIcon;
  }
};

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [ordering, setOrdering] = useState(Order.NONE);
  const history = useHistory()
  const users = useSelector((state) => state.users);
  const filteredUsers = (users) => {
    if (searchQuery === "") {
      return users
    }
    return users.filter(user => {
      // Use the filter from fuzzaldrin-plus to filter by name.
      const result = filter([user.name], searchQuery.trim())
      return result.length === 1
    })
  }
  const sortedUsers = (users) => {
    if (ordering === Order.NONE ) {
      return users
    }
     return users.sort((a, b) => {
      let aValue = a.blogs.length
      let bValue = b.blogs.length

      // Support string comparison
      const sortTable = { true: 1, false: -1 }

      // Order ascending (Order.ASC)
      if (ordering === Order.ASC) {
        return aValue === bValue ? 0 : sortTable[aValue > bValue]
      }

      // Order descending (Order.DESC)
      return bValue === aValue ? 0 : sortTable[bValue > aValue]
    }) 
  }
  const finalUsers = sortedUsers(filteredUsers(users))
  
    return (
      <Pane padding={8} display="flex" flexDirection="column">
        <Pane display="flex" justifyContent="space-between" alignItems="center">
          <Pane>
            <Heading size={700}>All Users</Heading>
            <Heading size={100} marginTop="default">
              Click on User's Row in order to see it in more detail
            </Heading>
          </Pane>
          <Pane marginTop="20px">
            <Paragraph>{users.length} Total Users</Paragraph>
          </Pane>
        </Pane>
        <Pane>
          <Table marginY={32} background="white" elevation={3}>
            <Table.Head paddingY={32}>
              <Table.SearchHeaderCell
                onChange={(value) => setSearchQuery(value)}
                value={searchQuery}
              />
              <Table.TextHeaderCell>ID</Table.TextHeaderCell>
              <Table.TextHeaderCell>Username</Table.TextHeaderCell>
              <Table.TextHeaderCell>
                <Popover
                  position={Position.BOTTOM_LEFT}
                  content={({ close }) => (
                    <Menu>
                      <Menu.OptionsGroup
                        title="Order"
                        options={[
                          { label: "Ascending", value: Order.ASC },
                          { label: "Descending", value: Order.DESC },
                        ]}
                        selected={ordering}
                        onChange={(value) => {
                          setOrdering(value);
                          // Close the popover when you select a value.
                          close();
                        }}
                      />
                    </Menu>
                  )}
                >
                  <TextDropdownButton icon={getIconForOrder(ordering)}>
                    Added blogs
                  </TextDropdownButton>
                </Popover>
              </Table.TextHeaderCell>
            </Table.Head>
            <Table.Body>
              {finalUsers.map((user, index) => (
                <Table.Row
                  key={user.id}
                  isSelectable
                  onSelect={() => history.push(`/users/${user.id}`)}
                >
                  <Table.Cell display="flex" alignItems="center">
                    <Avatar name={user.name} />
                    <Text marginLeft={8} size={300} fontWeight={500}>
                      {user.name}
                    </Text>
                  </Table.Cell>
                  <Table.TextCell>{user.id}</Table.TextCell>
                  <Table.TextCell>{user.username}</Table.TextCell>
                  <Table.TextCell isNumber>{user.blogs.length}</Table.TextCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Pane>
      </Pane>
    );
}

export default Users;