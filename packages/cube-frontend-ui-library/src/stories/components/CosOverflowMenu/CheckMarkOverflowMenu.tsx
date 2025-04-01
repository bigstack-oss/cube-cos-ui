import { CosOverflowMenu } from '@cube-frontend/ui-library'
import { useState } from 'react'
import { OverflowMenuTrigger } from './OverflowMenuTrigger'

const adminValues = [1, 2, 3] as const
const memberValues = [4, 5, 6] as const

export const CheckMarkOverflowMenu = () => {
  const [adminValue, setAdminValue] = useState<(typeof adminValues)[number]>(1)

  const [memberValue, setMemberValue] =
    useState<(typeof memberValues)[number]>(4)

  return (
    <CosOverflowMenu triggerElement={<OverflowMenuTrigger />}>
      <CosOverflowMenu.Title>Admin</CosOverflowMenu.Title>
      {adminValues.map((value) => (
        <CosOverflowMenu.Item
          key={value}
          type="check-mark"
          title={`Option Title ${value}`}
          boldTitle={adminValue === value}
          isChecked={adminValue === value}
          disabled={value == 3}
          onClick={() => setAdminValue(value)}
        />
      ))}
      <CosOverflowMenu.Title>Member</CosOverflowMenu.Title>
      {memberValues.map((value) => (
        <CosOverflowMenu.Item
          key={value}
          type="check-mark"
          title={`Option Title ${value}`}
          boldTitle={memberValue === value}
          isChecked={memberValue === value}
          disabled={value == 6}
          onClick={() => setMemberValue(value)}
        />
      ))}
    </CosOverflowMenu>
  )
}
