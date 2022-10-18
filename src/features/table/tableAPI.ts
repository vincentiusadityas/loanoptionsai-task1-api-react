// A mock function to mimic making an async request for data
export async function fetchTableData(amount = 1) {
    return await fetch("http://universities.hipolabs.com/search?country=Australia")
      .then(res => res.json())
      .then(
        (result) => {
          console.log("API RESULT:", result)
          return result
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          throw new Error(error)
        }
      )
}
  