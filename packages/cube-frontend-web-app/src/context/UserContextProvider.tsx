import { PropsWithChildren, useContext } from 'react'
import { DataCenterContext } from './DataCenterContext'
import { UserContext } from './UserContext'
import { userInfoApi } from '../api/cosApi'
import { useCosGetRequest } from '../hooks/useCosRequest/useCosGetRequest'
import { UserInfoApiGetMeRequest } from '@cube-frontend/api'

export const UserContextProvider = (props: PropsWithChildren) => {
  const { children } = props

  const dataCenter = useContext(DataCenterContext)

  const { data: userInfo, isLoading } = useCosGetRequest(
    userInfoApi.getMe,
    () => {
      if (!dataCenter.name) return null
      const req: UserInfoApiGetMeRequest = {
        dataCenter: dataCenter.name,
      }
      return req
    },
  )

  if (isLoading || !userInfo) {
    return null
  }

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  )
}
