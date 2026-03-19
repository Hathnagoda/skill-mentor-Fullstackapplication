import { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { createMentor } from '../services/api'

export default function CreateMentorPage() {
  const { getToken } = useAuth()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    profession: '',
    company: '',
    title: '',
    bio: '',
    experienceYears: 0,
    isCertified: false,
  })

  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target

    setForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage('')
    setErrorMessage('')

    try {
      setLoading(true)

      const token = await getToken()
      if (!token) throw new Error('Authentication token not found')

      await createMentor(token, {
        ...form,
        experienceYears: Number(form.experienceYears),
      })

      setSuccessMessage('Mentor created successfully')

      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        profession: '',
        company: '',
        title: '',
        bio: '',
        experienceYears: 0,
        isCertified: false,
      })
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Failed to create mentor')
      }
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100'

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-6 px-8 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
              Admin Mentor Management
            </span>

            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                Create Mentor
              </h1>
              <p className="mt-2 text-lg leading-8 text-slate-600">
                Add a professional mentor profile to the platform so students can
                discover, review, and book sessions with the right expert.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-medium text-slate-500">Profile Setup</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">Mentor Details</p>
              <p className="mt-1 text-sm text-slate-600">
                Fill in the mentor’s basic information, expertise, and experience.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-900 p-5 text-white shadow-sm">
              <p className="text-sm font-medium text-slate-300">Quick note</p>
              <p className="mt-2 text-lg font-semibold">
                A complete profile improves mentor credibility and student trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {successMessage && (
        <div className="rounded-3xl border border-green-200 bg-green-50 p-4 text-green-700">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-red-700">
          {errorMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">
              First Name
            </label>
            <input
              name="firstName"
              placeholder="Enter first name"
              value={form.firstName}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">
              Last Name
            </label>
            <input
              name="lastName"
              placeholder="Enter last name"
              value={form.lastName}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter email address"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              placeholder="Enter phone number"
              value={form.phoneNumber}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">
              Profession
            </label>
            <input
              name="profession"
              placeholder="Enter profession"
              value={form.profession}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">
              Company
            </label>
            <input
              name="company"
              placeholder="Enter company"
              value={form.company}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-semibold text-slate-800">
              Title
            </label>
            <input
              name="title"
              placeholder="Enter mentor title"
              value={form.title}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-semibold text-slate-800">
              Bio
            </label>
            <textarea
              name="bio"
              placeholder="Write a short mentor bio"
              value={form.bio}
              onChange={handleChange}
              rows={5}
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">
              Experience Years
            </label>
            <input
              name="experienceYears"
              type="number"
              min={0}
              placeholder="Enter years of experience"
              value={form.experienceYears}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                name="isCertified"
                checked={form.isCertified}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300"
              />
              Certified Mentor
            </label>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Before you submit</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            <li>• Make sure the mentor’s email and name are entered correctly.</li>
            <li>• Add a professional title and clear bio for better profile quality.</li>
            <li>• Experience and certification help students make better choices.</li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Creating Mentor...' : 'Create Mentor'}
        </button>
      </form>
    </div>
  )
}