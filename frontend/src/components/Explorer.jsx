import { motion } from "motion/react"
import { FilePlus2, FolderPlus, FolderTree, RefreshCcw } from 'lucide-react'
import { useState } from 'react'
import Folder from './Folder'
import CreateEntryModal from './CreateEntryModal'
function Explorer(
    {
        projectId, tree = [], reloadTree, openFile
    }
) {
    const entries = Array.isArray(tree) ? tree : []
    const [createEntry, setCreateEntry] = useState(null)
    const rootFolder = entries.find((node) => node?.type === "folder")

    const openCreateDialog = (kind, parentId = rootFolder?._id) => {
        if (!parentId) return
        setCreateEntry({ kind, parentId })
    }

    return (
        <>
        <motion.div
            initial={{ opacity: 0, x: -16, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 288 }}
            exit={{ opacity: 0, x: -16, width: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col overflow-hidden border-r border-white/[0.06] bg-[#111113]/90 backdrop-blur-xl"

        >

            <div className='flex h-10 w-72 shrink-0 items-center justify-between border-b border-white/[0.06] px-3'>
                <span className='text-[11px] font-semibold tracking-wider text-zinc-500'>
                    EXPLORER
                </span>

                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={() => openCreateDialog("file")}
                        disabled={!rootFolder}
                        className="rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-white/[0.07] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        title={rootFolder ? "New file in project root" : "Project root folder is not available"}
                        aria-label="Create file in project root"
                    >
                        <FilePlus2 size={14} />
                    </button>
                    <button
                        type="button"
                        onClick={() => openCreateDialog("folder")}
                        disabled={!rootFolder}
                        className="rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-white/[0.07] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        title={rootFolder ? "New folder in project root" : "Project root folder is not available"}
                        aria-label="Create folder in project root"
                    >
                        <FolderPlus size={14} />
                    </button>
                    <motion.button
                        whileHover={{ rotate: 60 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        onClick={reloadTree}
                        className="rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-white/[0.07] hover:text-white"
                        title="Refresh"
                        aria-label="Refresh files"
                    >
                        <RefreshCcw size={14} />
                    </motion.button>
                </div>
            </div>

            <div className='
          w-72 flex-1 overflow-y-auto px-1 py-2
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-white/[0.08]
          hover:[&::-webkit-scrollbar-thumb]:bg-white/[0.15]
          [&::-webkit-scrollbar-thumb]:transition-colors
        '
                style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}
            >
                {entries.length === 0 ? (
                    <div className='flex flex-col items-center gap-2 px-3 py-10 text-center'>
                        <FolderTree size={22} className="text-zinc-700" />
                        <span className="text-[12px] text-zinc-400">Project root folder is unavailable</span>
                        <span className="text-[11px] text-zinc-600">Create or reload the project root to add files and folders.</span>

                    </div>
                ) : (

                    entries.map((node) => (
                        <Folder
                            key={node._id}
                            projectId={projectId}
                            node={node}
                            tree={tree}
                            reloadTree={reloadTree}
                            openFile={openFile}
                            onCreateEntry={openCreateDialog}
                        />
                    ))

                )}
            </div>

        </motion.div>
        {createEntry && rootFolder && (
            <CreateEntryModal
                kind={createEntry.kind}
                projectId={projectId}
                parentId={createEntry.parentId}
                onClose={() => setCreateEntry(null)}
                onCreated={reloadTree}
            />
        )}
        </>
    )
}

export default Explorer
