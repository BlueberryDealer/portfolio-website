export async function GET() {

  const query = `
    query {
      user(login: "${process.env.GITHUB_USERNAME}") {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                date
                weekday
              }
            }
          }
        }
      }
    }
  `

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  })

  const data = await response.json()

  return Response.json(
    data.data.user.contributionsCollection.contributionCalendar.weeks
  )
}