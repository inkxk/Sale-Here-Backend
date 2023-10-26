import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';
import { typeDefs } from '../src/graphql/typedefs';
import { resolvers } from '../src/graphql/resolvers';

const GET_MESSAGES = gql`
  query getMessages($roomName: String!) {
    messages(roomName: $roomName) {
      body
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($roomName: String!, $message: String!) {
    sendMessage(roomName: $roomName, message: $message) {
      successful
    }
  }
`;

describe('Message', () => {
  const server = new ApolloServer({
    typeDefs: gql`
      ${typeDefs}
    `,
    resolvers
  });
  const { query, mutate } = createTestClient(server);
  describe('room1', () => {
    it('get messages in room1', async () => {
      const res = await query({
        query: GET_MESSAGES,
        variables: { roomName: 'room1' }
      });
      expect(res.data?.messages).toEqual([
        {
          body: '#1 message body in room1'
        }
      ]);
    });

    it('add message into room1', async () => {
      const res = await mutate({
        query: SEND_MESSAGE,
        variables: { roomName: 'room1', message: '#2 message body in room1' }
      });
      expect(res.data?.sendMessage?.successful).toEqual(true);
    });

    it('messages in room1 should added', async () => {
      const res = await query({
        query: GET_MESSAGES,
        variables: { roomName: 'room1' }
      });
      expect(res.data?.messages).toEqual([
        {
          body: '#1 message body in room1'
        },
        {
          body: '#2 message body in room1'
        }
      ]);
    });
  });

  describe('room2', () => {
    it('get messages in room2', async () => {
      const res = await query({
        query: GET_MESSAGES,
        variables: { roomName: 'room2' }
      });
      expect(res.data?.messages).toEqual([]);
    });

    it('add message into room2', async () => {
      const res = await mutate({
        query: SEND_MESSAGE,
        variables: { roomName: 'room2', message: '#1 message body in room2' }
      });
      expect(res.data?.sendMessage?.successful).toEqual(true);
    });
    it('get messages in room2', async () => {
      const res = await query({
        query: GET_MESSAGES,
        variables: { roomName: 'room2' }
      });
      expect(res.data?.messages).toEqual([
        { body: '#1 message body in room2' }
      ]);
    });
  });
});
