import type {GetProp, UploadProps} from 'antd'
export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

export const convertFileToBase64 = (file: FileType, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(file)
}
