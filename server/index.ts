import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

interface Author {
    id: number,
    name: string,
}

interface Review {
    book_id: number,
    by: string,
    comment: string,
    rating: number,
}

interface Book {
    id: number,
    name: string
    published_at: Date,
    author: number,
}

const books: Book[] = [
    {
        id: 1,
        name: "Tutorial JS",
        published_at: new Date(),
        author: 1,
    },
];
const authors: Author[] = [
    { id: 1, name: "Reza" },
]
const reviews: Review[] = [
    {
        book_id: 1,
        by: "Ujang",
        comment: "Mantul",
        rating: 4,
    },
    {
        book_id: 1,
        by: "Budi",
        comment: "Okelah",
        rating: 2,
    },
]

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      scalar Datetime
      type Query {
        hello: String
        books: [Book!]!
        authors: [Author!]!
        reviews: [Review!]!
      }
      type Mutation {
        addBook(name: String, published_at: String, author: String): Book!
      }
      type Book {
        name: String
        published_at: Datetime
        author: Author
        reviews: [Review]
      }
      type Author {
        name: String
      }
      type Review {
        by: String
        comment: String,
        rating: Int,
      }
    `,
    resolvers: {
      Query: {
        hello: () => 'Hello from Yoga!',
        books: () => books,
        authors: () => authors,
        reviews: () => reviews,
      },
      Mutation: {
        addBook: (parent: unknown, args: { name: string, published_at: string, author: string }) => {
          const idCount = books.length;
          const authorIdCount = authors.length + 1;
          const book: Book = {
            id: idCount + 1,
            name: args.name,
            published_at: new Date(args.published_at),
            author: authorIdCount,
          }
          const author = { id: authorIdCount, name: args.author }

          books.push(book)
          authors.push(author)
          
          return book;
        }
      },
      Book: {
        name: (parent: Book) => parent.name,
        published_at: (parent: Book) => parent.published_at,
        author: (parent: Book) => authors.find(author => author.id === parent.author),
        reviews: (parent: Book) => reviews.map(review => review.book_id === parent.id),
      },
      Author: {
        name: (parent: Author) => parent.name,
      },
      Review: {
        by: (parent: Review) => parent.by,
        comment: (parent: Review) => parent.comment,
        rating: (parent: Review) => parent.rating,
      },
    }
  })
})

const server = createServer(yoga)

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})