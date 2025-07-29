"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "./Inputs"
import axiosInstance from "../utils/axiosInstance"
import { API_PATHS } from "../utils/apiPaths"
import { FileText } from "lucide-react"

const CreateResumeForm = () => {
  const [title, setTitle] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleCreateResume = async (e) => {
    e.preventDefault()

    if (!title) {
      setError("Please enter resume title")
      return
    }
    setError("")

    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
      })
      if (response.data?._id) {
        navigate(`/resume/${response.data?._id}`)
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again.")
      }
    }
  }

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl border border-blue-100 shadow-xl">
      {/* Header with icon */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4">
          <FileText className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-blue-900 mb-2 text-center">Create New Resume</h3>
        <p className="text-blue-700/80 text-center">
          Give your resume a title to get started. You can customize everything later.
        </p>
      </div>

      <form onSubmit={handleCreateResume} className="space-y-6">
        <div>
          <Input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            label="Resume Title"
            placeholder="e.g., John Doe - Software Engineer"
            type="text"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-300 group relative overflow-hidden"
        >
          {/* Animated background on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10 flex items-center justify-center gap-2">
            <FileText className="w-5 h-5" />
            Create Resume
          </span>
        </button>
      </form>
    </div>
  )
}

export default CreateResumeForm