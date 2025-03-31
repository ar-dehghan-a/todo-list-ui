import {useState} from 'react'
import {message} from 'antd'
import axios, {AxiosError, AxiosResponse} from 'axios'

interface UploadResponse {
  url: string
  name: string
  size: number
  type: string
}

interface UploadFile {
  uid: string
  name: string
  status?: 'done' | 'uploading' | 'error' | 'removed'
  url?: string
  response?: UploadResponse
  size?: number
  type?: string
}

interface UploadInfo {
  fileList: UploadFile[]
}

interface UseFileUploadProps {
  uploadUrl?: string
  maxFileSize?: number // in MB
  allowedFileTypes?: string[]
}

interface UseFileUploadReturn {
  fileList: UploadFile[]
  uploading: boolean
  beforeUpload: (file: File) => boolean
  handleChange: (info: UploadInfo) => void
  customRequest: (options: {
    file: File
    onSuccess: (response: UploadResponse, file: File) => void
    onError: (error: Error) => void
  }) => Promise<void>
  handleRemove: (file: UploadFile) => boolean
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>
}

const useFileUpload = ({
  uploadUrl = '/files/upload',
  maxFileSize = 5,
  allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'],
}: UseFileUploadProps = {}): UseFileUploadReturn => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [uploading, setUploading] = useState<boolean>(false)

  const beforeUpload = (file: File): boolean => {
    const isAllowedType = allowedFileTypes.includes(file.type)
    if (!isAllowedType) {
      message.error(`You can only upload ${allowedFileTypes.join(', ')} files!`)
      return false
    }

    const isLtMaxSize = file.size / 1024 / 1024 < maxFileSize
    if (!isLtMaxSize) {
      message.error(`File must be smaller than ${maxFileSize}MB!`)
      return false
    }

    return true
  }

  const handleChange = (info: {fileList: UploadFile[]}) => {
    let newFileList = [...info.fileList]

    // Read response and show file link
    newFileList = newFileList.map(file => {
      if (file.response) {
        file.url = file.response.url
      }
      return file
    })

    setFileList(newFileList)
  }

  const customRequest = async ({
    file,
    onSuccess,
    onError,
  }: {
    file: File
    onSuccess: (response: UploadResponse, file: File) => void
    onError: (error: Error) => void
  }): Promise<void> => {
    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response: AxiosResponse = await axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      onSuccess(response.data, file)
      message.success(`${file.name} uploaded successfully`)
    } catch (error) {
      const axiosError = error as AxiosError
      onError(axiosError)
      message.error(`${file.name} upload failed: ${axiosError.message}`)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = (file: UploadFile): boolean => {
    // You might want to call an API to delete the file from server here
    const newFileList = fileList.filter(f => f.uid !== file.uid)
    setFileList(newFileList)
    return true // Return false to prevent removal
  }

  return {
    fileList,
    uploading,
    beforeUpload,
    handleChange,
    customRequest,
    handleRemove,
    setFileList,
  }
}

export default useFileUpload
