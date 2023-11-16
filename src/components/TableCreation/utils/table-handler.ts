import { SpaceTableType } from "@/@types/globalTypes"
import { fetchInstanceWithCookies } from "@/api/account-requests"

export const onCreateTable = async (
  name: string,
  spaceRef: string
) => {
  let createTablePost: SpaceTableType = await fetchInstanceWithCookies('/table', {
    method: 'POST',
    body: JSON.stringify({
      spaceRef,
      data: {
        name
      }
    })
  })

  console.log("createTablePost,", createTablePost)
  // @ts-ignore
  if (!createTablePost || createTablePost.error) {
    return null
  }

  return createTablePost
}

export const onTableNameUpdate = async (
  name: string,
  spaceTable: SpaceTableType
) => {
  let createTableObject = {
    spaceRef: spaceTable.spaceRef,
    data: {
      name
    }
  }
  
  let updateTablePost: SpaceTableType = await fetchInstanceWithCookies('/table', {
    method: 'POST',
    body: JSON.stringify(createTableObject)
  })

  // @ts-ignore
  if (!updateTablePost || updateTablePost.error) {
    return null
  }

  return updateTablePost
}