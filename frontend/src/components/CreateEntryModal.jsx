import { useState } from "react"
import { createPortal } from "react-dom"
import { createFile, createFolder } from "../features/file"

function CreateEntryModal({ kind, projectId, parentId, onClose, onCreated }) {
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const isFile = kind === "file"
    const title = isFile ? "Create File" : "Create Folder"

    const handleSubmit = async (event) => {
        event.preventDefault()
        const trimmedName = name.trim()
        if (!trimmedName) {
            setError(`${isFile ? "File" : "Folder"} name is required.`)
            return
        }

        setLoading(true)
        setError("")
        try {
            const result = isFile
                ? await createFile({
                    projectId,
                    name: trimmedName,
                    parentId,
                    language: trimmedName.includes(".") ? trimmedName.split(".").pop() : "plaintext"
                })
                : await createFolder({ projectId, name: trimmedName, parentId })

            if (!result) {
                throw new Error(`Could not create ${isFile ? "file" : "folder"}.`)
            }

            await onCreated()
            onClose()
        } catch (createError) {
            setError(createError?.response?.data?.message || createError?.message || `Could not create ${isFile ? "file" : "folder"}.`)
        } finally {
            setLoading(false)
        }
    }

    return createPortal(
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" onKeyDown={(event) => {
            if (event.key === "Escape" && !loading) onClose()
        }}>
            <button
                type="button"
                aria-label="Close dialog"
                onClick={onClose}
                className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
            />
            <form
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-entry-title"
                onSubmit={handleSubmit}
                className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-[#17171a] p-5 text-zinc-100 shadow-2xl sm:p-6"
            >
                <h2 id="create-entry-title" className="text-lg font-semibold">{title}</h2>
                <p className="mt-1 text-sm text-zinc-400">
                    {isFile ? "Enter a name, including an extension if needed." : "Choose a name for the new folder."}
                </p>
                <label htmlFor="create-entry-name" className="mt-5 block text-sm font-medium text-zinc-300">
                    {isFile ? "File name" : "Folder name"}
                </label>
                <input
                    id="create-entry-name"
                    autoFocus
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder={isFile ? "index.js" : "src"}
                    className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/15"
                />
                {error && <p role="alert" className="mt-3 text-sm text-red-400">{error}</p>}
                <div className="mt-6 flex justify-end gap-2">
                    <button
                        type="button"
                        disabled={loading}
                        onClick={onClose}
                        className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:bg-white/[0.06] disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading || !name.trim()}
                        className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Creating..." : title}
                    </button>
                </div>
            </form>
        </div>,
        document.body
    )
}

export default CreateEntryModal
