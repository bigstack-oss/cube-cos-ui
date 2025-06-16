import { PropsWithChildren, useContext, useMemo } from 'react'
import { DataCenterContext } from './DataCenterContext'
import { UserContext } from './UserContext'
import { userInfoApi } from '../api/cosApi'
import { useCosGetRequest } from '../hooks/useCosRequest/useCosGetRequest'
import { UserInfoApiGetMeRequest } from '@cube-frontend/api'

export const UserContextProvider = (props: PropsWithChildren) => {
  const { children } = props

  const { dataCenter, isLoading: isDataCenterLoading } =
    useContext(DataCenterContext)

  const { data: userInfo, isLoading: isUserInfoLoading } = useCosGetRequest(
    userInfoApi.getMe,
    () => {
      if (!dataCenter) {
        return null
      }
      const req: UserInfoApiGetMeRequest = {
        dataCenter: dataCenter.name,
      }
      return req
    },
  )

  const isLoading = isDataCenterLoading || isUserInfoLoading

  const contextValue = useMemo(() => {
    return {
      userInfo,
      isLoading,
    }
  }, [userInfo, isLoading])

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}
