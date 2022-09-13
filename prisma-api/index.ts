
import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
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

const port = 3001;
app.listen(port, () => {
  console.log(`🚀 Server ready at: http://localhost:${port}`)
})
