// import fs from "fs"
// import path from "path"
// import { faker } from "@faker-js/faker"

// import { year_of_graduation, priorities, statuses } from "./data"

// const tasks = Array.from({ length: 100 }, () => ({
//   id: faker.datatype.number({ min: 1000, max: 9999 }),
//   name: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
//   degree: faker.helpers.arrayElement(statuses).value,
//   year_of_graduation: faker.helpers.arrayElement(year_of_graduation).value,
//   priority: faker.helpers.arrayElement(priorities).value,
// }))

// fs.writeFileSync(
//   path.join(__dirname, "tasks.json"),
//   JSON.stringify(tasks, null, 2)
// )

// console.log("✅ Tasks data generated.")
