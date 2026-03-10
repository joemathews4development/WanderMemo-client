import { Box, CircularProgress } from "@mui/material"
import { useState, useEffect, useRef } from "react"
import MemoryFeedCard from "../componnets/MemoryFeedCard"
import service from "../services/config.services"

function FeedsPage() {

  const [memories, setMemories] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const observer = useRef()

  const loadMemories = async () => {

    if (loading || !hasMore) return

    setLoading(true)

    const res = await service.get(`/memories?page=${page}`)

    if (res.data.length === 0) {
      setHasMore(false)
      setLoading(false)
      return
    }

    setMemories(prev => [...prev, ...res.data])
    setPage(prev => prev + 1)

    setLoading(false)
  }

  useEffect(() => {
    loadMemories()
  }, [])

  const lastMemoryRef = (node) => {

    if (loading) return

    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMemories()
      }
    })

    if (node) observer.current.observe(node)
  }

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 2 }}>

      {memories.map((memory, index) => {

        if (memories.length === index + 1) {
          return (
            <div ref={lastMemoryRef} key={memory._id}>
              <MemoryFeedCard memory={memory} />
            </div>
          )
        }

        return <MemoryFeedCard key={memory._id} memory={memory} />

      })}

      {loading && <CircularProgress />}

    </Box>
  )
}

export default FeedsPage