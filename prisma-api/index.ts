
import { PrismaClient } from '@prisma/client'
import express, { ErrorRequestHandler } from 'express'
import bcrypt from 'bcrypt'
// import bodyParser from 'body-parser'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post(`/auth/tokens`, async (req, res, next) => {
  const { action } = req.query
  const { username, password } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = { username: username, password: hashedPassword }

  // const userExists = prisma.user.findFirst({
  //   where: {
  //     username: username
  //   }
  // }) != null;

  // console.log(`user exists = ${userExists}`)

  // try {
  //   const result = await prisma.user.create({
  //     data: user
  //   })
  //   res.json(result)
  // } catch (e) {
  //   res.send(e)
  // }

  const result = await prisma.user.create({
    data: user
  }).catch(next);

  res.json(result)
})

// async function main() {
//     // const allUsers = await prisma.user.findMany()
//     // console.log(allUsers)

//     await prisma.user.create({
//         data: {
//           username: 'buckeyemania23',
//           password: 'cubs',
//           threads: {
//             create: { 
//                 // createdAt: 2020-03-21T16:45:01.246Z,
//                 title: 'hello'
//             },
//           }
//         },
//       })

//       const allUsers = await prisma.user.findMany({
//         include: {
//           threads: true,
//         //   profile: true,
//         },
//       })
//       console.dir(allUsers, { depth: null })
// }

// main()
//     .then(async () => {
//         await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//     })

app.use(((error, req, res, next) => {
  return res.status(500).json({ error: error.toString() });
}) as ErrorRequestHandler);

const port = 3001;
app.listen(port, () => {
  console.log(`🚀 Server ready at: http://localhost:${port}`)
})
