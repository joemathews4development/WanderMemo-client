import { Box, CircularProgress, Typography } from "@mui/material"
import { useState, useEffect, useRef, useContext } from "react"
import MemoryFeedCard from "../componnets/MemoryFeedCard"
import service from "../services/config.services"
import LoadingScreen from "../componnets/LoadinScreen"
import { ToastContext } from "../context/toast.context"

function FeedsPage() {

  const [memories, setMemories] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const { showToast } = useContext(ToastContext)

  const observer = useRef()

  const loadMemories = async () => {

    if (loading || !hasMore) return
    setLoading(true)
    try {
      const res = await service.get(`/memories?page=${page}`)
      if (res.data.length === 0) {
        setHasMore(false)
        setLoading(false)
        return
      }
      setMemories(prev => [...prev, ...res.data])
      setPage(prev => prev + 1)
    } catch (error) {
      console.log(error)
      showToast(`Loading memory feeds failed: ${error}`, "error")
    } finally {
      setLoading(false)
    }
    
  }

  useEffect(() => {
    loadMemories()
  }, [])

  /// To reload when it reaches the last feed.
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

  if (loading) {
    return (<LoadingScreen text="Loading Feeds..." fullPage={true}/>)
  }

  if (memories.length === 0) {
    return(
      <Typography variant="h5" sx={{textAlign:"center", my:4}}>There are no Feeds</Typography>
    )
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
    </Box>
  )
}

export default FeedsPage