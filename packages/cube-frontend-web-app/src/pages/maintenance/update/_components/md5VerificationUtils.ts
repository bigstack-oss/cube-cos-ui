export type Md5VerificationState = 'verifying' | 'verified' | 'failed'

export type Md5FileNamePair = {
  pkg: string
  checksum: string
}

export type Md5ChecksumPair = {
  pkgMd5Checksum: string
  expectedMd5Checksum: string | undefined
}

export type PkgAndChecksumInfo = {
  pkg: FileWithMd5
  checksum: FileWithMd5
}

export type FileWithMd5 = {
  fileName: string
  md5Checksum: string
}
