import { GetMeResponseData } from '@cube-frontend/api'
import { PropsWithChildren, useContext, useEffect, useState } from 'react'
import { DataCenterContext } from './DataCenterContext'
import { UserContext } from './UserContext'
import { userInfoApi } from '../api/cosApi'

export const UserContextProvider = (props: PropsWithChildren) => {
  const { children } = props

  const [isLoading, setIsLoading] = useState(true)
  const [userInfo, setInfo] = useState<GetMeResponseData | undefined>()

  const dataCenter = useContext(DataCenterContext)

  useEffect(() => {
    userInfoApi.getMe(dataCenter.name).then((dataCentersResponse) => {
      setInfo(dataCentersResponse.data.data)
      setIsLoading(false)
    })
  }, [dataCenter.name])

  if (isLoading || !userInfo) {
    return null
  }

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  )
}
